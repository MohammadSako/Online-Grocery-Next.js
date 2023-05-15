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


import Layout from "../components/products/layout/Layout";
import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SessionProvider } from "next-auth/react";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </SessionProvider>
  );
}
