import { Container, Row } from "react-bootstrap";
import Products from "../products/Products";

const ProductsList = (props) => {
  return (
    <Container>
      <ul>
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
      </ul>
    </Container>
  );
};

export default ProductsList;
