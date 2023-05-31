import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Row from "react-bootstrap/Row";
import Classes from "./CartItem.module.css";

const CartItem = (props) => {
  const dispatch = useDispatch();
  const { name, quantity, total, price, id, image, discription } = props.item;

  const addItem = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        name,
        price,
        image,
        total,
        discription,
        quantity,
      })
    );
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
              <span style={{ color: "Red" }}>{name}</span>{" "}
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
        <div className={Classes.line}>
      </div>
    </>
  );
};
export default CartItem;
