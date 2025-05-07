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
import { config } from "dotenv";
import bcrypt from "bcrypt";
import cors from "cors";
import fetch from "node-fetch";
import { MongoClient, ObjectId } from "mongodb";

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
  database: "prototype",
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
  const sql = "SELECT * FROM utilisateur WHERE courriel = ?";

  con.query(sql, [email], (err, results) => {
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
      return res.status(200).json({
        success: true,
        message: "Login Successful!",
        userId: results[0].utilisateur_id,
      });
    } else {
      console.log("USER NOT FOUND");
      return res.status(401).json({
        success: false,
        message: "Access denied, wrong password or email",
      });
    }
  });
});

app.post("/LoginRegister", (req, res) => {
  const { email, password, firstName, lastName, phoneNumber } = req.body;

  //https://stackabuse.com/bytes/check-if-a-string-contains-numbers-in-javascript/
  //email only one working for now, use the link just here to do the rest
  if (!email.includes("@")) {
    return res
      .status(400)
      .json({ success: false, message: "Please enter a valid email adress" });
  }
  if (firstName.includes(Number)) {
    return res.status(400).json({
      success: false,
      message:
        "Please enter your real name (symboles and numbers are not authorized)",
    });
  }
  if (lastName.includes(Number)) {
    return res.status(400).json({
      success: false,
      message:
        "Please enter your real last name (symboles and numbers are not authorized)",
    });
  }

  const sql =
    "INSERT INTO utilisateur (prenom, nom, courriel, telephone, mot_de_passe) VALUES (?, ?, ?, ?, ?)"; //Place holder (pour eviter sql injections, comme derniere session)

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const sql =
      "INSERT INTO utilisateur (prenom, nom, courriel, telephone, mot_de_passe) VALUES (?, ?, ?, ?, ?)";

    con.query(
      sql,
      [firstName, lastName, email, phoneNumber, hashedPassword],
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
          console.log("Error, couldn't create new user");
          return res.status(401).json({
            success: false,
            message: "Error, couldn't create user...",
          });
        }
      }
    );
  });
});

app.post("/saveUserAccountChanges", (req, res) => {
  console.log("Trying to update user information");
  const { id, prenom, nom, courriel, telephone } = req.body;

  const sql = `UPDATE utilisateur SET prenom = ?, nom = ?, courriel = ?, telephone = ? WHERE utilisateur_id = ?`;

  con.query(sql, [prenom, nom, courriel, telephone, id], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    if (results.affectedRows > 0) {
      console.log("USER INFO UPDATED!");
      return res
        .status(200)
        .json({ success: true, message: "User information updated." });
    } else {
      console.log("Error, couldn't update user information");
      return res.status(404).json({
        success: false,
        message: "User not found or no changes made.",
      });
    }
  });
});

