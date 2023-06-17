import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { cartActions } from "../../store/cart-slice";
import Row from "react-bootstrap/Row";
import { Button } from "react-bootstrap";
import { RiSecurePaymentLine } from "react-icons/ri";
import { TbTruckReturn } from "react-icons/tb";
import Classes from "./OrderSummary.module.css";
import Link from "next/link";

const OrderSummary = (props) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAllPrices = useSelector((state) => state.cart.totalAllPrice);
  //SubTotal
  useEffect(() => {
    dispatch(cartActions.totalAllItems());
  }, [cartItems, dispatch]);

  return (
    <div>
      <h5>Order Summary</h5>
      <Row>
        <div className={Classes.orderProductsDiv}>
          <span className={Classes.orderProductsDivSpan}>Products</span>
          <span className={Classes.orderProductsDivSpanJd}>
            JD {totalAllPrices.toFixed(2)}
          </span>
        </div>
      </Row>

      <Row className={Classes.productUnderLine}>
        <div>
          <span className={Classes.productUnderLineSpan}>
            Subtotal price for order incl. VAT
          </span>
          <span className={Classes.productUnderLineSpan2}>
            {" "}
            <span
              className={Classes.productUnderLineSpan3}
              style={{
                fontSize: "1.0625rem",
                top: "-0.46em",
                position: "relative",
              }}
            >
              JD
            </span>
            {totalAllPrices.toFixed(2)}
          </span>
        </div>
        <p className={Classes.productUnderLineP}>
          By clicking check out youre agreeing to our Privacy Policy
        </p>
        <Link href="/checkout">
          <Button className={Classes.checkoutBtn} variant="primary">
            Go to checkout
          </Button>
        </Link>
        <p className={Classes.checkoutP}>
          <span>
            <TbTruckReturn size={25} /> 90 days to change your mind
          </span>
        </p>
        <p className={Classes.checkoutP}>
          <span>
            <RiSecurePaymentLine size={25} /> Secure shopping with SSL
            encryption
          </span>
        </p>
      </Row>
      <Link href="/">
        <Button className={Classes.button} variant="outline-primary">
          Back to the Shop
        </Button>
      </Link>
    </div>
  );
};

export default OrderSummary;
