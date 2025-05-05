////////////////////CODE FAITE PAR CHATGPT POUR CONVERTIR PLAIN TEXT EN HASH////////////////////////
import mysql from "mysql";
import bcrypt from "bcrypt";

const con = mysql.createConnection({
  host: "localhost",
  user: "scott",
  password: "oracle",
  database: "prototype", // a changer si le BD = filmbox
});

con.connect((err) => {
  if (err) {
    console.error("Database connection failed:", err);
    process.exit(1);
  }
  console.log("Connected to database!");

  // Fetch all users
  const fetchUsersSql = "SELECT utilisateur_id, mot_de_passe FROM utilisateur";
  con.query(fetchUsersSql, async (err, users) => {
    if (err) {
      console.error("Error fetching users:", err);
      con.end();
      return;
    }

    for (const user of users) {
      const { utilisateur_id, mot_de_passe } = user;

      // If password already looks hashed, skip (bcrypt hashes start with $2b$ or $2a$)
      if (mot_de_passe.startsWith("$2")) {
        console.log(`User ID ${utilisateur_id}: Already hashed, skipping.`);
        continue;
      }

      try {
        const hashedPassword = await bcrypt.hash(mot_de_passe, 10);
        const updateSql =
          "UPDATE utilisateur SET mot_de_passe = ? WHERE utilisateur_id = ?";
        await new Promise((resolve, reject) => {
          con.query(updateSql, [hashedPassword, utilisateur_id], (err) => {
            if (err) reject(err);
            else resolve();
          });
        });
        console.log(`User ID ${utilisateur_id}: Password hashed successfully.`);
      } catch (err) {
        console.error(
          `Error hashing password for user ID ${utilisateur_id}:`,
          err
        );
      }
    }

    console.log("Password hashing complete!!!!!!!!!!!!!!!!!!!!!!!");
    con.end();
  });
});
