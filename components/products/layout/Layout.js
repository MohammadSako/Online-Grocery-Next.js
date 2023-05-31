import { Col, Container, Row } from "react-bootstrap";
import Footer from "./Footer";
import MainNavigation from "./MainNavigation";
import { useSession } from "next-auth/react";

function Layout(props) {
  const { data: session } = useSession();

  return (
    <Container>
      <Row>
        {!session && (
          <p
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
          </p>
        )}
      </Row>

      <MainNavigation />
      <main>{props.children}</main>
      <Footer />
    </Container>
  );
}

export default Layout;
