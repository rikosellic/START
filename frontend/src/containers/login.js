import React from 'react';
import Logo from "../components/Logo";
import "./login.css"
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';

class Login extends React.Component {
  render() {
    return (
        <div className='login-div'>
          <div className='login-logo'><Logo/></div>
          <div className='login-title'>Login</div>
          <Form>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control placeholder="Username" />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" />
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="rememberme" />
            </Form.Group>
            <div className="login-button">
            <Button variant="primary" size="sm" type="submit">
              login
            </Button>
            <a href="//www.baidu.com" style={{marginLeft: '5%'}}>forget password?</a>
            <a href="/register" style={{marginLeft: '5%'}}>go to register</a>
            </div>
          </Form>
        </div>
    );
  }
}

export default Login;