import React from 'react';
import NavBar from "../components/Nav";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import "./reviewSummary.css";
import "./href.css";
import Logo from "../components/Logo";
import NavBar2 from "../components/Nav2";
import Footer from "../components/Footer";
class studySummary extends React.Component {
	login()
	{

        const url = " http://localhost:8000/api/login";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(),
           }).then(res=>{
			   this.props.history.push('/login');
           })
    }
	register()
	{
        const url = " http://localhost:8000/api/userinfomanagement";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(),
           }).then(res=>{
			   this.props.history.push('/register');
           })
    }
  render() {
    return (
	<html>
      <div>
              <div className='login-logo' ><Logo/></div>
                <Row>
                  <Col>
                  </Col>
                  <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button" onClick={this.login.bind(this)}>登录</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button" onClick={this.register.bind(this)}>注册</Button>
                  </div>
                  <Col>
                  </Col>
                </Row>
      </div>
	</html>
    );
  }
}

export default studySummary;