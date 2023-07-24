import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Classes from "./index.module.css";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { Suspense, useEffect, useState } from "react";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAllPrice);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    if (cartQuantity > 0) {
      setCartEmpty(true);
    } else {
      setCartEmpty(false);
    }
  }, [cartQuantity]);

  return (
    <Container>
      <h1>Checkout</h1>
      <hr />
      {cartEmpty && (
        <Row>
          <Col>
            <h5>
              Order Total:{" "}
              <span className={Classes.productUnderLineSpan2}>
                {totalPrice.toFixed(2)}
                <span
                  className={Classes.productUnderLineSpan3}
                  style={{
                    fontSize: "1.0625rem",
                    top: "-0.46em",
                    position: "relative",
                  }}
                >
                  JD
                </span>
              </span>
            </h5>
          </Col>
        </Row>
      )}
      {cartEmpty && (
        <Row style={{ margin: "10px 0 30px 0" }}>
          <Col>
            <Suspense fallback={<p>Loading PayPal...</p>}>
              <PayPalScriptProvider options={{ "client-id": "test" }}>
                <PayPalButtons
                  style={{
                    color: "blue",
                    shape: "pill",
                    label: "pay",
                    height: 40,
                    position: "relative",
                  }}
                />
              </PayPalScriptProvider>
            </Suspense>
          </Col>
        </Row>
      )}
      {cartEmpty && (
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        className={Classes.image}
                        src={item.image}
                        alt=""
                      ></img>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      {cartEmpty && (
        <Row style={{ marginBottom: 30 }}>
          <h5>
            Order total:{" "}
            <span style={{ fontSize: "1.875rem" }}>
              {totalPrice.toFixed(2)}
            </span>
            JD
          </h5>
        </Row>
      )}
      {cartEmpty && (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <p>
              You can change the delivery date or time by calling our call
              center 48 hours before original delivery date.
            </p>
            <p>
              * Only the selected items above will be assembled upon delivery
            </p>
          </Col>
        </Row>
      )}
      {!cartEmpty && (
        <h3 style={{ margin: "10px 0 30px 0" }}>Cart is Empty!!</h3>
      )}
      {!cartEmpty && (
        <Link href="/">
          <Button
            style={{ marginBottom: 30 }}
            className={Classes.checkoutBtn}
            variant="success"
          >
            Back to the Shop
          </Button>
        </Link>
      )}
      {cartEmpty && (
        <Link href="/cart">
          <Button
            style={{ marginBottom: 30 }}
            className={Classes.checkoutBtn}
            variant="primary"
          >
            Go to the Cart
          </Button>
        </Link>
      )}
    </Container>
  );
};

export default Checkout;
