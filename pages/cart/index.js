// import { useDispatch, useSelector } from "react-redux";
// import { useEffect,useState } from "react";
// import Link from "next/link";
// import { cartActions } from "../../store/cart-slice";
// import CartItem from "../../components/CartComponents/CartItem";
// import OrderSummary from "../../components/CartComponents/OrderSummary";
// import Container from "react-bootstrap/Container";
// import Row from "react-bootstrap/Row";
// import Col from "react-bootstrap/Col";
// import Classes from "./index.module.css";
// import { Button } from "react-bootstrap";

// const CartPage = (props) => {
//   const dispatch = useDispatch();
//   const cartItems = useSelector((state) => state.cart.items);
//   const totalItems = useSelector((state) => state.cart.totalQuantity);
//   const [cartEmpty, setCartEmpty] = useState(false);

//   //SubTotal
//   useEffect(() => {
//     dispatch(cartActions.totalAllItems());
//     if (totalItems === 0) {
//       setCartEmpty(true);
//     }
//   }, [cartItems, totalItems, dispatch]);

//   return (
//     <Container className={Classes.container}>
//       {cartEmpty && <h1 style={{ margin: "30px 0 30px 0" }}>Cart is Empty!</h1>}
//       {cartEmpty && (
//         <Link href="/">
//           <Button
//             style={{ marginBottom: 30 }}
//             className={Classes.checkoutBtn}
//             variant="primary"
//           >
//             Back to the Shop
//           </Button>
//         </Link>
//       )}

//       {!cartEmpty && (
//         <div>
//           <h1 className={Classes.checkout}>Cart</h1>
//           <p>{totalItems} Items in Total</p>
//         </div>
//       )}
//       {!cartEmpty && (
//         <Row>
//           <Col>
//             {cartItems.map((item) => (
//               <CartItem
//                 key={item.id}
//                 item={{
//                   id: item.id,
//                   name: item.name,
//                   quantity: item.quantity,
//                   total: item.totalPrice,
//                   price: item.price,
//                   image: item.image,
//                   discription: item.discription,
//                 }}
//               />
//             ))}
//           </Col>
//           <Col lg="5">
//             <OrderSummary />
//           </Col>
//         </Row>
//       )}
//     </Container>
//   );
// };

// export default CartPage;
import Table from "react-bootstrap/Table";
import { useSelector } from "react-redux";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Classes from "./index.module.css";
import Container from "react-bootstrap/Container";
import { Button } from "react-bootstrap";
import Link from "next/link";
import { useEffect, useState } from "react";

const Cart = () => {
  const cartItems = useSelector((state) => state.cart.items);
  const totalPrice = useSelector((state) => state.cart.totalAllPrice);
  const cartQuantity = useSelector((state) => state.cart.totalQuantity);
  const [cartEmpty, setCartEmpty] = useState(false);

  useEffect(() => {
    if (cartQuantity > 0) {
      setCartEmpty(true);
    } else {
      setCartEmpty(false);
    }
  }, [cartQuantity]);

  return (
    <Container>
      <h1>Cart</h1>
      <hr />
      {cartEmpty && (
        <Row>
          <Col>
            <h5>
              Order Total:{" "}
              <span className={Classes.productUnderLineSpan2}>
                {totalPrice.toFixed(2)}
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
              </span>
            </h5>
          </Col>
        </Row>
      )}

      {cartEmpty && (
        <Row>
          <Col>
            <Table>
              <thead>
                <tr>
                  <th></th>
                  <th>Product</th>
                  <th>Quantity</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {cartItems.map((item) => (
                  <tr key={item.id}>
                    <td>
                      <img
                        className={Classes.image}
                        src={item.image}
                        alt=""
                      ></img>
                    </td>
                    <td>{item.name}</td>
                    <td>{item.quantity}</td>
                    <td>{item.price}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
      )}
      {cartEmpty && (
        <Row style={{ marginBottom: 30 }}>
          <h5>
            Order total:{" "}
            <span style={{ fontSize: "1.875rem" }}>
              {totalPrice.toFixed(2)}
            </span>
            JD
          </h5>
        </Row>
      )}
      {cartEmpty && (
        <Row style={{ marginBottom: 30 }}>
          <Col>
            <p>
              You can change the delivery date or time by calling our call
              center 48 hours before original delivery date.
            </p>
            <p>
              * Only the selected items above will be assembled upon delivery
            </p>
          </Col>
        </Row>
      )}
      {!cartEmpty && (
        <h3 style={{ margin: "10px 0 30px 0" }}>Cart is Empty!!</h3>
      )}
      {!cartEmpty && (
        <Link href="/">
          <Button
            style={{ marginBottom: 30 }}
            className={Classes.checkoutBtn}
            variant="success"
          >
            Back to the Shop
          </Button>
        </Link>
      )}
      {cartEmpty && (
        <Link href="/">
          <Button
            style={{ marginBottom: 30 }}
            className={Classes.checkoutBtn}
            variant="primary"
          >
            Go to the Shop
          </Button>
        </Link>
      )}
    </Container>
  );
};

export default Cart;
