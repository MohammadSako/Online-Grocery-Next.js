import React from "react";
import Container from "react-bootstrap/Container";
import { NavBar } from "./NavBar";
import { MainBar } from "./MainBar";

function MainNavigation() {
  return (
    <Container>
      <MainBar />
      <NavBar />
    </Container>
  );
}

export default React.memo(MainNavigation);
