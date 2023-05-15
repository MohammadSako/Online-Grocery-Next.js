// our-domain.com/new-product
import Head from "next/head";
import { useRouter } from "next/router";
import { Fragment } from "react";
import NewUser from "./NewUser";

function Login() {
  const router = useRouter();
  
  async function addAuthHandler(e) {
    console.log(e);
    const response = await fetch("/api/new-user", {
      method: "POST",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    router.push('/'); //to go back to the list page
  };

  return (
    <Fragment>
      <Head>
        <title>Login</title>
        <meta name="description" content="Shop Fresh Products Online" />
      </Head>
      <NewUser onAddAuthData={addAuthHandler} />
    </Fragment>
  );
};

export default Login;
