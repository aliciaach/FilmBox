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
import { MongoClient } from "mongodb";
import { config } from "dotenv";
import bcrypt from "bcrypt";

import cors from "cors";

config();

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
  database: "filmbox",
});

con.connect(function (err) {
  if (err) throw err;
  console.log("Connection succesful !!!!!!!!!!");
});

/*
    Enregistrer une session utilisateur
    Source : https://www.geeksforgeeks.org/how-to-handle-sessions-in-express/
*/
app.use(
  session({
    secret: "mySecretKey",
    resave: false,
    saveUninitialized: false,
  })
);

app.get("/get-session", (req, res) => {
  if (req.session.user) {
    console.log("Session Found:", req.session.user);
    res.json({ loggedIn: true, user: req.session.user });
  } else {
    console.log("No Session Found");
    res.send("No session data found");
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
  const sql =
    "SELECT * FROM utilisateur WHERE courriel = ? AND mot_de_passe = ?";

  con.query(sql, [email, password], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.length > 0) {
      req.session.user = {
        id: results[0].utilisateur_id, // Adjust column name if needed
        prenom: results[0].prenom,
        nom: results[0].nom,
        courriel: results[0].courriel,
        telephone: results[0].telephone,
      };
      console.log("USER FOUNDDDDDD" + results[0].courriel);
      return res
        .status(200)
        .json({ succes: true, message: "Login Succesful !" });
    } else {
      console.log("USER NOTTT FOUNDDD");
      return res.status(401).json({
        succes: false,
        message: "Access denied, wrong password or email",
      });
    }
  });
});

app.post("/LoginRegister", (req, res) => {
  console.log("We made it here ");
  const { email, password, firstName, lastName, phoneNumber } = req.body;
  const sql =
    "INSERT INTO utilisateur (prenom, nom, courriel, telephone, mot_de_passe) VALUES (?, ?, ?, ?, ?)"; //Place holder (pour eviter sql injections, comme derniere session)

  //CORRIGER LES TYPES D'ERREUR ET METTRE LES BONNES !!!
  con.query(
    sql,
    [firstName, lastName, email, phoneNumber, password],
    (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows && results.affectedRows > 0) {
        console.log("New User created ");
        return res.status(200).json({
          success: true,
          message: "New user created!",
          redirectUrl: "/PageFilm",
        });
      } else {
        console.log("Error, couldnt create new user");
        return res
          .status(401)
          .json({ succes: false, message: "Error, couldnt create user..." });
      }
    }
  );
});

app.post("/ChangePassword", (req, res) => {
  console.log("Trying to update password");
  const { email, newPassword } = req.body;
  const sql = "UPDATE utilisateur SET mot_de_passe = ? WHERE courriel = ?";

  con.query(sql, [newPassword, email], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows > 0) {
      console.log("PASSWORD UPDATED !!!!!");
      return res
        .status(200)
        .json({ success: true, message: "Your password was updated !" });
    } else {
      console.log("Error, couldnt update password");
      return res
        .status(404)
        .json({ succes: false, message: "Error, couldnt create user..." });
    }
  });
});

app.delete("/deleteAccount", (req, res) => {
  console.log("trying to delete account");
  const { userId } = req.body;
  const sql = "DELETE FROM utilisateur WHERE utilisateur_id = ?;";

  con.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows > 0) {
      console.log("ACCOUNT DELETED !!!!!");
      return res
        .status(200)
        .json({ success: true, message: "Your account was deleted !" });
    } else {
      console.log("Error, couldnt update password");
      return res
        .status(404)
        .json({ succes: false, message: "Error, couldnt delete user..." });
    }
  });
});

/*
    API - Obtenir tous les films
*/
/*app.get("/api/movies", (req, res) => {
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
});*/
/*
    API - Obtenir tous les utilisateurs             -------------------------------------------------------------------------------------------------------------------

app.get("/");
=======
*/
app.get("/getUsers", async (req, res) => { //Cette ligne permet au serveur d'écouter les requêtes GET envoyées à l'URL /getUsers et d'exécuter une fonction lorsque cette requête est reçue.
  const sql = "SELECT * FROM utilisateur";  // Requête SQL pour récupérer tous les utilisateurs

  con.query(sql, (erreur, resultats) => {
    if (erreur) {
      console.error("Erreur de la BDD : ", erreur);
      return res.status(500).json({ message: "Erreur du serveur" });
    }
    if (resultats.length === 0) {
      // Si aucun utilisateur n'a été trouvé avec cet ID, on renvoie une erreur 404
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    res.json(resultats);
  });
});

/*
    API - Obtenir tous les films                    -------------------------------------------------------------------------------------------------------------------
*/
import fetch from "node-fetch";

///////////////////////////MOVIES RESQUEST ///////////////////////////////////////

app.get("/api/movies", async (req, res) => {
  //Methode given by the TMBD API, its to authenticate yourself to get access to the API
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      //Need to find a way to make this secure !!
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
    },
  };

  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/discover/movie",
      options
    );
    const data = await response.json();

    if (data && data.results) {
      res.json(data.results);
    } else {
      res.status(500).json({ message: "Unexpected response from TMDb" });
    }
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

//Popular movies 
app.get("/api/popularMovies", async (req, res) => {
  const response = await fetch("https://api.themoviedb.org/3/movie/popular?...", options);
  const data = await response.json();
  res.json(data.results);
});

//Top rated movies 
app.get("/api/topRatedMovies", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",

        }
      }
    );

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching top rated movies:", error);
    res.status(500).json({ error: "Failed to fetch top rated movies" });
  }
});

