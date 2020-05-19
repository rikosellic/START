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

class Register extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    email:PropTypes.string.isRequired,
  }
    static defaultProps = {
        username: 'username is illegal',
        password: 'password is illegal',
        email:'email is illegal'
    }
  constructor(props) {
    super(props);
    this.onusernameChange = this.onusernameChange.bind(this);
    this.onpasswordChange = this.onpasswordChange.bind(this);
    this.onemailChange = this.onemailChange.bind(this)
    this.state = {
      username: '',
      password: '',
      email:''
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
                   alert('Successful')
                   this.props.history.push('/login')
               }
               else{
                   alert(res)
               }

           })
       } catch (error) {
       }
    }


  render() {
    const{username,password,email}=this.state;
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
                <Form.Control type="text" placeholder="Please enter your username" onChange={this.onusernameChange}/>
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
                <Form.Control type="password" placeholder="Please enter password again" />
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
            <div className="register-button">
              <Button variant="primary" size="la" block onClick={this.register.bind(this, username, password,email)}>
                register
              </Button>
            </div>
          </Form>
        </div>
    );
  }
}

export default Register;