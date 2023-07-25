import React, { useCallback } from "react";
import { useSession, signOut, signIn } from "next-auth/react";
import { redirect } from "react-router-dom";
import Link from "next/link";
import classes from "./MainNavigation.module.css";
import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";

export function NavBar() {
  const { data: session } = useSession();
  const signOutHandler = useCallback(() => {
    signOut();
    return redirect("/");
  }, []);

  return (
    <>
      <Navbar bg="white" data-bs-theme="light">
        <Container>
          <Nav className="me-auto">
            <Link href="/" className={classes.link}>
              Home
            </Link>
            <Link href="/contact" className={classes.link}>
              Contact Us
            </Link>

            <Link
              href="/new-product"
              className={!session ? classes.disabled : classes.link}
            >
              {!session && "Login to Add Products"}
              {session && "Add a Product"}
            </Link>
          </Nav>
        </Container>
      </Navbar>
    </>
  );
}
