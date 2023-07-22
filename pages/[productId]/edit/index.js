//our-domain.com/news/news
import { Fragment, useCallback } from "react";
import Head from "next/head";
import { MongoClient, ObjectId } from "mongodb";
import { useRouter } from "next/router";
import EditProductForm from "../../../components/products/EditProductForm";

const ProductsEdit = (props) => {
  const router = useRouter();
  const editProductHandler = async (e) => {
    const response = await fetch("/api/update-product", {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    router.push("/");
  };

  return (
    <Fragment>
      <Head>
        <title>Edit {props.productData.title}</title>
        <meta name="description" content={props.productData.description} />
      </Head>
      <EditProductForm
        image={props.productData.image}
        title={props.productData.title}
        price={props.productData.price}
        description={props.productData.description}
        id={props.productData.id}
        onEditProduct={editProductHandler}
      />
    </Fragment>
  );
};

export async function getStaticPaths() {
  //To connect to the server =>
  const client = await MongoClient.connect(
    "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
  );
  const db = client.db();
  const productsCollection = db.collection("products");
  //this will give only IDs
  const products = await productsCollection.find({}, { _id: 1 }).toArray();
  client.close();
  return {
    fallback: "blocking", // true, false, blocking /=> this key tells NextJs whether your paths array contains all supported parameter values or just some of them.
    paths: products.map((product) => ({
      params: {
        productId: product._id.toString(),
      },
    })),
  };
}

export async function getServerSideProps(context) {
  //fetch data for a single product
  const productId = context.params.productId;
  const client = await MongoClient.connect(
    "mongodb+srv://sakodatabase:EYmcsgXd4txjPb9L@cluster1.ksjs9y2.mongodb.net/products?retryWrites=true&w=majority"
  );
  const db = client.db();
  const productsCollection = db.collection("products");
  const selectedProduct = await productsCollection.findOne({
    _id: new ObjectId(productId),
  });
  // console.log(selectedProduct); //this preview it only in the terminal, in the server side only.
  client.close();
  return {
    props: {
      productData: {
        id: selectedProduct._id.toString(),
        image: selectedProduct.image,
        title: selectedProduct.title,
        price: selectedProduct.price,
        description: selectedProduct.description,
      },
    },
  };
}
export default ProductsEdit;
