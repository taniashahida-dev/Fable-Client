import { MongoClient } from "mongodb";

if (!process.env.MONGODB_URI) {
  throw new Error("Please add MONGODB_URI to your .env file");
}

const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db('Fable-db'); 

export { client, db };