import { useRouter } from "next/router";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Classes from './Products.module.css';

const Products = (props) => {
  const router = useRouter();

  const { title, price, description, id, image } = props;

  const dispatch = useDispatch();
  const addToCartHandler = () => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        description,
        image,
      })
    );
    router.push("/");
  };

  function showDetailHandler() {
    router.push("/" + props.id);
  }

  const deleteProduct = async (e) => {

    // const dataId = router.query.productId;
    console.log(e);

    const response = await fetch("/api/new-product", {
      method: "DELETE",
      body: JSON.stringify(e),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);

    router.push("/");
  };
  return (
    <Col style={{ marginTop: 30 }}>
      <Card className={Classes.col}>
        <Card.Img
          style={{ padding:10, height:250, width:250, maxHeight: 250, minHeight: 250 }}
          variant="top"
          src={image}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Title>{Number(price).toFixed(2)} JD</Card.Title>
          <Card.Text>{description} </Card.Text>
          <Button
            style={{ marginLeft: 5 }}
            variant="primary"
            onClick={showDetailHandler}
          >
            Show Details
          </Button>{" "}
          <Button variant="primary" onClick={addToCartHandler}>
            Add to cart
          </Button>
          {/* <Button variant="danger" onClick={() => deleteProduct(props)}> */}
          <Button variant="danger" onClick={() => deleteProduct(id)}>
            Delete
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
