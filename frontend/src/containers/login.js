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
import {withRouter} from "react-router-dom";

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
    document.getElementById("btn").disabled=false;
  }
  onpasswordChange(event) {
    this.setState({
      password: event.target.value,
    });
    document.getElementById("btn").disabled=false;
  }
  login(username,password) {
    const loginValue = {"username": username,
    "password": password}
    const url = " http://localhost:8000/api/login";
    if(username == ''){
      document.getElementById("btn").disabled=true;
      alert("user name can't be empty");
    }
    if(password == ''){
      document.getElementById("btn").disabled=true;
      alert("password name can't be empty");
    }else{
    try {
      fetch(url, {
        method: "POST",
        headers: {
          "Content-type":"application/json;charset=utf-8",
        },
        body: JSON.stringify(loginValue),
        }).then(res=>{
          if(res.status === 200){
            alert('Successful')
            this.props.history.push({pathname:'/main/'+this.state.username})
          }
          else{
            alert('Your username or password is wrong!')
            document.getElementById("btn").disabled=true;
          }
        })
        } catch (error) {
      }
    }
  }
  render() {
    const{username,password}=this.state
    return (
        <div className='login-div'>
          <div className='login-logo'><Logo/></div>
          <Form>
            <Form.Group>
              <Form.Label>Username</Form.Label>
              <Form.Control placeholder="Username" required onChange={this.onusernameChange}/>
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Password" onChange={this.onpasswordChange} required/>
            </Form.Group><br/>
            <div className="login-button">
              <Button id="btn" variant="primary" size="sm" onClick={this.login.bind(this, username, password)}>
                Login
              </Button>
            </div>
            <div className="login-button1">
            <span class="blue">
              <a href="/register">go to register</a>
            </span>
            </div>
          </Form>
        </div>
    );
  }
}

export default Login;