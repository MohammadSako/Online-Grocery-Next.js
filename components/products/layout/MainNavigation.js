import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSession, signIn, signOut } from "next-auth/react";

function CollapsibleExample() {
  const { data: session } = useSession();
  return (
    <Navbar collapseOnSelect expand="md" bg="white" variant="light">
      <Container>
        <Navbar.Brand href="#home">Next Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            {session && <Nav.Link href="/new-product">Add a Product</Nav.Link>}
            <Nav.Link href="/">Contact Us</Nav.Link>
          </Nav>
          <Nav.Link href="/">
            {session && (
              <span style={{ fontSize: 12, color: "red" }}>
                {session.user.email}
              </span>
            )}
          </Nav.Link>
          <Nav>
            {!session && (
              <Nav.Link href="" onClick={() => signIn()}>
                Login
              </Nav.Link>
            )}

            {session && <Nav.Link onClick={() => signOut()}>Logout</Nav.Link>}
          </Nav>
          
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
