import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { useSession, signOut } from "next-auth/react";
import HeaderCartButton from "./HeaderCartButton";
import React, { useEffect, useState } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import { Button, Row, Col } from "react-bootstrap";
import classes from "./MainNavigation.module.css";
import { useDispatch, useSelector } from "react-redux";
import CartItem from "../../Cart/CartItem";
import { cartActions } from "../../../store/cart-slice";
import Link from "next/link";

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
  }, [cartQuantity]);

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
          <Offcanvas.Title>Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            {cartEmpty && (
              <Col>
                <h2>Cart Items</h2>
                <h6>{totalItems} items in total</h6>
              </Col>
            )}
            {!cartEmpty && <h3>Cart is empty!</h3>}
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
              <Col className={classes.actions}>
                <Link href="/cart">
                  <Button className={classes.order} variant="outline-primary">
                    View Cart
                  </Button>
                </Link>
                <Link href="/checkout">
                  <Button className={classes.order} variant="primary">
                    Checkout
                  </Button>
                </Link>
                <div className={classes.actionsTotal}>
                  <h3>
                    Subtotal{" "}
                    <span style={{ fontSize: "1.75rem", color: "red" }}>
                      {Number(totalAllPrices).toFixed(2)}
                    </span>
                    <span style={{ fontSize: "1rem" }}> JD</span>
                  </h3>
                </div>
              </Col>
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
        <Navbar.Brand href="">Next Shop</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Link href="/">Home</Link>
            {session && <Link href="/new-product">Add a Product</Link>}
            <Link href="/contact">Contact Us</Link>
          </Nav>
          <Link href="/">
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
            {!session && <Link href="/login">Login</Link>}
            {session && <Link onClick={() => signOut()}>Logout</Link>}
          </Nav>

          <Nav>
            {options.map((props, idx) => (
              <OffCanvasExample key={idx} {...props} />
            ))}
          </Nav>
          {/* <Nav>
            <Link href="/Cart">
              <HeaderCartButton onClick={props.onShowCart} />
            </Link>
          </Nav> */}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
