import { Container, Row } from "react-bootstrap";
import Products from "../products/Products";
import React from "react";

const ProductsList = (props) => {
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