app.post("/ChangePassword", (req, res) => {
  console.log("Trying to update password");
  const { email, newPassword } = req.body;

  bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
    if (err) {
      console.error("Error hashing password:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const sql = "UPDATE utilisateur SET mot_de_passe = ? WHERE courriel = ?";
    con.query(sql, [hashedPassword, email], (err, results) => {
      if (err) {
        console.error("Database error: ", err);
        return res.status(500).json({ message: "Internal server error" });
      }
      if (results.affectedRows > 0) {
        console.log("PASSWORD UPDATED !!!!!");
        return res
          .status(200)
          .json({ success: true, message: "Your password was updated!" });
      } else {
        console.log("Error, couldn't update password");
        return res
          .status(404)
          .json({ success: false, message: "Error, couldn't update user..." });
      }
    });
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
      console.log("Error, couldnt delete password");
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
*/
//con query : méthode de connexion à la BDD MySQL dans Node.js. Elle est utilisée pour envoyer une requête SQL à la base de données
// et récupérer des données ou effectuer des actions (comme INSERT, UPDATE, DELETE, ou SELECT).

app.get("/getUsers", async (req, res) => {
  //Cette ligne permet au serveur d'écouter les requêtes GET envoyées à l'URL /getUsers et d'exécuter une fonction lorsque cette requête est reçue.
  const sql = "SELECT * FROM utilisateur"; // Requête SQL pour récupérer tous les utilisateurs
  con.query(sql, (erreur, resultats) => {
    if (erreur) {
      console.error("Erreur de la BDD : ", erreur);
      return res.status(500).json({ message: "Erreur du serveur" });
    }

    if (resultats.length === 0) {
      // Si aucun utilisateur n'a été trouvé avec cet ID, on renvoie une erreur 404
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    // Si tout se passe bien, on renvoie les résultats (les informations de l'utilisateur)
    res.json(resultats);
  });
});

/*
    Inspiré de changePassword- Modifier état compte à suspended             -------------------------------------------------------------------------------------------------------------------

*/
app.post("/suspendAccount", (req, res) => {
  console.log("Trying to suspend account");
  const { userId } = req.body;
  const sql =
    "UPDATE utilisateur SET accountState = 'suspended' WHERE utilisateur_id = ?";

  con.query(sql, [userId], (err, results) => {
    if (err) {
      console.error("Database error: ", err);
      return res.status(500).json({ message: "Internal server error" });
    }
    if (results.affectedRows > 0) {
      console.log("Account suspended !!!!!");
      return res
        .status(200)
        .json({ success: true, message: "this account was suspended !" });
    } else {
      console.log("Error, couldnt suspended account");
      return res
        .status(404)
        .json({ succes: false, message: "Error, couldnt create user..." });
    }
  });
});
/*
    API - Obtenir tous les films -------------------------------------------------------------------------------------------------------------------
*/

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
  const response = await fetch(
    "https://api.themoviedb.org/3/movie/popular?...",
    options
  );
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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        },
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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        },
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
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        },
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
    const response = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        },
      }
    );

    const data = await response.json();
    res.json(data.genres);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch genre list" });
  }
});

//=================== RECHERCHER UN FILM ==========================
app.get("/api/searchMovie", async (req, res) => {
  const userInput = req.query.query;

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(
        userInput
      )}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        },
      }
    );

    const data = await response.json();
    res.json(data.results);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed while searching movies" });
  }
});
// ================== GET MOVIES WITH PAGINATION ==================
app.get("/api/getMoviesResults/:searchQuery", async (req, res) => {
  const userInput = req.params.searchQuery;
  const page = req.query.page || 1; // Read the page query param (default 1)

  try {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?include_adult=false&query=${encodeURIComponent(
        userInput
      )}&page=${page}`,
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        },
      }
    );

    const data = await response.json();
    res.json(data); // Send full TMDB object, not only .results
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed while searching movies" });
  }
});

// ================== GET MOVIES WITH FILTERS - DICOVERY PAGE ==================
// Need to fix this part, the issue with charging all the pages
app.get("/discoverMoviesFiltered", async (req, res) => {
  console.log("WE ARE GETTTING HEREEEEEEEEEEEEE");
  const { genre, language, decade, movieDuration, originCountry } = req.query;

  const originalUrl = "https://api.themoviedb.org/3/discover/movie";
  const params = new URLSearchParams();

  //Help of chatgpt just to figure ou the way to do the url, so what do put for the genre, so like with_genres, or with_original_languages
  if (genre) {
    params.append("with_genres", genre);
  }

  if (language) {
    params.append("with_original_language", language);
  }

  if (decade) {
    const startYear = decade;
    const endYear = Number(decade) + 9;
    const endYearString = String(endYear);
    params.append("primary_release_date.gte", `${startYear}-01-01`);
    params.append("primary_release_date.lte", `${endYearString}-12-31`);
  }

  /*if (movieDuration) {
    params.append('')
  }*/

  try {
    console.log("WE ARE GETTTING HEREEEEEEEEEEEEE");

    const response = await fetch(`${originalUrl}?${params.toString()}`, {
      headers: {
        accept: "application/json",
        "Content-Type": "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
      },
    });

    if (!response.ok) {
      throw new Error("Error ! Couldnt get movies from TMDB API !!!");
    }

    const data = await response.json(); //full response from tmbd api
    const fetchedMovieList = data.results; //Just the movie list fetched from the api, nothing more (so we get the specific results from data)

    const filteredMovies = []; // This will be the list contening the movies respecting all the filters

    for (const movie of fetchedMovieList) {
      const currentMovieInformation = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}`,
        {
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
          },
        }
      );
      console.log("CHECKKKKKKKKPOINT 1");

      const fullMovieData = await currentMovieInformation.json(); //All the information about the movie in details

      // If the user selected
      if (movieDuration) {
        console.log("CHECKKKKKKKKPOINT 2");

        const userPreferencesDuration = parseInt(movieDuration);
        const runtime = fullMovieData.runtime;

        if (!runtime) continue; // skip if no runtime

        let durationIsOK = false;

        if (userPreferencesDuration === 0 && runtime < 60) durationIsOK = true;
        else if (userPreferencesDuration === 1 && runtime >= 60 && runtime < 90)
          durationIsOK = true;
        else if (
          userPreferencesDuration === 2 &&
          runtime >= 90 &&
          runtime < 150
        )
          durationIsOK = true;
        else if (
          userPreferencesDuration === 3 &&
          runtime >= 150 &&
          runtime <= 240
        )
          durationIsOK = true;
        else if (userPreferencesDuration === 4 && runtime > 240)
          durationIsOK = true;

        if (!durationIsOK) continue;
      }
      console.log("CHECKKKKKKKKPOINT 3");

      if (originCountry) {
        let correspondingCountryFound = false;

        //check if production_companies exists
        if (
          fullMovieData.production_companies &&
          fullMovieData.production_companies.length > 0
        ) {
          for (let i = 0; i < fullMovieData.production_companies.length; i++) {
            const company = fullMovieData.production_companies[i];

            if (company.origin_country === originCountry) {
              correspondingCountryFound = true;
              break; //if we found a match, the movie is good
            }
          }
        }
        console.log("CHECKKKKKKKKPOINT 4");

        // If we didn’t, dont save the movie for the list
        if (!correspondingCountryFound) {
          continue;
        }
      }

      filteredMovies.push(fullMovieData);
    }

    res.json(filteredMovies);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch movies" });
  }
});

