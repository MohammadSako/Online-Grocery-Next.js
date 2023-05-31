import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSession, signOut, signIn } from "next-auth/react";
import HeaderCartButton from "./HeaderCartButton";
import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Row, Col } from "react-bootstrap";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../Cart/CartItem";
import { cartActions } from "../../../store/cart-slice";
import Link from "next/link";
import { parseCookies, setCookie, destroyCookie } from "nookies";

const options = [
  {
    name: "Enable both scrolling & backdrop",
    scroll: false,
    backdrop: true,
    placement: "end",
  },
];

function OffCanvasExample({ name, ...props }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalItems = useSelector((state) => state.cart.totalQuantity);
  const totalAllPrices = useSelector((state) => state.cart.totalAllPrice);
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    if (cartQuantity > 0) {
      setCartEmpty(true);
    } else {
      setCartEmpty(false);
    }

    //session //https://github.com/maticzav/nookies
    
  }, [cartQuantity, cartItems]);

  //SubTotal
  useEffect(() => {
    dispatch(cartActions.totalAllItems());
  }, [cartItems, dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  return (
    <>
      <HeaderCartButton onClick={toggleShow} />
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          {cartEmpty && (
            <Offcanvas.Title>
              <h3>Shopping Cart</h3>
            </Offcanvas.Title>
          )}
          {!cartEmpty && (
            <Offcanvas.Title>
              <h3>Cart is empty!</h3>
            </Offcanvas.Title>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            {cartEmpty && (
              <Col>
                <h5>{totalItems} items in total</h5>
              </Col>
            )}
          </Row>

          {cartEmpty && (
            <Row className={classes["cart-items"]}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    name: item.name,
                    quantity: item.quantity,
                    total: item.totalPrice,
                    price: item.price,
                    image: item.image,
                    discription: item.discription,
                  }}
                />
              ))}
            </Row>
          )}
          {cartEmpty && (
            <Row>
              <Row>
                <Col xs={8}>
                  <div className={classes.actionsTotal}>
                    <h6>Subtotal</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className={classes.actionsTotal}>
                    <h6>
                      <span style={{ color: "red" }}>
                        {Number(totalAllPrices).toFixed(2)}
                      </span>
                      <span style={{ fontSize: "1rem" }}> JD</span>
                    </h6>
                  </div>
                </Col>
              </Row>

              <Row className={classes.buttons}>
                <Link href="/checkout">
                  <div className="d-grid gap-2 mt-2">
                    <Button variant="outline-primary">
                      Checkout
                    </Button>
                  </div>
                </Link>
              </Row>
              <Row className={classes.buttons}>
                <Link href="/cart">
                  <div className="d-grid gap-2 mt-2">
                    <Button variant="outline-primary">
                      View Cart
                    </Button>
                  </div>
                </Link>
              </Row>
            </Row>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

function CollapsibleExample(props) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const { data: session } = useSession();

  return (
    <Navbar collapseOnSelect expand="md" bg="white" variant="light">
      <Container>
      <Link href="/" className={classes.link}><Navbar.Brand href="">Next Js Shop</Navbar.Brand></Link>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            {session && (
              <Link href="/new-product" className={classes.link}>
                Add a Product
              </Link>
            )}
            <Link href="/contact" className={classes.link}>
              Contact Us
            </Link>
          </Nav>

          <Link href="/" className={classes.link}>
            {session && (
              <span style={{ marginRight: 5 }}>
                <img
                  style={{ width: 20, borderRadius: 25 }}
                  src={session.user.image}
                />
              </span>
            )}
            {session && (
              <span style={{ fontSize: 12, color: "red" }}>
                {session.user.email}
              </span>
            )}
          </Link>
          <Nav>
            {!session && (
              <Link href="/" onClick={() => signIn()} className={classes.link}>
                Login
              </Link>
            )}
            {session && (
              <Link href="/" onClick={() => signOut()} className={classes.link}>
                Logout
              </Link>
            )}
          </Nav>

          <Nav>
            {options.map((props, idx) => (
              <OffCanvasExample key={idx} {...props} />
            ))}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;