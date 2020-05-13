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
import "./main.css"
import Logo from "../components/Logo";
import Footer from "../components/Footer";

class Main extends React.Component {
  render() {
    return (
      <div>
        <NavBar/>
        <main role="main">
          <Jumbotron>
            <Container>
              <Logo/>
              <h4>
                这是你加入START!的第3天，你已经学习了150个单词。
              </h4>
              <p className="search-box">
                <Row>
                  <Col></Col>
                  <Form inline>
                    <Form.Control type="text" placeholder="🔍搜索单词" className="mr-sm-2" required/>
                    <Button variant="success" type="submit">搜索</Button>
                  </Form>
                  <Col></Col>
                </Row>
              </p>
              <p>
                <Row>
                  <Col>
                  </Col>
                  <div class="main-button">
                    <Button variant="primary" size="lg">创建学习房间</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button">创建学习房间</Button>
                  </div>
                  <Col>
                  </Col>
                </Row>
              </p>
            </Container>
          </Jumbotron>
        </main>
        <Footer/>
      </div>
    );
  }
}

export default Main;