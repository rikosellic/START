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
import "./studySummary.css";
import "./href.css";
import Logo from "../components/Logo";
import NavBar2 from "../components/Nav2";
import Footer from "../components/Footer";
class studySummary extends React.Component {
  render() {
    return (
	<html>
      <div>
        <div className='studysummary-logo' ><Logo/></div>
          <div class="studysu-button1">
            <Button variant="outline-dark" size="lg" id="bot1" href="/login">Go to Login</Button>
          </div>
          <div class="studysu-button2">
            <Button variant="outline-dark" size="lg" id="bot2" href="/register">Go to Regiseter</Button>
          </div>
      </div>
	</html>
    );
  }
}

export default studySummary;