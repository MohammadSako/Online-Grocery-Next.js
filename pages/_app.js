import { Provider } from "react-redux";
import Layout from "../components/products/layout/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import store from "../store/index";
import getCookies from "../util/getCookies";
import { cartActions } from "../store/cart-slice";
import { Suspense, useEffect } from "react";
import Loading from "../components/products/layout/UI/Loading";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const cookies = getCookies();
  useEffect(() => {
    const items = cookies?.["cartItems"]
      ? JSON.parse(cookies?.["cartItems"])
      : [];
    items?.forEach(({ id, title, price, description, image }) => {
      store.dispatch(
        cartActions.addItemToCart({
          id,
          title,
          price,
          description,
          image,
        })
      );
    });
  }, []);
  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Suspense fallback={<Loading />}>
            <Component {...pageProps} />
          </Suspense>
        </Layout>
      </SessionProvider>
    </Provider>
  );
};

export default App;
