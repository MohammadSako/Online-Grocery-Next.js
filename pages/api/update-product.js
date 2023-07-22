import { MongoClient, ObjectId } from "mongodb";

async function Handler(req, res) {
  if (req.method === "POST") {
    const id = req.body.id;
    const data = {
      title: req.body.title,
      image: req.body.image,
      price: req.body.price,
      description: req.body.description,
    };
    try {
      const client = await MongoClient.connect(
        "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
      );
      const db = client.db();
      const productsCollection = db.collection("products");
      const result = await productsCollection.updateOne(
        { _id: ObjectId(id) },
        {
          $set: data,
        }
      );
      console.log(result);
      client.close();
      res.status(201).json({ message: "Successfully Data Updated.." });
    } catch (error) {
      res
        .status(500)
        .json({ error, message: "Not successfully Data Updated.." });
    }
  }
}
export default Handler;
