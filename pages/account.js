import React from "react";
import { getSession, useSession, signOut } from "next-auth/react";
import { Button, Col, Container, Row } from "react-bootstrap";

const Account = () => {
  const { data: session, status } = useSession();

  if (status === "authenticated") {
    return (
      <Container style={{marginTop:50}}>
        <Row>
          <Col>
            <h4>Welcome {session.user.name}</h4>
            <Button onClick={() => signOut()}>Logout</Button>
          </Col>
        </Row>
      </Container>
    );
  } else {
    return (
      <div>
        <p>You are not signed in!</p>
      </div>
    );
  }
};

export default Account;

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  if (!session) {
    return {
      redirect: {
        destination: "/login",
      },
    };
  }
  return {
    props: { session },
  };
};
