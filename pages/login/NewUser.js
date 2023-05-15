import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Head from "next/head";
import { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import useInput from "../../components/products/layout/use-input";

const NewUser = (props) => {
  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  //Email
  const {
    value: enteredEmail,
    isValid: enteredEmailIsValid,
    hasError: emailInputHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
    reset: resetEmailInput,
  } = useInput((value) => value.includes("@"));
  //Password

  const {
    value: enteredPassword,
    isValid: enteredPasswordIsValid,
    hasError: passwordInputHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
    reset: resetPasswordInput,
  } = useInput((value) => value.trim() !== "" && value.length > 7);

  let formIsValid = false;
  if (enteredEmail && enteredPassword) {
    formIsValid = true;
  }

  const submitHandler = (e) => {
    e.preventDefault();

    if (!enteredEmailIsValid && !enteredPasswordIsValid) {
      return;
    }

    const enteredEmails = emailInputRef.current.value;
    const enteredPasswords = passwordInputRef.current.value;

    const userData = {
      email: enteredEmails,
      password: enteredPasswords,
    };
    console.log(userData);
    props.onAddAuthData(userData);

    resetEmailInput;
    resetPasswordInput;
  };

  //Css
  //username
  const emailInputClasses = emailInputHasError
    ? "form-control invalid"
    : "form-control";
  //password
  const passwordInputClasses = passwordInputHasError
    ? "form-control invalid"
    : "form-control";

  return (
    <Container style={{ marginTop: 25, maxWidth: 600 }}>
      <Row>
        <Col>
          <Head>
            <title>Login</title>
            <meta name="description" content="Shop Fresh Products Online" />
          </Head>
          <Form onSubmit={submitHandler}>
            <h3 style={{ marginBottom: 20 }}>Login</h3>
            <div style={{ marginBottom: 15 }} className={emailInputClasses}>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="enter your Email"
                  ref={emailInputRef}
                  onChange={emailChangeHandler}
                  onBlur={emailBlurHandler}
                  value={enteredEmail}
                />
                {emailInputHasError && <p>please enter a valid Email!</p>}
              </Form.Group>
            </div>
            <div style={{ marginBottom: 15 }} className={passwordInputClasses}>
              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="enter your Password"
                  ref={passwordInputRef}
                  onChange={passwordChangeHandler}
                  onBlur={passwordBlurHandler}
                  value={enteredPassword}
                />
                {passwordInputHasError && <p>password is too short!</p>}
              </Form.Group>
            </div>
            <div style={{ marginBottom: 10 }}>
              <Button variant="primary" type="submit">
                Login
              </Button>{" "}
              <Button onClick={props.onClose} variant="danger" type="submit">
                Close
              </Button>{" "}
            </div>
            <div>
              Dont have an account yet? <p>Register Here</p>
            </div>
            {/* {ifSession && `Signed in as ${session.user.email} <br />`} */}
            {/* {ifSession && <button onClick={() => signOut()}>Sign out</button>} */}
            {/* <Button variant="primary" type="submit" onClick={() => signIn()}>
                Login with Company Account
              </Button>{" "} */}
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default NewUser;