/*app.get("/api/getMoviesResults/:searchQuery", async (req, res) => {
  const userInput = req.params.searchQuery;
  const page = req.query.page || 1; 

  try {
    const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(userInput)}&page=${page}`, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
      }
    });

    const data = await response.json();
    res.json(data.results); 
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed while searching movies" });
  }
});*/

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

/* ============================= NOSQL RELATED TO PERSONALIZED LIST =========================== */

/* ============================= NOSQL REMOVE A MOVIE FROM A PERSONALIZED LIST ================ */

app.delete("/mongo/removeMovieFromList/:listId/:movieId", async (req, res) => {
  const listId = req.params.listId;
  const movieId = req.params.movieId;

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("FilmBox");
    const list = db.collection("CustomLists");

    const result = await list.updateOne(
      { _id:  new ObjectId(listId) },
      { $pull: { movies: { _id: new ObjectId(movieId) } } }
    );
    res.json({ message: "Movie removed from list" });
  } catch (error) {
    console.error("Error removing movie: " + movieId + "from list: " + listId, error);
    res.status(500).json({ message: "Server error"});
  } finally {
    await client.close();
  }
});
/* =============================== ADD A MOVIE TO A PERSONALIZED LIST ========================= */
app.post("/mongo/addToPersonalizedList", async (req, res) => {
  const { userId, personalizedListId, filmId } = req.body;

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("FilmBox");
    const lists = db.collection("CustomLists");

    const result = await lists.updateOne(
      { _id: new ObjectId(personalizedListId) },
      { $addToSet: { movies: filmId } }
    );
    res.json({ message: "Movie added to list" });
  } catch (error) {
    console.error("Error adding movie:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
});

/* =============================== ADD A NEW PERSONALIZED LIST ================================ */
app.post("/mongo/createPersonalizedList", async (req, res) => {
  const { userId, listName } = req.body;

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("FilmBox");
    const lists = db.collection("CustomLists");

    const newListDocument = {
      user_id: userId,
      name: listName,
      movies: [],
    };

    const postResult = await lists.insertOne(newListDocument);

    res.json({ message: "list created" });
  } catch (error) {
    console.error("Error creating list:", error);
    res.status(500).json({ message: "Server error" });
  } finally {
    await client.close();
  }
});
/* =============================== GET ALL THE PERSONALIZED LIST ================================ */
app.get("/mongo/getPersonalizedList", async (req, res) => {
  const { userId } = req.query;

  const uri = process.env.DB_URI;
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db("FilmBox");
    const lists = db.collection("CustomLists");

    const usersList = await lists.find({ user_id: userId }).toArray(); //Va chercher toutes les listes correspondant à l'id de l'utilisateur
    if (usersList.length === 0) {
      return res
        .status(401)
        .json({ message: "The user doesnt have any personalized list" });
    } else {
      console.log("Lists succesfully found for " + userId);
      for (const list of usersList) {
        const movieDetails = [];

        //fetch the movies from the api directly in the backend, and send all the data movie straight to the frontend
        if (Array.isArray(list.movies)) {
          for (const movieId of list.movies) {

            const tmdbResponse = await fetch(`https://api.themoviedb.org/3/movie/${movieId}`, {
              method: "GET",
              headers: {
                accept: "application/json",
                Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
              }
            });
            const movieData = await tmdbResponse.json();
            movieDetails.push(movieData);
          }
        }

        // Replace movie IDs with full movie objects
        list.movies = movieDetails;
      }
    }

    return res.json({
      message: "Lists successfully found",
      data: usersList,
    });
  } catch (error) {
    console.error("Error during list fetch:", error);
    return res.status(500).json({ message: "Server Error" });
  } finally {
    await client.close();
  }
});

