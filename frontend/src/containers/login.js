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
              <Form.Control placeholder="Username" required/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" required/>
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="rememberme" />
            </Form.Group>
            <div className="login-button">
            <Button variant="primary" size="sm" type="submit">
              login
            </Button>
            <a href="//www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%80%8E%E4%B9%88%E6%B2%BB%E7%96%97%E8%84%91%E6%AE%8B&fenlei=256&rsv_pq=a680fa0c0001e6b0&rsv_t=6850bfaApw8NgPkUBq5wCWxhOpFK5TRqHtzvFpTABp1%2BSph8Qb1Zn6%2F3HWI&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=21&rsv_sug1=15&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=12308&rsv_sug4=14886" style={{marginLeft: '5%'}}>forget password?</a>
            <a href="/register" style={{marginLeft: '5%'}}>go to register</a>
            </div>
          </Form>
        </div>
    );
  }
}

export default Login;