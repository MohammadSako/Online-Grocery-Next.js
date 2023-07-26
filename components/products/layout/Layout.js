import { Container, Row } from "react-bootstrap";
import Link from "next/link";
import { useSession, signIn } from "next-auth/react";
import MainNavigation from "./MainNavigation";
import classes from "./MainNavigation.module.css";
import Footer from "./Footer";

function Layout(props) {
  const { data: session } = useSession();

  return (
    <Container>
      {!session && (
        <Row>
          <Link href="/" onClick={() => signIn()} className={classes.feedback}>
            <p>Login to get the Admin Privileges</p>
          </Link>
        </Row>
      )}

      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </Container>
  );
}

export default Layout;
