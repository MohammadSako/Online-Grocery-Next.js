import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import classes from "./Cart.module.css";
import CartItem from "../../components/Cart/CartItem";
import { Button, Container, Row } from "react-bootstrap";
import { cartActions } from "../../store/cart-slice";
import Col from "react-bootstrap/Col";
import { Link } from "react-router-dom";

const Cart = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAllPrices = useSelector((state) => state.cart.totalAllPrice);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalItems = useSelector((state) => state.cart.totalQuantity);

  //Cart Empty Msg
  const [cartEmpty, setCartEmpty] = useState(true);
  useEffect(() => {
    if (cartQuantity > 0) {
      setCartEmpty(false);
    }
    if (cartQuantity === 0) {
      setCartEmpty(true);
    }
  }, [cartQuantity]);

  //SubTotal
  useEffect(() => {
    dispatch(cartActions.totalAllItems());
  }, [cartItems, dispatch]);

  return (
    <Container style={{ marginTop: 30 }}>
      <Row>
        {!cartEmpty && (
          <Col>
            <h2>Cart Items</h2>
            <h6>{totalItems} items in total</h6>
          </Col>
        )}
        {cartEmpty && <h3>Cart is Empty</h3>}
        
      </Row>

      {!cartEmpty && (
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

      {!cartEmpty && (
        <Row>
          <Col className={classes.actions}>
            <Link to="/cartpage" onClick={props.onClose}>
              <Button className={classes.order} variant="outline-primary">
                View Cart
              </Button>
            </Link>
            <Link to="/Checkout" onClick={props.onClose}>
              <Button className={classes.order} variant="primary">
                Checkout
              </Button>
            </Link>

            <div className={classes.actionsTotal}>
              <h3>
                Subtotal{" "}
                <span style={{ fontSize: "1.75rem", color: "red" }}>
                  {totalAllPrices.toFixed(2)}
                </span>
                <span style={{ fontSize: "1rem" }}> JD</span>
              </h3>
            </div>
          </Col>
        </Row>
      )}
    </Container>
  );
};
export default Cart;
