import React from 'react';
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

class ReviewSummary extends React.Component {
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
    endreview(username){
        this.props.history.push({pathname:'/main/'+this.state.username})
    }
    render() {
        const {roomid,username}=this.state;
        function nextproblem(roomid,username) {
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
                }).then(function(myJson){
                    var str=JSON.parse(myJson);
                    var len=str.usernum;
                    switch(len){
                        case 1:
                            document.getElementById("user1").innerHTML = str.user1name+': '+str.user1score;
                            document.getElementById("user2").innerHTML = "";
                            document.getElementById("user3").innerHTML = "";
                            document.getElementById("user4").innerHTML = "";
                            break;
                        case 2:
                            document.getElementById("user1").innerHTML = str.user1name+': '+str.user1score;
                            document.getElementById("user2").innerHTML = str.user2name+': '+str.user2score;
                            document.getElementById("user3").innerHTML = "";
                            document.getElementById("user4").innerHTML = "";
                            break;
                        case 3:
                            document.getElementById("user1").innerHTML = str.user1name+': '+str.user1score;
                            document.getElementById("user2").innerHTML = str.user2name+': '+str.user2score;
                            document.getElementById("user3").innerHTML = str.user3name+': '+str.user3score;
                            document.getElementById("user4").innerHTML = "";
                            break;
                        case 4:
                            document.getElementById("user1").innerHTML = str.user1name+': '+str.user1score;
                            document.getElementById("user2").innerHTML = str.user2name+': '+str.user2score;
                            document.getElementById("user3").innerHTML = str.user3name+': '+str.user3score;
                            document.getElementById("user4").innerHTML = str.user4name+': '+str.user4score;
                            break;
                    }
                    if(username==str.user1name){document.getElementById("personal").innerHTML = "你麻痹的是第一名，开心了吧"}
                    if(username==str.user2name){document.getElementById("personal").innerHTML = "第一都得不到，蔡狗！"}
                    if(username==str.user3name){document.getElementById("personal").innerHTML = "第三你很骄傲吗？乐色。"}
                    if(username==str.user4name){document.getElementById("personal").innerHTML = "这么废物配用我们的软件？"}
                })
            } catch (error) {
            }
        }

        return (
            <div>
                <NavBar2 myname={username}/>
                <div className='reviewsummary-div'>
                    <div className='reviewsummary-logo'><Logo/></div>
                    <h4>It's the fourth day you joined START!<br/>You have studied 50 words today</h4>
                    <br/><h5 id="personal">你是第4名!</h5><br/>
                    <div className="reviewsummary-score">
                        <br/>
                        <h5 id="user1">1</h5>
                        <h5 id="user2">2</h5>
                        <h5 id="user3">3</h5>
                        <h5 id="user4">4</h5>
                        <br/>
                    </div>
                    {nextproblem(this.state.roomid,this.state.username)}
                    <div className="reviewsummary-button">
                        <Button variant="primary" size="lg" onClick={this.endreview.bind(this,username)}>End review</Button>
                    </div>
                </div>
            </div>
    );
    }
}

export default ReviewSummary;