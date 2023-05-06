import Layout from "../components/products/layout/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function App({ Component, pageProps }) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
