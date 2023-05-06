import { Row } from "react-bootstrap";
import Products from "./Products";

const ProductsList = (props) => {
  return (
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
  );
};

export default ProductsList;
