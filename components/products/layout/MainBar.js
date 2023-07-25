import React, { useCallback } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { redirect } from "react-router-dom";
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { OffCanvas, OffCanvasExample } from "./OffCanvas";

export function MainBar() {
  const { data: session } = useSession();
  const signOutHandler = useCallback(() => {
    signOut();
    return redirect("/");
  }, []);

  const options = [
    {
      name: "Enable both scrolling & backdrop",
      scroll: false,
      backdrop: true,
      placement: "end",
    },
  ];

  return (
    <>
      <Navbar bg="white" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="#home">Next Js Shop</Navbar.Brand>
          
        </Container>
        <Nav className="me-auto">
            <Link href="/" className={classes.link}>
              {session && (
                <span style={{ marginRight: 5 }}>
                  <img
                    style={{ width: 20, borderRadius: 25 }}
                    src={session.user.image}
                  />
                </span>
              )}
            </Link>
            <Nav>
              {!session && (
                <Link
                  href="/"
                  onClick={() => signIn()}
                  className={classes.link}
                >
                  Login
                </Link>
              )}
              {session && (
                <Link
                  href="/"
                  onClick={signOutHandler}
                  className={classes.link}
                >
                  Logout
                </Link>
              )}
            </Nav>
          </Nav>
        <Nav>
          {options.map((props, idx) => (
            <OffCanvas key={idx} {...props} />
          ))}
        </Nav>
      </Navbar>
    </>
  );
}
