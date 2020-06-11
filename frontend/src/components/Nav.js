import React from 'react'
import {
  Navbar,
  Nav,
  Container,
  Image,
} from "react-bootstrap";
import * as bs from "bootstrap"
import "./Nav.css"

const logo = require("../logo/logo.png");

const NavBar = (props) => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href={"/main/"+props.myname} style={{marginLeft:"-15%"}}><Image src={logo} className="navlogo1" fluid/></Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/personal">Hello, {props.myname}</Nav.Link>
              <Nav.Link href="/personal">Sign Out</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;