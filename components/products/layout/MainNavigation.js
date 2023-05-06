import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="md" bg="white" variant="light">
      <Container>
        <Navbar.Brand href="#home">Next Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/new-product">Add a Product</Nav.Link>
            <Nav.Link href="/">Contact Us</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link href="#deets">Login</Nav.Link>
            <Nav.Link href="#deets">Logout</Nav.Link>
            
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
