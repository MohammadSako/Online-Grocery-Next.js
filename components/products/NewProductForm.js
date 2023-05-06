import { useState } from "react";
import { useRef } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import InputGroup from "react-bootstrap/InputGroup";

const NewProductForm = (props) => {
  const titleInputRef = useRef();
  const imageInputRef = useRef();
  const priceInputRef = useRef();
  const descriptionInputRef = useRef();

  const [enteredName, setEnteredName] = useState("");
  const [enteredNameIsValid, setEnteredNameIsValid] = useState(true);
  const [enteredNameTouched, setEnteredNameTouched] = useState(false);

  const titleInputChangehandler = (e) => {
    setEnteredName(e.target.value);
    if (e.target.value.trim() !== "") {
      setEnteredNameIsValid(true);
    }
  };

  const nameInputBlurHandler = (e) => {
    setEnteredNameTouched(true);
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
    }
  };

  const submitHandler = (e) => {
    e.preventDefault();
    setEnteredNameTouched(true);

    //to stop the submit when the form is empty.
    if (enteredName.trim() === "") {
      setEnteredNameIsValid(false);
      return;
    }

    setEnteredNameIsValid(true);

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
    // setEnteredTitleName('');
  };

  const nameInputIsInvalid = !enteredNameIsValid && enteredNameTouched;
  const nameInputClasses = !enteredNameIsValid
    ? "form-control invalid"
    : "form-control";

  return (
    <Container>
      <Card className="mt-3 p-3">
        <Row>
          <Col>
            <Form onSubmit={submitHandler}>
              <Row className="mb-3">
                <Col className={nameInputClasses}>
                  <Form.Group as={Col} controlId="formGridName">
                    <Form.Label>Product Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="Enter Product Name"
                      ref={titleInputRef}
                      onChange={titleInputChangehandler}
                      onBlur={nameInputBlurHandler}
                      value={enteredName}
                    />
                    {nameInputIsInvalid && (
                      <p className="error-text">Please enter product Name!</p>
                    )}
                  </Form.Group>
                </Col>
                <Col>
                  <Form.Label>Product Price</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control
                      aria-label="Amount (to the nearest dollar)"
                      placeholder="Enter the price"
                      ref={priceInputRef}
                    />
                    <InputGroup.Text>JD</InputGroup.Text>
                  </InputGroup>
                </Col>{" "}
              </Row>

              <Form.Group className="mb-3" controlId="formGridProductImage">
                <Form.Label>Product image</Form.Label>
                <Form.Control
                  placeholder="Insert Image URL"
                  ref={imageInputRef}
                />
              </Form.Group>

              <Form.Group
                className="mb-3"
                controlId="exampleForm.ControlTextarea1"
              >
                <Form.Label>Product Description</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={3}
                  placeholder="Enter Product Description"
                  ref={descriptionInputRef}
                />
              </Form.Group>

              <Button variant="primary" type="submit">
                Submit
              </Button>
            </Form>
          </Col>
        </Row>
      </Card>{" "}
    </Container>
  );
};

export default NewProductForm;
