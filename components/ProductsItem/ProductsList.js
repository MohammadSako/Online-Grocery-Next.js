import { Container, Row } from "react-bootstrap";
import Products from "../products/Products";
import React from "react";
import store from "../store/index";
import getCookies from "../util/getCookies";
import { cartActions } from "../store/cart-slice";
import { useEffect } from "react";


const ProductsList = (props) => {
  const cookies = getCookies();

  useEffect(() => {
    return () => {
      const items = cookies?.["cartItems"]
        ? JSON.parse(cookies?.["cartItems"])
        : [];

      items?.forEach(({ id, title, price, description, image }) => {
        store.dispatch(
          cartActions.addItemToCart({
            id,
            title,
            price,
            description,
            image,
          })
        );
      });
    };
  }, []);
  return (
    <Container>
        <Row>
          {props.productsItem.map((product) => (
            <Products
              key={product.id}
              id={product.id}
              title={product.title}
              description={product.description}
              image={product.image}
              price={product.price}
            />
          ))}
        </Row>
    </Container>
  );
};

export default React.memo(ProductsList);
