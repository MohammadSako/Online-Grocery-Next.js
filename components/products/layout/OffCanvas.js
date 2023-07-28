import { Button, Col, Offcanvas, Row } from "react-bootstrap";
import HeaderCartButton from "./HeaderCartButton";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import classes from "./MainNavigation.module.css";
import { cartActions } from "../../../store/cart-slice";
import CartItem from "../../CartComponents/CartItem";

const OffCanvas = ({ name, ...props }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const totalItems = useSelector((state) => state.cart.totalQuantity);
  const totalAllPrices = useSelector((state) => state.cart.totalAllPrice);
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    if (cartQuantity > 0) {
      setCartEmpty(true);
    } else {
      setCartEmpty(false);
      setShow(false);
    }
  }, [cartQuantity, cartItems]);

  //SubTotal
  useEffect(() => {
    dispatch(cartActions.totalAllItems());
  }, [cartItems, dispatch]);

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const toggleShow = () => setShow((s) => !s);

  function viewCartHandler() {
    router.push("/cart");
    setShow(false);
  }
  function checkoutHandler() {
    router.push("/checkout");
    setShow(false);
  }

  return (
    <>
      <HeaderCartButton onClick={toggleShow} />
      <Offcanvas show={show} onHide={handleClose} {...props}>
        <Offcanvas.Header closeButton>
          {cartEmpty && (
            <Offcanvas.Title>
              <h3>Shopping Cart</h3>
            </Offcanvas.Title>
          )}
          {!cartEmpty && (
            <Offcanvas.Title>
              <h3>Cart is empty!</h3>
            </Offcanvas.Title>
          )}
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Row>
            {cartEmpty && (
              <Col>
                <h5>{totalItems} items in total</h5>
              </Col>
            )}
          </Row>

          {cartEmpty && (
            <Row className={classes["cart-items"]}>
              {cartItems.map((item) => (
                <CartItem
                  key={item.id}
                  item={{
                    id: item.id,
                    title: item.title,
                    quantity: item.quantity,
                    total: item.totalPrice,
                    price: item.price,
                    image: item.image,
                    description: item.description,
                  }}
                />
              ))}
            </Row>
          )}
          {cartEmpty && (
            <Row>
              <Row>
                <Col xs={8}>
                  <div className={classes.actionsTotal}>
                    <h6>Subtotal</h6>
                  </div>
                </Col>
                <Col xs={4}>
                  <div className={classes.actionsTotal}>
                    <h6>
                      <span style={{ color: "red" }}>
                        {Number(totalAllPrices).toFixed(2)}
                      </span>
                      <span style={{ fontSize: "1rem" }}> JD</span>
                    </h6>
                  </div>
                </Col>
              </Row>
              <div className="d-grid gap-2 mt-2">
                <Button
                  variant="outline-primary"
                  onClick={() => viewCartHandler(props)}
                >
                  View Cart
                </Button>
              </div>
              <div className="d-grid gap-2 mt-2">
                <Button
                  variant="outline-primary"
                  onClick={() => checkoutHandler(props)}
                >
                  Checkout
                </Button>
              </div>
            </Row>
          )}
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};
export default OffCanvas;
