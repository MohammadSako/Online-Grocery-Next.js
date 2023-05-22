// import Layout from "../components/products/layout/Layout";
// import "../styles/globals.css";
// import "bootstrap/dist/css/bootstrap.min.css";

// export default function App({
//   Component,
//   pageProps,
// }) {
//   return (
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//   );
// }

import { Provider } from "react-redux";
import Layout from "../components/products/layout/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";
import store from "../store/index";

const App = ({ Component, pageProps: { session, ...pageProps } }) => {
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
