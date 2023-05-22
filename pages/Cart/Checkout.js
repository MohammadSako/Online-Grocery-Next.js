import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Classes from "./Checkout.module.css";
import Container from "react-bootstrap/Container";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const Checkout = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAllPrice);

  return (
    <Container>
      <h1>Checkout</h1>
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
      <Row style={{ margin: "10px 0 30px 0" }}>
        <Col>
          <PayPalScriptProvider options={{ "client-id": "test" }}>
            <PayPalButtons
              style={{ color: "blue", shape: "pill", label: "pay", height: 40, position:'relative' }}
            />
          </PayPalScriptProvider>
        </Col>
      </Row>
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
      <Row style={{ marginBottom: 30 }}>
        <h5>
          Order total:{" "}
          <span style={{ fontSize: "1.875rem" }}>{totalPrice.toFixed(2)}</span>
          JD
        </h5>
      </Row>
      <Row style={{ marginBottom: 30 }}>
        <Col>
          <p>
            You can change the delivery date or time by calling our call center
            48 hours before original delivery date.
          </p>
          <p>* Only the selected items above will be assembled upon delivery</p>
        </Col>
      </Row>
      <Link to="/cartpage">
        <Button
          style={{ marginBottom: 30 }}
          className={Classes.checkoutBtn}
          variant="primary"
        >
          Back to the Cart
        </Button>
      </Link>
    </Container>
  );
};

export default Checkout;
