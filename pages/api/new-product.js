import { MongoClient } from "mongodb";

async function handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    // const { title, image, price, description } = data;
    const client = await MongoClient.connect("mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority");

    const db = client.db();
    const productsCollection = db.collection('products');
    const result = await productsCollection.insertOne(data);
    client.close();
    res.status(201).json({message: 'Meetup sent to the server..'});
  }
}

export default handler;
