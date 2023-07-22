// import { MongoClient, ObjectId } from "mongodb";

// async function Handler(req, res) {
//   if (req.method === "POST") {
//     const data = req.body.id;
//     console.log(data);
//     const client = await MongoClient.connect(
//       "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
//     );
//     const db = client.db();
//     const productsCollection = db.collection("products");
//     const result = await productsCollection.deleteOne({ _id: ObjectId(data) });
//     client.close();
//     res.status(201).json({ message: "Data deleted from the server.." });
//   }
// }
// export default Handler;
