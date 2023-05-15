import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

const ProductDetail = (props) => {
  return (
    <Container>
      <Card style={{ marginBottom: 10 }}>
        <Row>
          <Col>
            <Card.Img
              style={{ padding: 20, maxHeight: 300, maxWidth: 300 }}
              variant="top"
              src={props.image}
            />
          </Col>
          <Col>
            <Row>
              <Col>
                <Card.Body>
                  <Card.Title>
                    <h2>{props.title}</h2>
                  </Card.Title>
                  <Card.Subtitle className="mb-2 text-muted">
                    {props.description}
                  </Card.Subtitle>
                  <Card.Title>
                    <h4>{props.price} JD</h4>
                  </Card.Title>
                </Card.Body>
              </Col>
            </Row>
            <Row>
              <Col>
                <Card.Body>
                  <Link href="/">
                    <Button variant="primary" style={{ marginBottom: 5 }}>
                      Back
                    </Button>
                  </Link>{" "}
                  <Link href="/">
                    <Button variant="primary" style={{ marginBottom: 5 }}>
                      Add to cart
                    </Button>
                  </Link>{" "}
                </Card.Body>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      <Row>
        <Col>
          <Link href="/">
            <Button variant="danger">Delete Product</Button>
          </Link>
        </Col>
      </Row>
    </Container>
  );
};
export default ProductDetail;
