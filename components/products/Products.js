import { useRouter } from "next/router";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useDispatch } from "react-redux";
import { cartActions } from "../../store/cart-slice";
import Classes from "./Products.module.css";
import { useSession } from "next-auth/react";

const Products = (props) => {
  const router = useRouter();
  const { data: session } = useSession();

  const { title, price, description, id, image } = props;

  const dispatch = useDispatch();
  const addToCartHandler = (e) => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        description,
        image,
      })
    );
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
          className={Classes.image}
          onClick={showDetailHandler}
          variant="top"
          src={image}
        />
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          <Card.Title>{Number(price).toFixed(2)} JD</Card.Title>
          <Card.Text>{description} </Card.Text>
          <div className="d-grid gap-2 mt-2">
            <Button
              className={Classes.buttom}
              variant="white"
              onClick={addToCartHandler}
            >
              Add to Cart
            </Button>
          </div>
          <div className="d-grid gap-2 mt-2">
            <Button
              className={Classes.buttomS}
              variant="white"
              onClick={showDetailHandler}
            >
              Show Details
            </Button>
          </div>
          {session && (
            <div className="d-grid gap-2 mt-2">
              <Button
                className={Classes.buttomD}
                variant="white"
                onClick={deleteProduct}
              >
                Delete
              </Button>
            </div>
          )}
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;