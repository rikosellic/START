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
class Main extends React.Component {
  render() {
    return (
	<html>
      <div>
              <div className='login-logo' ><Logo/></div>
              <h4>房间号：123
              </h4>
			  <h4>小华
			  </h4>
			  <Row>
			  <h4>正确的单词：
              </h4>
			  <h4>错误的单词：
              </h4>
			  </Row>
                <Row>
                  <Col>
                  </Col>
                  <div class="main-button">
                    <Button variant="primary" size="lg">继续学习</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button">退出</Button>
                  </div>
                  <Col>
                  </Col>
                </Row>
      </div>
	</html>
    );
  }
}

export default Main;