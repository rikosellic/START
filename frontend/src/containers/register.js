import React,{Component} from 'react';
import Logo from "../components/Logo";
import "./register.css"
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Alert,
  Button,
} from 'react-bootstrap';
import PropTypes from 'prop-types';
import $ from 'jquery'

class Register extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    password2: PropTypes.string.isRequired,
    email:PropTypes.string.isRequired,
  }
  constructor(props) {
    super(props);
    this.onusernameChange = this.onusernameChange.bind(this);
    this.onpasswordChange = this.onpasswordChange.bind(this);
    this.onpassword2Change = this.onpassword2Change.bind(this);
    this.onemailChange = this.onemailChange.bind(this)
    this.state = {
      username: '',
      password: '',
      password2: '',
      email:'',
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
  onpassword2Change(event) {
    this.setState({
      password2: event.target.value,
    });
  }
  onemailChange(event) {
    this.setState({
      email: event.target.value,
    });
  }
   register(username,password,email) {
       const registerValue = {"username": username,
                              "password": password,
                              "email":email}
       const url = " http://localhost:8000/api/userinfomanagement";
       try {
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(registerValue),
           }).then(res=>{
               if(res.status === 201){
                   alert('Successful');
                   this.props.history.push('/login');
               }
               else{
                   alert("username or email is already registered");
               }
           })
       } catch (error) {
       }
    }
    checkinformation(password,password2,username,email){
      if(password != password2){
        document.getElementById("btn").disabled=true;
        alert("The passwords are different");
      }
      if(username == ''){
        document.getElementById("btn").disabled=true;
        alert("user name can't be empty");
      }
      if(email == ''){
        document.getElementById("btn").disabled=true;
        alert("email name can't be empty");
      }else{
        document.getElementById("btn").disabled=false;
      }
    }
  render() {
    const{username,password,password2,email}=this.state;
    return (
        <div className='register-div'>
          <div className='register-logo'><Logo/></div>
          <div className='register-title'>Register</div>
          <Form>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Username
              </Form.Label>
              <Col sm="8">
                <Form.Control type="text" placeholder="Please enter your username" onChange={this.onusernameChange} />
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Please enter your password" onChange={this.onpasswordChange}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Confirm Password
              </Form.Label>
              <Col sm="8">
                <Form.Control type="password" placeholder="Please enter password again" onChange={this.onpassword2Change}/>
              </Col>
            </Form.Group>
            <Form.Group as={Row}>
              <Form.Label column sm="4">
                Email
              </Form.Label>
              <Col sm="8">
                <Form.Control type="email" placeholder="Please enter your email" onChange={this.onemailChange} />
              </Col>
            </Form.Group>
            <div className="register-button"><br/>
              <Button id="btn" variant="primary" align="center" size="la" block onClick={this.register.bind(this, username, password,email)} onMouseEnter={this.checkinformation.bind(this,password,password2,username,email)}>
                Register
              </Button>
            </div>
          </Form>
        </div>
    );
  }
}

export default Register;
