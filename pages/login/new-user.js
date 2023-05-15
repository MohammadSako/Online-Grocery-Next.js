import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect("mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/nextauth?retryWrites=true&w=majority");

    const db = client.db();
    const nextauthCollection = db.collection('nextauth');
    const result = await nextauthCollection.insertOne(data);
    client.close();
    res.status(201).json({message: 'Auth Data sent to the server..'});
  }
}

export default handler;
