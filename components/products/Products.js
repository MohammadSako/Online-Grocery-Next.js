import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { cartActions } from "../../store/cart-slice";
import Classes from "./Products.module.css";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { setCookie } from "nookies";
import getCookies from "../../util/getCookies";
import Link from "next/link";

const Products = (props) => {
  const cookies = getCookies();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { data: session } = useSession();
  const { title, price, description, id, image } = props;

  const addToCartHandler = useCallback(() => {
    dispatch(
      cartActions.addItemToCart({
        id,
        title,
        price,
        description,
        image,
      })
    );
    const cartItems = cookies?.["cartItems"]
      ? JSON.parse(cookies?.["cartItems"])
      : [];
    const addToCookies = [
      ...cartItems,
      {
        id,
        title,
        price,
        description,
        image,
      },
    ];
    setCookie(null, "cartItems", JSON.stringify(addToCookies), {
      maxAge: 86400,
      path: "/",
    });
  }, [dispatch, id, title, price, description, image, cookies]);

  function showDetailHandler() {
    router.push("/" + props.id);
  }
  function editProductHandler() {
    router.push("/" + props.id + "/edit");
  }

  const deleteProductHandler = useCallback(
    async (e) => {
      const response = await fetch("/api/delete-product", {
        method: "POST",
        body: JSON.stringify(e),
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await response.json();
      console.log(data);
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
              onClick={() => editProductHandler(props)}
              className={!session ? Classes.disabledButtomD : Classes.buttomE}
              variant="white"
            >
              {!session && "Login to Edit"}
              {session && "Edit"}
            </Button>
          </div>
          <div className="d-grid gap-2 mt-2">
            <Button
              className={!session ? Classes.disabledButtomD : Classes.buttomD}
              variant="white"
              onClick={() => deleteProductHandler(props)}
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
