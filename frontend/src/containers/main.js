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
                It's the third day you joined START, you have studied 150 words
              </h4>
              <p className="search-box">
                <Row>
                  <Col></Col>
                  <Form inline>
                    <Form.Control type="text" placeholder="🔍Search" className="mr-sm-2" required/>
                    <Button variant="success" type="submit">search</Button>
                  </Form>
                  <Col></Col>
                </Row>
              </p>
              <p>
                <Row>
                  <Col>
                  </Col>
                  <div class="main-button">
                    <Button variant="primary" size="lg">start study</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button">start review</Button>
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