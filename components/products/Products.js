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

const Products = (props) => {
  const getCookie = getCookies();
  const router = useRouter();
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const { data: session } = useSession();
  const { title, price, description, id, image } = props;

  //to enable Delete Button when cart empty
  const [clearCart, setClearCart] = useState(true);
  useEffect(() => {
    if (cartItems.length > 0) {
      setClearCart(false);
    } else setClearCart(true);
  }, [cartItems]);

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
    //to add the items to the cookie storage
    const cartItem = getCookie?.["cartItems"]
      ? JSON.parse(getCookie?.["cartItems"])
      : []; //if the cookie has any items; to merge them with the new one.
    const addToCookies = [
      ...cartItem, //old items in the cookie, merge them with the new one.
      {
        id,
        title,
        price,
        description,
        image,
      },
    ];
    //to set the items in the cookie.
    setCookie(null, "cartItems", JSON.stringify(addToCookies), {
      maxAge: 86400,
      path: "/",
      httpOnly: true,
    });
  }, [dispatch, id, title, price, description, image, getCookie]);

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
      router.push("/");
    },
    [router]
  );

  return (
    <Col style={{ marginTop: 20 }}>
      <Card
        className={!title ? Classes.skeleton : Classes.col}
        style={{ width: "18rem" }}
      >
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
              className={
                !session || !clearCart
                  ? Classes.disabledButtomD
                  : Classes.buttomE
              }
              variant="white"
              onClick={() => editProductHandler(props)}
            >
              {!session && "Login to Edit"}
              {session && !clearCart && "Clear the Cart to Edit"}
              {session && clearCart && "Edit"}
            </Button>
          </div>
          <div className="d-grid gap-2 mt-2">
            <Button
              className={
                !session || !clearCart
                  ? Classes.disabledButtomD
                  : Classes.buttomD
              }
              variant="white"
              onClick={() => deleteProductHandler(props)}
            >
              {!session && "Login to Delete"}
              {session && !clearCart && "Clear the Cart to Delete"}
              {session && clearCart && "Delete"}
            </Button>
          </div>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;
