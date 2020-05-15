import React from 'react'
import {
  Navbar,
  Nav,
  Container
} from "react-bootstrap";
import * as bs from "bootstrap"


const NavBar = (props) => {
  return (
    <header>
      <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="/main">START!</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav"/>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Link href="/user">个人信息</Nav.Link>
              <Nav.Link href="/user">退出登录</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default NavBar;