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
		word: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
    }
    constructor(props) {
      var message=window.location.href;
      super(props);
      this.onusernameChange = this.onusernameChange.bind(this);
	  this.onwordChange = this.onwordChange.bind(this);
      this.state = {
		word: '',
        username: message.slice(27),
      }
    }
    onusernameChange(event) {
        this.setState({
            username: this.props.location.state.username,
        });
    }
	onwordChange(event) {
        this.setState({
            word: event.target.value,
        });
	}
    createstudyroom(username) {
        const createstudyroomValue = {"username": username}
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
	searchword(word){
		var that = this;
		const searchwordValue = {"word": word}
        const url = " http://localhost:8000/api/searchword";
		if(that.state.word !== ''){
			try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(searchwordValue),
            }).then(function(response) {
				return response.json()
            }).then(function(myJson){
				var cont = JSON.parse(myJson);
                that.props.history.push({pathname:'/searchWord/'+that.state.username},
				{res1: cont},{res2:that.state.word},{res3:that.state.username});
            })
        } catch (error) {
        }
		}  
	}
    joinroom(username){
        this.props.history.push({pathname:'/joinRoom/'+this.state.username})
    }
  render() {
    const{username,word}=this.state
    return (
      <div class="main">
        <NavBar/>
            <Container>
              <br/><Logo/><br/>
              <div class="word">
                It's the third day you joined START, you have studied 150 words
              </div>
              <p className="search-box">
                <Row>
                  <Col></Col>
                  <Form inline>
					<Form.Control style={{display:"none"}}/>
                    <Form.Control type="text" onChange={this.onwordChange}/>
                    <Button variant="danger" onClick={this.searchword.bind(this,word)}>Search</Button>
                  </Form>
                  <Col></Col>
                </Row>
              </p>
              <p>
                <Row>
                  <Col>
                  </Col>
                  <div class="main-button">
                    <Button variant="outline-light" onClick={this.createreviewroom.bind(this, username)}>Create reviewroom</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="outline-light" onClick={this.createstudyroom.bind(this, username)}>Create studyroom</Button>
                  </div>
                  <div class="main-button">
                    <Button variant="outline-light" onClick={this.joinroom.bind(this,username)}>Join room</Button>
                  </div>
                  <Col>
                  </Col>
                </Row>
              </p>
            </Container>
      </div>
    );
  }
}

export default Main;