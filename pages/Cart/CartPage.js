import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartActions } from "../../store/cart-slice";
import CartItem from "../../components/Cart/CartItem";
import OrderSummary from "../../components/Cart/OrderSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Classes from "./CartPage.module.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";

const CartPage = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalItems = useSelector((state) => state.cart.totalQuantity);
  const [cartEmpty, setCartEmpty] = useState(false);

  //SubTotal
  useEffect(() => {
    dispatch(cartActions.totalAllItems());
    if (totalItems === 0) {
      setCartEmpty(true);
    }
  }, [cartItems, totalItems, dispatch]);

  return (
    <Container className={Classes.container}>
      {cartEmpty && <h1 style={{ marginBottom: 30 }}>Cart is Empty!</h1>}
      {cartEmpty && (
        <Link to="/products">
          <Button
            style={{ marginBottom: 30 }}
            className={Classes.checkoutBtn}
            variant="primary"
          >
            Back to the Shop
          </Button>
        </Link>
      )}

      {!cartEmpty && (
        <div>
          <h2 className={Classes.checkout}>Checkout</h2>
          <p>{totalItems} Items in Total</p>
        </div>
      )}
      {!cartEmpty && (
        <Row>
          <Col lg="7">
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
          </Col>
          <Col lg="5">
            <OrderSummary />
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default CartPage;
