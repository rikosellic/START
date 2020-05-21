import React, {Component}from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import "./main.css";
import "./href.css";
import Logo from "../components/Logo";
import NavBar from "../components/Nav";
import Footer from "../components/Footer";
import PropTypes from 'prop-types';

class Main extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    }
    constructor(props) {
      super(props);
      this.onusernameChange = this.onusernameChange.bind(this);
      this.state = {
        username: ''
      }
    }
    onusernameChange(event) {
      this.setState({
        username: event.target.value,
      });
    }
    createstudyroom(username,password) {
        const createstudyroomValue = {"username": username,
            "password": password}
        const url = " http://localhost:8000/api/createstudyroom";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(createstudyroomValue),
            }).then(res=>{
                if(res.status === 200){
                    alert('Successful')
                    this.props.history.push('/studyRoom')
                }
                else{
                    alert(res)
                }

            })
        } catch (error) {
        }
    }
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
                    <Button variant="primary" size="lg">creat a room</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="primary" size="lg"><span class="white"><a href="/joinRoom">join a room</a></span></Button>
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