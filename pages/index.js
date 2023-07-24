// our-domain.com/
import { MongoClient } from "mongodb";
import ProductsList from "../components/ProductsItem/ProductsList";
import { Fragment, Suspense } from "react";
import Head from "next/head";
import "mapbox-gl/dist/mapbox-gl.css";

const HomePage = (props) => {
  return (
    <Fragment>
      <Head>
        <title>Next JS</title>
        <meta name="description" content="Online Shopping" />
      </Head>
      <Suspense fallback={<h1>Loading Products...</h1> }>
        <ProductsList productsItem={props.products} />
      </Suspense>
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
    revalidate: 1,
  };
}
export default HomePage;
