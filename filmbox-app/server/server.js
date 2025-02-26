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

/*
    Connection au server MySQL
*/
const con = mysql.createConnection({
  host: "localhost", 
  user: "scott",
  password: "oracle",
  database: "mybd"
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected to MySQL!");
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
    Connect to server
*/
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}...`);
});
