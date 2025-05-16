import { MongoClient } from "mongodb";
import bcrypt from "bcrypt";

const uri = "mongodb://localhost:27017"; // Update if needed
const dbName = "FilmBox";

async function migrateAdminPasswords() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection("AdminUsers");

    const admins = await collection.find({}).toArray();

    for (const admin of admins) {
      const currentPassword = admin.password;

      // Basic check: skip if already hashed (bcrypt hashes are typically 60 chars)
      if (typeof currentPassword === "string" && currentPassword.length < 20) {
        const hashed = await bcrypt.hash(currentPassword, 10);
        await collection.updateOne(
          { _id: admin._id },
          { $set: { password: hashed } }
        );
        console.log(`✅ Password updated for admin "${admin.username}"`);
      } else {
        console.log(
          `⏩ Skipped admin "${admin.username}", password already hashed`
        );
      }
    }

    console.log("🎉 Migration complete.");
  } catch (err) {
    console.error("❌ Migration failed:", err);
  } finally {
    await client.close();
  }
}

migrateAdminPasswords();
