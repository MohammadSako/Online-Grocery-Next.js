import { useDispatch, useSelector } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Classes from "./CartItem.module.css";
import { setCookie } from "nookies";
import getCookies from "../../util/getCookies";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const getCookie = getCookies();
  const cartItems = useSelector((state) => state.cart.items);
  // console.log("old", cartItems);
  const { title, quantity, total, price, id, image, description } = props.item;

  const addItem = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        image,
        total,
        description,
        quantity,
      })
    );

    const cartItem = getCookie?.["cartItems"]
      ? JSON.parse(getCookie?.["cartItems"])
      : [];
    const addToCookies = [
      ...cartItem,
      {
        id,
        title,
        price,
        description,
        image,
        quantity,
      },
    ];
    setCookie(null, "cartItems", JSON.stringify(addToCookies), {
      maxAge: 86400,
      path: "/",
    });
  };

  const removeItem = () => {
    dispatch(cartActions.removeItemFromCart(id));
  };

  return (
    <>
      <Row className={Classes.row}>
        <Col>
          <Card.Body>
            <Card.Img className={Classes.image} variant="top" src={image} />
          </Card.Body>
        </Col>
        <Col>
          <Card.Title>
            <span style={{ color: "Red" }}>{title}</span>{" "}
          </Card.Title>
          <Card.Text className="mb-2 text-muted">
            {quantity} X{" "}
            <span style={{ color: "Red" }}>
              ({Number(price).toFixed(2)} JD /item)
            </span>
          </Card.Text>
          <Card.Subtitle className="mb-2 text-muted">
            <h5 className="text-muted">
              Total:{" "}
              <span style={{ color: "Red" }}>
                {Number(price * quantity).toFixed(2)}
              </span>{" "}
              JD
            </h5>
          </Card.Subtitle>
          <ButtonGroup className="me-2">
            <Button variant="outline-primary" onClick={removeItem}>
              <span style={{ fontWeight: "bold" }}>-</span>
            </Button>{" "}
            <Button variant="outline-primary" onClick={addItem}>
              <span style={{ fontWeight: "bold" }}>+</span>
            </Button>{" "}
          </ButtonGroup>
        </Col>
      </Row>
      <div className={Classes.line}></div>
    </>
  );
};
export default CartItem;
