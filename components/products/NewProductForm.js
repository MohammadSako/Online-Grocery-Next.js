import { useRef } from "react";
import { Button, Col, Container, Form } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";
import useInput from "./layout/use-input";

const NewProductForm = (props) => {
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
    props.onAddProduct(productData);

    resetNameInput;
    resetPriceInput;
    resetImageInput;
    resetDescriptionInput;
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
    <Container style={{ marginTop: 25, maxWidth: 600 }}>
      <h3 style={{ marginBottom: 20 }}>Add a Product</h3>

      <Form onSubmit={submitHandler}>
        <Col style={{ marginBottom: 15 }} className={nameInputClasses}>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Product Name</Form.Label>
            <Form.Control
              style={{ marginBottom: 15 }}
              type="text"
              placeholder="enter product name"
              ref={titleInputRef}
              onChange={nameChangeHandler}
              onBlur={nameBlurHandler}
              value={enteredName}
            />
            {nameInputHasError && (
              <p className="error-text">Please enter product name!</p>
            )}
          </Form.Group>
        </Col>
        <Col style={{ marginBottom: 15 }} className={priceInputClasses}>
          <Form.Label>Product Price</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              aria-label="Amount (to the nearest dollar)"
              placeholder="enter product price"
              ref={priceInputRef}
              onChange={priceChangeHandler}
              onBlur={priceBlurHandler}
              value={enteredPrice}
            />
            <InputGroup.Text>JD</InputGroup.Text>
          </InputGroup>
          {priceInputHasError && (
            <p className="error-text">Please enter product price!</p>
          )}
        </Col>
        <Col style={{ marginBottom: 15 }} className={imageInputClasses}>
          <Form.Group className="mb-3" controlId="formGridProductImage">
            <Form.Label>Product image</Form.Label>
            <Form.Control
              placeholder="insert image URL"
              ref={imageInputRef}
              onChange={imageChangeHandler}
              onBlur={imageBlurHandler}
              value={enteredImage}
            />
            {imageInputHasError && (
              <p className="error-text">Please insert product image!</p>
            )}
          </Form.Group>
        </Col>
        <Col style={{ marginBottom: 15 }} className={descriptionInputClasses}>
          <Form.Group as={Col} controlId="formGridName">
            <Form.Label>Product Description</Form.Label>
            <Form.Control
              style={{ marginBottom: 15 }}
              type="text"
              placeholder="enter product description"
              ref={descriptionInputRef}
              onChange={descriptionChangeHandler}
              onBlur={descriptionBlurHandler}
              value={enteredDescription}
            />
            {descriptionInputHasError && (
              <p className="error-text">Please write product description!</p>
            )}
          </Form.Group>
        </Col>
        <Col>
          <Button disabled={!formIsValid} variant="primary" type="submit">
            Submit
          </Button>
        </Col>
      </Form>
    </Container>
  );
};

export default NewProductForm;
