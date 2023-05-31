import { Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import { useSession, signIn } from "next-auth/react";
import Link from "next/link";
import classes from "./MainNavigation.module.css";

function Layout(props) {
  const { data: session } = useSession();

  return (
    <Container>
      <Row>
        {!session && (
          <Link href="/" onClick={() => signIn()} className={classes.link}><p
            style={{
              background:
                "radial-gradient(circle, rgba(0,212,255,1) 0%, rgba(0,212,255,1) 1%, rgba(255,255,255,1) 73%)",
              color: "#2b4db5",
              textAlign: "center",
              height: "35px",
              padding: 5,
              fontWeight: 600,
            }}
          >
            Login to get the Admin Privileges
          </p></Link>
        )}
      </Row>

      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </Container>
  );
}

export default Layout;