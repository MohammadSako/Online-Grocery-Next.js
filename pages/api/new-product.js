import { MongoClient, ObjectId } from "mongodb";

async function Handler(req, res) {
  if (req.method === "POST") {
    const data = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
    );
    const db = client.db();
    const productsCollection = db.collection("products");
    const result = await productsCollection.insertOne(data);
    client.close();
    res.status(201).json({ message: "Data sent to the server.." });
  }

  if (req.method === "DELETE") {
    // const data = req.body;
    // const client = await MongoClient.connect(
    //   "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
    // );
    // const db = client.db();
    // const productsCollection = db.collection("products");
    // const result = await productsCollection.deleteOne({_id: ObjectId(data)});
    // // const result = await productsCollection.deleteOne(id);
    // client.close();
    // res.status(201).json({ message: "Data sent to the server.." });
    const productId = req.body;
    const client = await MongoClient.connect(
      "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
    );
    const db = client.db();
    const productsCollection = db.collection("products");
    const selectedProduct = await productsCollection.findOneAndDelete({
      _id: new ObjectId(productId),
    });
    client.close();
  }
}
export default Handler;
