import React, { Component } from 'react';
import Logo from "../components/Logo";
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
    var message=window.location.href;
    var messagesplit=message.split('/');
    this.state = {
      second: 5,
      services:[],
      view:"type_a",
      roomid:messagesplit[4],
      username:messagesplit[5],
      word:'',
      score:0,
      speed:0,
    }
  }
  componentDidMount () {
        let remaining=5000;
        let speed=this.state.speed;
        let timer = setInterval(() => {
        if(remaining==0){
                remaining += 10000;
                let second = Math.floor(remaining/1000);
                speed=speed+1;
                this.setState({
                    second:second < 10 ? "0" + second : second,
                    speed:speed
                })
            }
        else{
            remaining -= 1000;
            let second = Math.floor(remaining/1000);
            this.setState({
                second:second < 10 ? "0" + second : second,
            })
        }
        const getscoreValue = {"roomid":this.state.roomid}
        const url = " http://localhost:8000/api/returnreviewscore";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(getscoreValue),
            }).then(function(response) {
               return response.json();
            }).then(function(myJson){
                var str=JSON.parse(myJson)
                var len=str.usernum
                switch(len){
                    case 1:
                        document.getElementById("user1").innerHTML = str.user1name+": "+str.user1score;
                        document.getElementById("user2").innerHTML = "";
                        document.getElementById("user3").innerHTML = "";
                        document.getElementById("user4").innerHTML = "";
                    break;
                    case 2:
                        document.getElementById("user1").innerHTML = str.user1name+": "+str.user1score;
                        document.getElementById("user2").innerHTML = str.user2name+": "+str.user2score;
                        document.getElementById("user3").innerHTML = "";
                        document.getElementById("user4").innerHTML = "";
                    break;
                    case 3:
                        document.getElementById("user1").innerHTML = str.user1name+": "+str.user1score;
                        document.getElementById("user2").innerHTML = str.user2name+": "+str.user2score;
                        document.getElementById("user3").innerHTML = str.user3name+": "+str.user3score;
                        document.getElementById("user4").innerHTML = "";
                    break;
                    case 4:
                        document.getElementById("user1").innerHTML = str.user1name+": "+str.user1score;
                        document.getElementById("user2").innerHTML = str.user2name+": "+str.user2score;
                        document.getElementById("user3").innerHTML = str.user3name+": "+str.user3score;
                        document.getElementById("user4").innerHTML = str.user4name+": "+str.user4score;
                    break;
                }
                })
            } catch (error) {
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
                var str=JSON.parse(myJson)
                var score=str.score
                var correct=str.correct
                document.getElementById("block1").disabled=true;
                document.getElementById("block2").disabled=true;
                document.getElementById("block3").disabled=true;
                document.getElementById("block4").disabled=true;
                document.getElementById("score").innerHTML = "score: "+score+"/10"
                if(correct==1) {
                    document.getElementById("answer" + correct).style.color = "green"
                }else{
                    document.getElementById("answer1").style.color = "red"
                    document.getElementById("answer" + correct).style.color = "green"
                }
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
                var str=JSON.parse(myJson)
                var score=str.score
                var correct=str.correct
                document.getElementById("block1").disabled=true;
                document.getElementById("block2").disabled=true;
                document.getElementById("block3").disabled=true;
                document.getElementById("block4").disabled=true;
                document.getElementById("score").innerHTML = "score: "+str+"/10"
                if(correct==2) {
                    document.getElementById("answer" + correct).style.color = "green"
                }else{
                    document.getElementById("answer2").style.color = "red"
                    document.getElementById("answer" + correct).style.color = "green"
                }
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
                var str=JSON.parse(myJson)
                var score=str.score
                var correct=str.correct
                document.getElementById("block1").disabled=true;
                document.getElementById("block2").disabled=true;
                document.getElementById("block3").disabled=true;
                document.getElementById("block4").disabled=true;
                document.getElementById("score").innerHTML = "score: "+str+"/10"
                if(correct==3) {
                    document.getElementById("answer" + correct).style.color = "green"
                }else{
                    document.getElementById("answer3").style.color = "red"
                    document.getElementById("answer" + correct).style.color = "green"
                }
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
                var str=JSON.parse(myJson)
                var score=str.score
                var correct=str.correct
                document.getElementById("block1").disabled=true;
                document.getElementById("block2").disabled=true;
                document.getElementById("block3").disabled=true;
                document.getElementById("block4").disabled=true;
                document.getElementById("score").innerHTML = "score: "+str+"/10"
                if(correct==4) {
                    document.getElementById("answer" + correct).style.color = "green"
                }else{
                    document.getElementById("answer4").style.color = "red"
                    document.getElementById("answer" + correct).style.color = "green"
                }
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
            const nextproblemValue = {"roomid": roomid,
            "username":username};
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
                    console.log(response.json())
                }).then(function(myJson){
                    var str=JSON.parse(myJson);
                    var statu=str.status
                    if(statu==200) {
                        document.getElementById("word").innerHTML = str.word;
                        document.getElementById("answer1").innerHTML = str.answer1;
                        document.getElementById("answer2").innerHTML = str.answer2;
                        document.getElementById("answer3").innerHTML = str.answer3;
                        document.getElementById("answer4").innerHTML = str.answer4;
                        document.getElementById("answer1").style.color = "black"
                        document.getElementById("answer2").style.color = "black"
                        document.getElementById("answer3").style.color = "black"
                        document.getElementById("answer4").style.color = "black"
                        document.getElementById("block1").disabled = false;
                        document.getElementById("block2").disabled = false;
                        document.getElementById("block3").disabled = false;
                        document.getElementById("block4").disabled = false;
                    }
                    if(statu==202){
                        var len=str.usernum;
                        switch(len){
                            case 1:
                                window.location='/reviewSummary/'+str.usernum+'/'+str.user1name+"/"+str.user1score
                            break;
                            case 2:
                                window.location='/reviewSummary/'+str.usernum+'/'+str.user1name+"/"+str.user1score+"/"+str.user2name+"/"+str.user2score
                            break;
                            case 3:
                                window.location='/reviewSummary/'+str.usernum+'/'+str.user1name+"/"+str.user1score+"/"+str.user2name+"/"+str.user2score+"/"+str.user3name+"/"+str.user3score
                            break;
                            case 4:
                                window.location='/reviewSummary/'+str.usernum+'/'+str.user1name+"/"+str.user1score+"/"+str.user2name+"/"+str.user2score+"/"+str.user3name+"/"+str.user3score+"/"+str.user4name+"/"+str.user4score
                            break;
                        }
                    }
                })
            } catch (error) {
            }
        }
        if (this.state.second <= 0) {
            nextproblem(this.state.roomid)
        }
        return (
          <div class="reviewroom">
            <NavBar2/><br/>
            <Row>
              {serviceShows}
              <div class="review-score" style={{marginLeft: '24%'}} id="user1"></div>
              <div class="review-score" id="user2"></div>
              <div class="review-score" id="user3"></div>
              <div class="review-score" id="user4"></div>
            </Row>
            <div class='review-time'>
              <span>time remaining: {this.state.second}s</span>
            </div>
            <div class="review-word" id="word">The word will be shown here</div>
            <div class="review-anwser">
              <Form.Group as={Row}>
                <Col sm={10}>
                <Button className="review-button" id="block1" type="submit" onClick={this.chanswer1.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer1">Answer1 will be shown here</h6>
                </Button><br/><br/>
                <Button className="review-button" id="block2" type="submit" onClick={this.chanswer2.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer2">Answer2 will be shown here</h6>
                </Button><br/><br/>
                <Button className="review-button" id="block3" type="submit" onClick={this.chanswer3.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer3">Answer3 will be shown here</h6>
                </Button><br/><br/>
                <Button className="review-button" id="block4" type="submit" onClick={this.chanswer4.bind(this,roomid,username)}>
                  <h6 className="review-choice" id="answer4">Answer4 will be shown here</h6>
                </Button>
                </Col>
              </Form.Group>
            </div>
            <Row>
              <div class="review-perscore" id="score">score: 0/10</div>
              <div class="review-speed" >speed: {this.state.speed}/50</div>
            </Row>
          </div>
    );
    }
}

export default ReviewRoom;