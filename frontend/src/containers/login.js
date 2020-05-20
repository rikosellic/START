import React,{Component} from 'react';
import Logo from "../components/Logo";
import "./login.css"
import "./href.css"
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';

class Login extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.onusernameChange = this.onusernameChange.bind(this);
    this.onpasswordChange = this.onpasswordChange.bind(this);
    this.state = {
      username: '',
      password: ''
    }
  }
  onusernameChange(event) {
    this.setState({
      username: event.target.value,
    });
  }
  onpasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
  }
  render() {
    return (
        <div className='login-div'>
          <div className='login-logo'><Logo/></div>
          <div className='login-title'>Login</div>
          <Form>
            <Form.Group>
              <Form.Label>username</Form.Label>
              <Form.Control placeholder="Username" required onChange={this.onusernameChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.onpasswordChange} required/>
            </Form.Group>
            <Form.Group>
              <Form.Check type="checkbox" label="rememberme" />
            </Form.Group>
            <div className="login-button">
            <Button variant="primary" size="sm" type="submit">
              login
            </Button>
            <span class="blue">
              <a href="//www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&rsv_idx=1&tn=baidu&wd=%E6%80%8E%E4%B9%88%E6%B2%BB%E7%96%97%E8%84%91%E6%AE%8B&fenlei=256&rsv_pq=a680fa0c0001e6b0&rsv_t=6850bfaApw8NgPkUBq5wCWxhOpFK5TRqHtzvFpTABp1%2BSph8Qb1Zn6%2F3HWI&rqlang=cn&rsv_enter=1&rsv_dl=tb&rsv_sug3=21&rsv_sug1=15&rsv_sug7=100&rsv_sug2=0&rsv_btype=i&inputT=12308&rsv_sug4=14886" style={{marginLeft: '5%'}}>forget password?</a>
              <a href="/register" style={{marginLeft: '5%'}}>go to register</a>
            </span>
            </div>
          </Form>
        </div>
    );
  }
}

export default Login;