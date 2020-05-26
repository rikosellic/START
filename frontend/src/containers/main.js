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
import {withRouter} from "react-router-dom";

class Main extends React.Component {
  static propTypes = {
    username: PropTypes.string.isRequired,
    }
    constructor(props) {
      var message=window.location.href;
      super(props);
      this.onusernameChange = this.onusernameChange.bind(this);
      this.state = {
        username: message.slice(27)
      }
    }
    onusernameChange(event) {
        this.setState({
            username: this.props.params.username,
        });
    }

    createstudyroom(username) {
        const createstudyroomValue = {"username": username}
        var username=this.state.username
        const url = " http://localhost:8000/api/createstudyroom";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(createstudyroomValue),
            }).then(function(response) {
                return response.json();
            }).then(function(myJson){
                var roomid=JSON.parse(myJson);
                window.location='/studyWait/'+username+'/'+roomid
            })
        } catch (error) {
        }
    }
    createreviewroom(username) {
        const createreviewroomValue = {"username": username}
        var username = this.state.username
        const url = " http://localhost:8000/api/createreviewroom";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(createreviewroomValue),
            }).then(function(response) {
                return response.json();
            }).then(function(myJson){
                var roomid=JSON.parse(myJson)
                window.location='/reviewWait/'+username+'/'+roomid
            })
        } catch (error) {
        }
    }
    joinroom(username){
        this.props.history.push({pathname:'/joinRoom/'+this.state.username})
    }
  render() {
    const{username}=this.state
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
                    <Button variant="primary" size="lg" onClick={this.createreviewroom.bind(this, username)}>creat a reviewroom</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="primary" size="lg" onClick={this.createstudyroom.bind(this, username)}>creat a studyroom</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="primary" size="lg" onClick={this.joinroom.bind(this,username)}>join a room</Button>
                  </div>
                  <Col>
                  </Col>
                </Row>
              </p>
            </Container>
          </Jumbotron>
        </main>
        <Footer/>
        <h10 class="back" id="block"></h10>
        <h10 class="back" id="usern1"></h10>
        <h10 class="back" id="usern2"></h10>
        <h10 class="back" id="usern3"></h10>
        <h10 class="back" id="usern4"></h10>
      </div>
    );
  }
}

export default Main;