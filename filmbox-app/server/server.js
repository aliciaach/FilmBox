/*
    Importation des modules requis
*/
import express from "express";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";
import mysql from "mysql";
import { body, validationResult } from "express-validator";
import dateFormat from "dateformat";


const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json()); //convert json data to javascript

/*
    Connection au server MySQL
*/
const con = mysql.createConnection({
  host: "localhost", 
  user: "scott",
  password: "oracle",
  database: "filmbox"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connection succesful !!!!!!!!!!");
});

/*
    Enregistrer une session utilisateur
    Source : https://www.geeksforgeeks.org/how-to-handle-sessions-in-express/
*/
app.use(session({
  secret: 'mySecretKey',
  resave: false,
  saveUninitialized: false
}));

app.get("/get-session", (req, res) => {
  if (req.session.user) {
    console.log("Session Found:", req.session.user);
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    console.log("No Session Found");
    res.send('No session data found');
    res.json({ loggedIn: false });
  }
});

app.get("/destroy-session", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error("Error destroying session:", err);
      res.send("Error logging out");
    } else {
      console.log("Session Destroyed");
      res.send("Session destroyed");
    }
  });
});

/*
    Dist folder with all the pages
*/
app.use(express.static(path.join(__dirname, "../client/dist")));


/*
    Images
*/
app.use(
  "/images",
  express.static(path.join(__dirname, "../client/public/images"))
);

/*
  Login page + confirmation of information
*/
app.post("/login", (req, res) => {
  const { email, password } = req.body;
  const sql = "SELECT * FROM utilisateur WHERE courriel = ? AND mot_de_passe = ?";
  
  con.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length > 0) {
      req.session.user = {
        id: results[0].utilisateur_id,  // Adjust column name if needed
        prenom: results[0].prenom,
        nom: results[0].nom,
        courriel: results[0].courriel,
        telephone: results[0].telephone
      }
      console.log("USER FOUNDDDDDD" + results[0].courriel)
      return res.status(200).json({succes:true, message: "Login Succesful !" });
    } else {
      console.log("USER NOTTT FOUNDDD")
      return res.status(401).json({succes:false, message: "Access denied, wrong password or email" });
    }
  });
});

app.post("/LoginRegister", (req, res) => {
  console.log("We made it here ")
  const {email, password, firstName, lastName, phoneNumber} = req.body;
  const sql = "INSERT INTO utilisateur (prenom, nom, courriel, telephone, mot_de_passe) VALUES (?, ?, ?, ?, ?)"; //Place holder (pour eviter sql injections, comme derniere session)

  //CORRIGER LES TYPES D'ERREUR ET METTRE LES BONNES !!!
  con.query(sql, [firstName, lastName, email, phoneNumber, password], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({message: "Internal server error" });
    }
    if (results.affectedRows && results.affectedRows > 0) {
      console.log("New User created ")
      return res.status(200).json({ success:true, message: "New user created!", redirectUrl: "/PageFilm" });
    } else {
      console.log("Error, couldnt create new user")
      return res.status(401).json({ succes:false, message: "Error, couldnt create user..."})
    }
  });
});

app.post("/ChangePassword", (req, res) => {
    console.log("Trying to update password")
    const {email, newPassword} = req.body;
    const sql = "UPDATE utilisateur SET mot_de_passe = ? WHERE courriel = ?";

    con.query(sql, [newPassword, email], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({message: "Internal server error" });
      }
      if (results.affectedRows > 0) {
        console.log("PASSWORD UPDATED !!!!!")
        return res.status(200).json({ success:true, message: "Your password was updated !" });
      } else {
        console.log("Error, couldnt update password")
        return res.status(404).json({ succes:false, message: "Error, couldnt create user..."})
      }
    });
});

app.delete("/deleteAccount", (req, res) => {
  console.log("trying to delete account")
  const {userId} = req.body;
  const sql = "DELETE FROM utilisateur WHERE utilisateur_id = ?;";

  con.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({message: "Internal server error" });
    }
    if (results.affectedRows > 0) {
      console.log("ACCOUNT DELETED !!!!!")
      return res.status(200).json({ success:true, message: "Your account was deleted !" });
    } else {
      console.log("Error, couldnt update password")
      return res.status(404).json({ succes:false, message: "Error, couldnt delete user..."})
    }
  });

})


/*
    API - Obtenir tous les films
*/
app.get("/api/movies", (req, res) => {
  console.log("Request received at /api/movies");
  const sql = "SELECT film_id, titre FROM films";
  con.query(sql, (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    console.log(` Movies fetched: ${results.length} rows`); // Log number of rows
    console.table(results);
    res.json(results);
  });
});

/*
    API - Obtenir un film par ID
*/
app.get("/api/movies/:id", (req, res) => {
  const filmID = Number(req.params.id); //converti le id en nombre au cas ou
  if (isNaN(filmID)) {
    return res.status(400).json({ message: "ID invalide" }); //gestions des erreurs etc
  }

  //requete sql qui fait les jointures avec les tables
  const sql = `
    SELECT f.film_id, f.titre, f.film_duree, f.date_sortie, 
           f.pays_origin_film, f.langue_original, d.nom_directeur, g.genre
    FROM films f
    JOIN directeur d ON f.directeur_directeur_id = d.directeur_id
    LEFT JOIN genre g ON f.film_id = g.films_film_id
    WHERE f.film_id = ?`;

  con.query(sql, [filmID], (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ message: "Erreur serveur" });
    }
    if (results.length === 0) {
      return res.status(404).json({ message: "Film non trouvé" });
    }
    res.json(results[0]);
  });
});

/*
    Description des routes
*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});


/*
    Connect to server
*/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