/* ============================= NOSQL RELATED TO MANAGEMENT =========================== */

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
  //Check if the movie exist in our database first
  const verificationSQL = "SELECT * FROM films WHERE film_id = ?";
  con.query(verificationSQL, [movieId], async (err, results) => {
    if (err) {
      console.error("Database problem:", err);
      return res.status(500).json({ message: "Internal server problem" });
    }

    //If the movies doesnt exist yet, we create it
    if (results.length === 0) {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
        },
      };

      const tmdbResponse = await fetch(
        `https://api.themoviedb.org/3/movie/${movieId}`,
        options
      );

      if (!tmdbResponse.ok) {
        console.error("Failed to fetch movie from TMDB");
        return res.status(404).json({ message: "Movie not found in TMDB" });
      }

      const movieData = await tmdbResponse.json();

      //This is the data that will be saved on our local database
      const newFilmSQL = `INSERT INTO films (film_id, titre, film_duree, date_sortie, pays_origin_film, langue_original, status, directeur_directeur_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)`;

      const filmValues = [
        movieData.id,
        movieData.title,
        movieData.runtime || 0,
        movieData.release_date || null,
        movieData.production_countries?.[0]?.name || "Unknown",
        movieData.original_language || "Unknown",
        movieData.status || "Unknown",
        null,
      ]; //director is null for now, have to fix a bug first

      con.query(newFilmSQL, filmValues, (insertErr) => {
        if (insertErr) {
          console.error("Database error inserting film:", insertErr);
          return res
            .status(500)
            .json({ message: "Internal server error inserting film" });
        }

        insertIntoWatchlist();
      });
    } else {
      insertIntoWatchlist();
    }

    function insertIntoWatchlist() {
      //Check if the movie isnt already in the user's watchlist
      const findMovieSql = `SELECT * FROM film_watchlist WHERE film_id = ? AND utilisateur_utilisateur_id = ?`;

      con.query(findMovieSql, [movieId, userId], (checkErr, checkResults) => {
        if (checkErr) {
          console.error("Database error checking watchlist:", checkErr);
          return res
            .status(500)
            .json({ message: "Internal server error checking watchlist" });
        }

        if (checkResults.length > 0) {
          console.log(
            `Movie ID ${movieId} already in watchlist for user ${userId}`
          );
          return res
            .status(409)
            .json({ success: false, message: "Movie already in watchlist" });
        }

        const insertWatchlistSql = `INSERT INTO film_watchlist (film_id, utilisateur_utilisateur_id) VALUES (?, ?)`;

        con.query(insertWatchlistSql, [movieId, userId], (watchlistErr) => {
          if (watchlistErr) {
            console.error(
              "Database error inserting into watchlist:",
              watchlistErr
            );
            return res
              .status(500)
              .json({ message: "Internal server error adding to watchlist" });
          }

          console.log(
            `SUCCES!!!!!!!!!! : Movie with ID ${movieId} added to watchlist for user ${userId}`
          );
          res
            .status(201)
            .json({ success: true, message: "Film added to watchlist" });
        });
      });
    }
  });
});

