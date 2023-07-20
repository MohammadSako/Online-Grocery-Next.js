// our-domain.com/new-product
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment, useCallback } from "react";
import EditProductForm from "../../components/products/EditProductForm";

function EditProductPage() {
  const router = useRouter();

  const editProductHandler = useCallback(
    async (e) => {
      // const response = await fetch("/api/new-product", {
      //   method: "POST",
      //   body: JSON.stringify(e),
      //   headers: {
      //     "Content-Type": "application/json",
      //   },
      // });
      // const data = await response.json();
      // console.log(data);
      router.push("/");
    },
    [router]
  );

  return (
    <Fragment>
      <Head>
        <title>Edit Product</title>
        <meta name="description" content="Shop Fresh Products Online" />
      </Head>
      <EditProductForm onEditProduct={editProductHandler} />
    </Fragment>
  );
}

export default EditProductPage;
