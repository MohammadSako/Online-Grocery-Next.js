import { Provider } from "react-redux";
import Layout from "../components/products/layout/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import store from "../store/index";
import getCookies from "../util/getCookies";
import { cartActions } from "../store/cart-slice";
import { useEffect } from "react";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
  const cookies = getCookies();

  useEffect(() => {
    return () => {
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
    };
  }, []);

  return (
    <Provider store={store}>
      <SessionProvider session={session}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </SessionProvider>
    </Provider>
  );
};
export default App;
