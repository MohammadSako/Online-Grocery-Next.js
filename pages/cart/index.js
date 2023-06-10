import { useDispatch, useSelector } from "react-redux";
import { useEffect,useState } from "react";
import Link from "next/link";
import { cartActions } from "../../store/cart-slice";
import CartItem from "../../components/CartComponents/CartItem";
import OrderSummary from "../../components/CartComponents/OrderSummary";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Classes from "./index.module.css";
import { Button } from "react-bootstrap";

const Cart = (props) => {
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
      {cartEmpty && <h1 style={{ margin: "30px 0 30px 0" }}>Cart is Empty!!</h1>}
      {cartEmpty && (
        <Link href="/">
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
          <h1 className={Classes.checkout}>Cart</h1>
          <p>{totalItems} Items in Total</p>
        </div>
      )}
      {!cartEmpty && (
        <Row>
          <Col>
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

export default Cart;