/*const sql =
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
});*/

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

app.post("/api/watched", (req, res) => {
  const { userId, movieId, rating, comment } = req.body;

  // 1. Check if the film exists
  const checkFilmSql = "SELECT film_id FROM films WHERE film_id = ?";
  con.query(checkFilmSql, [movieId], (err, result) => {
    if (err) return res.status(500).json({ message: "Error checking film" });

    if (result.length === 0) {
      // 2. Insert placeholder film if not found
      const insertFilmSql = `
        INSERT INTO films (film_id, titre, film_duree, date_sortie, pays_origin_film, langue_original, status, directeur_directeur_id)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      const now = new Date().toISOString().split("T")[0]; // format YYYY-MM-DD

      con.query(
        insertFilmSql,
        [
          movieId,
          "TMDB Film", // Placeholder title
          100, // Placeholder duration
          now, // Today's date
          "USA", // Placeholder country
          "en", // Placeholder language
          "vu", // Placeholder status
          1, // Default director (must exist)
        ],
        (err2) => {
          if (err2) {
            console.error("Insert film error:", err2);
            return res.status(500).json({ message: "Error inserting film" });
          }
          insertRating(); // now insert the rating
        }
      );
    } else {
      insertRating(); // film already exists, proceed
    }
  });

  // 3.  Function to insert or update the rating
  function insertRating() {
    const ratingSql = `
      INSERT INTO note (valeur_note, commentaire, films_film_id, utilisateur_utilisateur_id)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE valeur_note = VALUES(valeur_note), commentaire = VALUES(commentaire)
    `;
    con.query(ratingSql, [rating, comment || "", movieId, userId], (err3) => {
      if (err3) {
        console.error("Error saving rating:", err3);
        return res.status(500).json({ message: "Error saving rating" });
      }
      res.json({ success: true });
    });
  }
});

// Get watched movies
app.get("/api/watched/:userId", (req, res) => {
  const { userId } = req.params;
  const sql = `SELECT films_film_id, valeur_note, commentaire FROM note WHERE utilisateur_utilisateur_id = ?`;
  con.query(sql, [userId], async (err, results) => {
    if (err) return res.status(500).json({ message: "Error fetching watched" });

    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyOWYyYWU0OWY2MTU1MDUzNTZjYmRkNGI0OGUyMmMzOSIsIm5iZiI6MTc0Mjk5NjkyOS40MjIwMDAyLCJzdWIiOiI2N2U0MDVjMWUyOGFmNDFjZmM3NjUwZmIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.1j-MADS28jj8Dyb_HYms84nRsZydvF8CZU4MHk9g_x0",
      },
    };

    const watchedMovies = await Promise.all(
      results.map(async (row) => {
        const res = await fetch(
          `https://api.themoviedb.org/3/movie/${row.films_film_id}`,
          options
        );
        const movie = await res.json();
        return {
          ...movie,
          rating: row.valeur_note,
          commentaire: row.commentaire,
        };
      })
    );

    res.json(watchedMovies);
  });
});

app.delete("/api/watched/:userId/:movieId", (req, res) => {
  const { userId, movieId } = req.params;
  const sql = `DELETE FROM note WHERE utilisateur_utilisateur_id = ? AND films_film_id = ?`;

  con.query(sql, [userId, movieId], (err, result) => {
    if (err) {
      console.error("Error removing watched:", err);
      return res.status(500).json({ message: "Error removing watched status" });
    }
    res.json({ success: true });
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
