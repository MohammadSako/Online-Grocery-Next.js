import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { cartActions } from "../../store/cart-slice";
import Classes from "./Products.module.css";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { data: session } = useSession();
  const { title, price, description, id, image } = props;

  const addToCartHandler = useCallback(
    () => {
      dispatch(
        cartActions.addItemToCart({
          id,
          title,
          price,
          description,
          image,
        })
      );
    },
    [dispatch, id, title, price, description, image]
  );

  function showDetailHandler() {
    router.push("/" + props.id);
  }

  //https://www.udemy.com/course/react-the-complete-guide-incl-redux/learn/lecture/15700370
  // async function deleteProductHandler(e) {
  const deleteProductHandler = useCallback(
    async (e) => {
      console.log(e);
      const response = await fetch("/api/new-product", {
        method: "DELETE",
        body: e,
        headers: {
          "Content-Type": "application/json",
        },
      });
      // const data = await response.json();
      router.push("/");
    },
    [router]
  );

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
          <Card.Title>
            {Number(price).toFixed(2)} JD{" "}
            <span style={{ color: "red", fontSize: 15 }}>per/1kg</span>
          </Card.Title>
          <Card.Text>
            <i>{description}</i>{" "}
          </Card.Text>
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

          <div className="d-grid gap-2 mt-2">
            <Button
              className={!session ? Classes.disabledButtomD : Classes.buttomD}
              variant="white"
              // onClick={deleteProductHandler}
              onClick={() => deleteProductHandler(id)}
            >
              {!session && "Login to Delete"}
              {session && "Delete"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
