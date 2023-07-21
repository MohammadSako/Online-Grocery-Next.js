import React, { useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import useInput from "./layout/use-input";
import { useRouter } from "next/router";
import Link from "next/link";
import Classes from "./Products.module.css";

const EditProductForm = (props) => {
  const router = useRouter();
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();
  //Title
  const {
    value: enteredName,
    isValid: enteredNameIsValid,
    hasError: nameInputHasError,
    valueChangeHandler: nameChangeHandler,
    inputBlurHandler: nameBlurHandler,
    reset: resetNameInput,
  } = useInput((value) => value.trim() !== "");
  //Price
  const {
    value: enteredPrice,
    isValid: enteredPriceIsValid,
    hasError: priceInputHasError,
    valueChangeHandler: priceChangeHandler,
    inputBlurHandler: priceBlurHandler,
    reset: resetPriceInput,
  } = useInput((value) => value.trim() !== "");
  //Image
  const {
    value: enteredImage,
    isValid: enteredImageIsValid,
    hasError: imageInputHasError,
    valueChangeHandler: imageChangeHandler,
    inputBlurHandler: imageBlurHandler,
    reset: resetImageInput,
  } = useInput((value) => value.trim() !== "");
  //Description
  const {
    value: enteredDescription,
    isValid: enteredDescriptionIsValid,
    hasError: descriptionInputHasError,
    valueChangeHandler: descriptionChangeHandler,
    inputBlurHandler: descriptionBlurHandler,
    reset: resetDescriptionInput,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (
    enteredNameIsValid &&
    enteredPriceIsValid &&
    enteredImageIsValid &&
    enteredDescriptionIsValid
  ) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (
      !enteredNameIsValid &&
      !enteredImageIsValid &&
      !enteredPriceIsValid &&
      !enteredDescriptionIsValid
    ) {
      return;
    }

    const enteredTitle = titleInputRef.current.value;
    const enteredImage = imageInputRef.current.value;
    const enteredPrice = priceInputRef.current.value;
    const enteredDescription = descriptionInputRef.current.value;
    const productData = {
      title: enteredTitle,
      image: enteredImage,
      price: enteredPrice,
      description: enteredDescription,
    };
    props.onEditProduct(productData);

    resetNameInput;
    resetPriceInput;
    resetImageInput;
    resetDescriptionInput;

    router.push("/"); //to go back to the list page
  };

  //Css
  //title
  const nameInputClasses = nameInputHasError
    ? "form-control invalid"
    : "form-control";
  //price
  const priceInputClasses = priceInputHasError
    ? "form-control invalid"
    : "form-control";
  //Image
  const imageInputClasses = imageInputHasError
    ? "form-control invalid"
    : "form-control";
  //Description
  const descriptionInputClasses = descriptionInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <Container>
      <h3 style={{ marginBottom: 30 }}>Edit Product</h3>
      <Row>
        <Col lg={4} style={{ marginBottom: 15 }}>
          <Col>
            <Card className={Classes.col}>
              <Card.Img
                className={Classes.image}
                variant="top"
                src={props.image}
              />
              <Card.Body>
                <Card.Title>{props.title}</Card.Title>
                <Card.Title>
                  {Number(props.price).toFixed(2)} JD{" "}
                  <span style={{ color: "red", fontSize: 15 }}>per/1kg</span>
                </Card.Title>
                <Card.Text>
                  <i>{props.description}</i>{" "}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
        </Col>
        <Col lg={8}>
          <Form onSubmit={submitHandler}>
            <Col style={{ marginBottom: 15 }} className={nameInputClasses}>
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Product Name</Form.Label>
                <Form.Control
                  style={{ marginBottom: 15 }}
                  type="text"
                  placeholder={props.title}
                  ref={titleInputRef}
                  onChange={nameChangeHandler}
                  onBlur={nameBlurHandler}
                  value={enteredName}
                  // defaultValue={props.title}
                />
                {nameInputHasError && (
                  <p className="error-text">Please enter new product name!</p>
                )}
              </Form.Group>
            </Col>
            <Col style={{ marginBottom: 15 }} className={priceInputClasses}>
              <Form.Label>Product Price</Form.Label>
              <InputGroup className="mb-3">
                <Form.Control
                  aria-label="Amount (to the nearest dollar)"
                  placeholder={props.price}
                  ref={priceInputRef}
                  onChange={priceChangeHandler}
                  onBlur={priceBlurHandler}
                  value={enteredPrice}
                />
                <InputGroup.Text>JD</InputGroup.Text>
              </InputGroup>
              {priceInputHasError && (
                <p className="error-text">Please enter new product price!</p>
              )}
            </Col>
            <Col style={{ marginBottom: 15 }} className={imageInputClasses}>
              <Form.Group className="mb-3" controlId="formGridProductImage">
                <Form.Label>Product image</Form.Label>
                <Form.Control
                  placeholder={props.image}
                  ref={imageInputRef}
                  onChange={imageChangeHandler}
                  onBlur={imageBlurHandler}
                  value={enteredImage}
                />
                {imageInputHasError && (
                  <p className="error-text">Please insert new product image!</p>
                )}
              </Form.Group>
            </Col>
            <Col
              style={{ marginBottom: 15 }}
              className={descriptionInputClasses}
            >
              <Form.Group as={Col} controlId="formGridName">
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  style={{ marginBottom: 15 }}
                  type="text"
                  placeholder={props.description}
                  ref={descriptionInputRef}
                  onChange={descriptionChangeHandler}
                  onBlur={descriptionBlurHandler}
                  value={enteredDescription}
                />
                {descriptionInputHasError && (
                  <p className="error-text">
                    Please write new product description!
                  </p>
                )}
              </Form.Group>
            </Col>
            <Row xs={4} sm={6} md={6} lg={6}>
              <Col>
                <Button disabled={!formIsValid} variant="primary" type="submit">
                  Update
                </Button>
              </Col>
              <Col>
                <Link href="/">
                  <Button variant="danger">Cancel</Button>
                </Link>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default React.memo(EditProductForm);
