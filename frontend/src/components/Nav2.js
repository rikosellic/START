import React from 'react'
import {
  Navbar,
  Nav,
  Container
} from "react-bootstrap";
import * as bs from "bootstrap"


const NavBar2 = (props) => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/main">START!</Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar2;