//Upcoming movies 
app.get("/api/upcomingMovies", async (req, res) => {
  try {
    const response = await fetch(
      "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        }
      }
    );

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching upcoming movies:", error);
    res.status(500).json({ error: "Failed to fetch upcoming movies" });
  }
});


//Pour appeler cet api, ajouter le genre après en utilisant ?genre=ID. Ex.: http://localhost:4000/api/moviesByGenres?genre=28
app.get("/api/moviesByGenres", async (req, res) => {
  const genreId = req.query.genre;

  if (!genreId) {
    return res.status(400).json({ error: "Missing Genre ID !!" });
  }

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/discover/movie?with_genres=${genreId}&language=en-US&page=1`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        }
      }
    );

    const data = await response.json();
    res.json(data.results);
  } catch (error) {
    console.error("Error fetching movies by genre:", error);
    res.status(500).json({ error: "Failed to fetch movies by genre" });
  }
});

app.get("/api/genres", async (req, res) => {
  try {
    const response = await fetch("https://api.themoviedb.org/3/genre/movie/list?language=en-US", {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`
      }
    });

    const data = await response.json();
    res.json(data.genres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genre list" });
  }
});


/*
    API - Obtenir un film par ID
*/
/*app.get("/api/movies/:id", (req, res) => {
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
});*/

app.get("/api/movies/:id", async (req, res) => {
  const filmID = Number(req.params.id); //Conversion du id en nombbre au cas ou
  if (isNaN(filmID)) {
    return res.status(400).json({ message: "ID invalide" }); //gestions des erreurs etc
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      //Need to find a way to make this secure !!
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${filmID}`,
      options
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to fetch movies" });
  }
});

app.get("/api/movies/:id/images", async (req, res) => {
  const filmID = Number(req.params.id); //Conversion du id en nombbre au cas ou
  if (isNaN(filmID)) {
    return res.status(400).json({ message: "ID invalide" }); //gestions des erreurs etc
  }
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      //Need to find a way to make this secure !!
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
    },
  };

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/movie/${filmID}/images`,
      options
    );
    const data = await response.json();

    res.json(data);
  } catch (error) {
    console.error("Error fetching images of movies:", error);
    res.status(500).json({ message: "Failed to fetch movie images" });
  }
});

/* ============================= REQUETE NOSQL =========================== */

//Pour permettre à un admin de se connecter
app.post("/adminLogin", async (req, res) => {
  const { username, password } = req.body;

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("FilmBox");
    const adminUsers = db.collection("AdminUsers");

    const admin = await adminUsers.findOne({ username });
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    //const isPasswordValid = await compare(password, admin.password);
    const isPasswordValid = password === admin.password;
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Mot de passe invalide" });
    } else {
      console.log("The admin connexion was succesful");
    }

    return res.json({ message: "Admin Connexion Succesful" });
  } catch (error) {
    console.error("Error during admin connexion:", error);
    return res.status(500).json({ message: "Server Error" });
  } finally {
    await client.close();
  }
});

/////////////////////////////////////////WATCHLIST///////////////////////////////////////////

// Add to Watchlist
app.post("/api/watchlist", (req, res) => {
  const { userId, movieId } = req.body;

  if (!userId || !movieId) {
    return res
      .status(400)
      .json({ message: "User ID et Movie ID sont requisent" });
  }

  const sql =
    "INSERT INTO film_watchlist (film_id, utilisateur_utilisateur_id) VALUES (?, ?)";
  con.query(sql, [movieId, userId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res
      .status(201)
      .json({ success: true, message: "Film ajoute dans watchlist" });
  });
});

// Get Watchlist
// Get Watchlist - Updated to use TMDB API
app.get("/api/watchlist/:userId", async (req, res) => {
  const userId = req.params.userId;
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
    },
  };

  try {
    // First get the movie IDs from the watchlist
    const sql =
      "SELECT film_id FROM film_watchlist WHERE utilisateur_utilisateur_id = ?";
    con.query(sql, [userId], async (err, results) => {
      if (err) {
        console.error("Database error:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      // Fetch details for each movie from TMDB API
      const watchlistMovies = await Promise.all(
        results.map(async (item) => {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${item.film_id}`,
            options
          );
          return response.json();
        })
      );

      res.json(watchlistMovies);
    });
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ message: "Erreur pour fetch le watchlist" });
  }
});

// Remove from Watchlist
app.delete("/api/watchlist/:userId/:movieId", (req, res) => {
  const { userId, movieId } = req.params;
  const sql =
    "DELETE FROM film_watchlist WHERE utilisateur_utilisateur_id = ? AND film_id = ?";

  con.query(sql, [userId, movieId], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    res.json({ success: true, message: "Film enlever du watchlist" });
  });
});

//////////////////////////////////////////////////////////////////////////////////////

//Pour afficher les admins dans le tableau d'admins
//constantes
const uri = "mongodb://localhost:27017";
const client = new MongoClient(uri);
const dbName = "FilmBox";

app.use(
  cors({
    origin: "http://localhost:5173", // Allow only requests from React's local dev server
  })
);

// API to fetch admins
app.get("/adminsTab", async (req, res) => {
  try {
    console.log("PAS ENCORE CONNECTÉ");
    await client.connect();
    console.log("CONNECTÉ !!");
    const db = client.db(dbName);
    const collection = db.collection("AdminUsers");
    const admins = await collection.find({ deletedAt: null }).toArray();

    res.json(admins);
    console.log("RENVOIE LA LISTE D'ADMINS");
    // console.log(admins);
  } catch (error) {
    console.error(
      "OOPS Il y a eu une erreur dans la récupération des admins : ",
      error
    );
    res.status(500).json({ message: "erreur serveur" });
  } finally {
    await client.close();
  }
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
