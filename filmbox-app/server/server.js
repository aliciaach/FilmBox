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


/*
    Connect to server
*/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
