import React, { Component } from 'react';
import {
    Jumbotron,
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';
import "./reviewRoom.css";
import NavBar2 from "../components/Nav2";
import PropTypes from 'prop-types';

class ReviewRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      second: 10,
      services:[],
      view:"type_a",
      roomid:487577,
      username:'',
      word:'',
    }
  }
    componentDidMount () {
        let remaining=10000;
        let timer = setInterval(() => {
        if (remaining >= 1000) {
            remaining -= 1000;
            let second = Math.floor(remaining/1000);
            this.setState({
                second:second < 10 ? "0" + second : second
            })
        }else{
            remaining += 10000;
            let second = Math.floor(remaining/1000);
            this.setState({
                second:second < 10 ? "0" + second : second
            })
        }
        }, 1000)
    }
    chanswer1(roomid,username) {
        const chanswer1Value = {"roomid": roomid,
        "username":username,"choice":1}
        const url = " http://localhost:8000/api/calculatescore";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(chanswer1Value),
            }).then(function(response) {
                return response.json();
            }).then(function(myJson){
            })
        } catch (error) {
        }
    }
    chanswer2(roomid,username) {
        const chanswer2Value = {"roomid": roomid,
            "username":username,"choice":2}
        const url = " http://localhost:8000/api/calculatescore";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(chanswer2Value),
            }).then(function(response) {
                return response.json();
            }).then(function(myJson){
            })
        } catch (error) {
        }
    }
    chanswer3(roomid,username) {
        const chanswer3Value = {"roomid": roomid,
            "username":username,"choice":3}
        const url = " http://localhost:8000/api/calculatescore";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(chanswer3Value),
            }).then(function(response) {
                return response.json();
            }).then(function(myJson){
            })
        } catch (error) {
        }
    }
    chanswer4(roomid,username) {
        const chanswer4Value = {"roomid": roomid,
            "username":username,"choice":4}
        const url = " http://localhost:8000/api/calculatescore";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(chanswer4Value),
            }).then(function(response) {
                return response.json();
            }).then(function(myJson){
            })
        } catch (error) {
        }
    }
    render() {
        const{roomid,username}=this.state
        const serviceShows = this.state.services.map((service,index)=>{
            if(service.type === this.state.view){
                return <div className="one-service" key={index}>{service}</div>
            }
        })
        function nextproblem(roomid) {
            const nextproblemValue = {"roomid": roomid}
            const url = " http://localhost:8000/api/nextproblem";
            try {
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-type":"application/json;charset=utf-8",
                    },
                    body: JSON.stringify(nextproblemValue),
                }).then(function(response) {
                    return response.json();
                }).then(function(myJson){
                    var str=JSON.parse(myJson)
                    document.getElementById("word").innerHTML = str.word ;
                    document.getElementById("answer1").innerHTML = str.answer1 ;
                    document.getElementById("answer2").innerHTML = str.answer2 ;
                    document.getElementById("answer3").innerHTML = str.answer3 ;
                    document.getElementById("answer4").innerHTML = str.answer4 ;
                })
            } catch (error) {
            }
        }
        if (this.state.second <= 0) {
            nextproblem(this.state.roomid)
        }
        return (
          <div>
            <NavBar2/>
            <div class="row">
              {serviceShows}
              <div class="review-score" style={{marginLeft: '24%'}}>tyb:0</div>
              <div class="review-score">zs:0</div>
              <div class="review-score">handsome:0</div>
              <div class="review-score">email:0</div>
            </div>
            <div class='review-time'>
              <span>time remaining: {this.state.second}s</span>
            </div>
            <div class="review-word" id="word">integrity</div>
            <div class="review-anwser">
              <Form.Group as={Row}>
                <Col sm={10}>
                <Button className="review-button" variant="outline-info" onClick={this.chanswer1.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer1">nmsl</h6>
                </Button><br/><br/>
                <Button className="review-button" variant="outline-info" onClick={this.chanswer2.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer2">nmsl</h6>
                </Button><br/><br/>
                <Button className="review-button" variant="outline-info" onClick={this.chanswer3.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer3">nmsl</h6>
                </Button><br/><br/>
                <Button className="review-button" variant="outline-info" onClick={this.chanswer4.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer4">nmsl</h6>
                </Button>
                </Col>
              </Form.Group>
            </div>
            <div class="review-speed">
              score:20/50 speed:21/50
            </div>
          </div>
    );
    }
}

export default ReviewRoom;