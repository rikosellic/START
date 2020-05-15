import React from 'react';
import Logo from "../components/Logo";
import "./register.css"
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

class Register extends React.Component {
  render() {
    return (
        <div className='register-div'>
          <div className='register-logo'><Logo/></div>
          <div className='register-title'>register</div>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Username
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" placeholder="Please enter your username"/>
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Please enter your password" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Confirm Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Please enter password again" />
              </Col>
            </Form.Group>

            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Email
              </Form.Label>
              <Col sm="8">
                <Form.Control type="email" placeholder="Please enter your email" />
              </Col>
            </Form.Group>
            <div className="register-button">
              <Button variant="primary" size="la" type="submit">
                register
              </Button>
            </div>
          </Form>
        </div>
    );
  }
}

export default Register;