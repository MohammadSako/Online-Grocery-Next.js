import Link from "next/link";
import { useRouter } from "next/router";
import { Col } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const Products = (props) => {

  const router = useRouter();
  function showDetailHandler() {
    router.push("/" + props.id);
  }

  return (
    <Col style={{margin:"20px 0 10px 0"}}>
      <Card style={{ width: "18rem" }}>
        <Card.Img style={{padding:20}} variant="top" src={props.image} />
        <Card.Body>
          <Card.Title>{props.title}</Card.Title>
          <Card.Title>{props.price} JD</Card.Title>
          <Card.Text>{props.description} </Card.Text>
          <Button variant="primary" onClick={showDetailHandler}>Show Details</Button>{" "}
          <Button variant="primary">Add to cart</Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default Products;