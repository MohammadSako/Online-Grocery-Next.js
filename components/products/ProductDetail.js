import Link from "next/link";
import { Col, Container, Row } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useSession } from "next-auth/react";
import { signIn } from "next-auth/react";
import { cartActions } from "../../store/cart-slice";
import { useDispatch } from "react-redux";
import Classes from "./Products.module.css";
import React, { useCallback } from "react";
import { useRouter } from "next/router";

const ProductDetail = (props) => {
  const router = useRouter();
  const { data: session } = useSession();
  const { title, price, description, id, image } = props;

  const dispatch = useDispatch();
  const addToCartHandler = useCallback(
    (e) => {
      dispatch(
        cartActions.addItemToCart({
          id,
          title,
          price,
          description,
          image,
        })
      );
    },
    [dispatch, id, title, price, description, image]
  );

  const deleteProductHandler = () => {
    props.onDeleteProduct(props);
  };

  function editProductHandler() {
    router.push("/" + props.id + "/edit");
  }
  
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
                      onClick={() => editProductHandler(props)}
                      className={
                        !session ? Classes.disabledButtomD : Classes.buttomE
                      }
                      variant="white"
                    >
                      {!session && "Login to Edit"}
                      {session && "Edit"}
                    </Button>
                  </div>
                  <div className="d-grid gap-2 mt-2">
                    <Button
                      className={
                        !session ? Classes.disabledButtomD : Classes.buttomD
                      }
                      variant="white"
                      onClick={deleteProductHandler}
                    >
                      {!session && "Login to Delete"}
                      {session && "Delete"}
                    </Button>
                  </div>
                  <Link href="/" className={Classes.backButton}>
                    <div className="d-grid gap-2 mt-2">
                      <Button className={Classes.buttomS} variant="white">
                        Back
                      </Button>{" "}
                    </div>
                  </Link>
                </Card.Body>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>

      {!session && (
        <p onClick={() => signIn()}>
          <i style={{ color: "red", cursor: "pointer" }}>
            Log in to delete the product
          </i>
        </p>
      )}
    </Container>
  );
};
export default React.memo(ProductDetail);
