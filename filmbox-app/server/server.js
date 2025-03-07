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
    Dist folder with all the pages
*/
app.use(express.static(path.join(__dirname, "../client/dist")));

/*
    Description des routes
*/
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

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
      console.log("USER FOUNDDDDDD")
    } else {
      console.log("USER NOTTT FOUNDDD")
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
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length > 0) {
      console.log("USER FOUNDDDDDD")
    } else {
      console.log("USER NOTTT FOUNDDD")
    }
  });
});

/*
    Afficher fiche technique films
*/
app.get("/movies", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.use(
  "/images",
  express.static(path.join(__dirname, "../client/public/images"))
);
/*
    API route pour get les films
*/
app.get("/api/movies", (req, res) => {
  const sql = "SELECT titre FROM films";
  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching movies:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});

/*
    Serve the React app
*/
app.get("/movies", (req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

app.use(
  "/images",
  express.static(path.join(__dirname, "../client/public/images"))
);
/*
    API route pour get les films
*/
app.get("/api/movies", (req, res) => {
  const sql = "SELECT titre FROM films";
  con.query(sql, (err, results) => {
    if (err) {
      console.error("Error fetching movies:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json(results);
  });
});


/*
    Connect to server
*/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
