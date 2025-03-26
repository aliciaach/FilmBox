import { MongoClient } from "mongodb";

export async function connectToMongo(uri) {
    let mongoClient;
 
    try {
        mongoClient = new MongoClient(uri);
        console.log("Connecting to MongoDB Atlas cluster...");
        await mongoClient.connect();
        console.log("Successfully connected to MongoDB Atlas!");
 
        return mongoClient;
    } catch (error) {
        console.error("Connection to MongoDB Atlas failed!", error);
        process.exit();
    }
}

export async function executeAdminCrudOperations() {
    const uri = process.env.DB_URI;
    let mongoClient;

    try {
        mongoClient = await connectToMongo(uri);
        const db = mongoClient.db("FilmBox");
        const collection = db.collection("AdminUsers");
        
        //Insérer
        console.log("CREATION Admin");
        await createAdminDocument(collection);
        console.log(await findAdminByName(collection, "alicia"));

        //Mettre-à-jour
        console.log("Maj date de naissance d Admin");
        await updateAdminByName(collection, "alicia", {
            password: new String("newpassword")
        });
        console.log(await findAdminByName(collection, "alicia"));

        //Supprimer
        console.log("Supprimer Admin");
        await deleteAdminByName(collection, "newAdmin");
        console.log(await findAdminByName(collection, "alicia"));
    } finally {
        await mongoClient.close();
    }
}


export async function createAdminDocument(collection) {
    const AdminDocument = {
        username: "newAdmin",
        email: "newadmin@outlook.com",
        role: "admin",
        password: "adminadmin"
    };

    await collection.insertOne(AdminDocument);
}

export async function findAdminByName(collection, name) {
    return collection.find({ name }).toArray();
}

export async function updateAdminByName(collection, name, updatedFields) {
    await collection.updateMany({ name }, { $set: updatedFields });
}


export async function deleteAdminByName(collection, name) {
    await collection.deleteMany({ name });
}
