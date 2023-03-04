require("dotenv").config();
const { MongoClient } = require("mongodb");
const client = new MongoClient(process.env.MONGO_URL);

async function main() {
    await client.connect();
    console.log("Connexion ok !");
    return "done!";
}

main().then(console.log).catch(console.error).finally(() => client.close());