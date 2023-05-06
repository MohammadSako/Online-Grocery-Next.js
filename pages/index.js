// our-domain.com/
import { MongoClient } from "mongodb";
import ProductsList from "../components/products/ProductsList";
import { Fragment } from "react";
import Head from "next/head";
// const Dummy_items = [
//   {
//     id: "p1",
//     title: "Orange",
//     description: "Fresh Orange",
//     image:
//       "https://res.cloudinary.com/dai7hljsg/image/upload/v1665919496/market/xrjz29hcnntpzeeowydv.jpg",
//     price: 1,
//   },
//   {
//     id: "p2",
//     title: "Strawberry",
//     description: "Fresh Strawberry",
//     image:
//       "https://res.cloudinary.com/dai7hljsg/image/upload/v1665920515/market/ewxaontxiwiwowpvb5ap.jpg",
//     price: 3,
//   },
//   {
//     id: "p3",
//     title: "Pasion Fruit",
//     description: "Organic Pasion Fruit",
//     image:
//       "https://res.cloudinary.com/dai7hljsg/image/upload/v1665919536/market/qsem7hanwje3t5yudsaa.jpg",
//     price: 2,
//   },
// ];
const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Next JS</title>
        <meta name="description" content="Online Shopping" />
      </Head>
      <ProductsList productsItem={props.products} />
    </Fragment>
  );
};

//SSG Static-Site Generation
export async function getStaticProps() {
  const client = await MongoClient.connect(
    "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
  );
  const db = client.db();
  const productsCollection = db.collection("products");
  const products = await productsCollection.find().toArray();
  client.close();

  return {
    props: {
      products: products.map((product) => ({
        title: product.title,
        price: product.price,
        image: product.image,
        description: product.description,
        id: product._id.toString(),
      })),
    },
    revalidate: 1, //unlock a feature called incremental Static Generation. ISR
  };
}

//SSR Server-Side Rendering
// export async function getServerSideProps(props) {
//   const req = context.req;
//   const res = context.res;
//   return {
//     props: {
//       products: Dummy_items,
//     },
//   };
// }

export default HomePage;
