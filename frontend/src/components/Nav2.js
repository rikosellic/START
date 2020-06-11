import React from 'react'
import {
  Navbar,
  Nav,
  Container,
  Image
} from "react-bootstrap";
import * as bs from "bootstrap"
import "./Nav.css"

const logo = require("../logo/logo.png");

const NavBar2 = (props) => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/main/"+props.myname style={{marginLeft:"-15%"}}><Image src={logo} className="navlogo1" fluid/></Navbar.Brand>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar2;