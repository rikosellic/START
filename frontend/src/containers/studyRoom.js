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
import PropTypes from 'prop-types';

class study extends React.Component {

    static propTypes = {
        username: PropTypes.string.isRequired,
        roomid: PropTypes.string.isRequired,
    }
    constructor(props) {
        var message=window.location.href;
        var messagesplit=message.split('/');
        super(props);
        this.state = {
            url: messagesplit[3],
            username: messagesplit[5],
            roomid: messagesplit[4],
        }
    }

    componentDidMount () {
        let timer = setInterval(() => {
            var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url=" http://localhost:8000/api/returnstudyprocess";
            if(this.state.url=="studyRoom") {
                try {
                    fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(reviewwaitcheckuserValue),
                    }).then(function (response) {
                        return response.json();
                    }).then(function (myJson) {
                        var str = JSON.parse(myJson)
                        var len = str.usernum
                        switch (len) {
                            case 1:
                                document.getElementById("speed1").innerHTML = str.user1name + ": " + str.user1process + "/50"
                                document.getElementById("speed2").innerHTML = ""
                                document.getElementById("speed3").innerHTML = ""
                                document.getElementById("speed4").innerHTML = ""
                                break;
                            case 2:
                                document.getElementById("speed1").innerHTML = str.user1name + ": " + str.user1process + "/50"
                                document.getElementById("speed2").innerHTML = str.user2name + ": " + str.user2process + "/50"
                                document.getElementById("speed3").innerHTML = ""
                                document.getElementById("speed4").innerHTML = ""
                                break;
                            case 3:
                                document.getElementById("speed1").innerHTML = str.user1name + ": " + str.user1process + "/50"
                                document.getElementById("speed2").innerHTML = str.user2name + ": " + str.user2process + "/50"
                                document.getElementById("speed3").innerHTML = str.user3name + ": " + str.user3process + "/50"
                                document.getElementById("speed4").innerHTML = ""
                                break;
                            case 4:
                                document.getElementById("usern1").innerHTML = str.user1name + ": " + str.user1process + "/50"
                                document.getElementById("usern2").innerHTML = str.user2name + ": " + str.user2process + "/50"
                                document.getElementById("usern3").innerHTML = str.user3name + ": " + str.user3process + "/50"
                                document.getElementById("usern4").innerHTML = str.user4name + ": " + str.user4process + "/50"
                                break;
                        }
                    })
                } catch (error) {
                }
            }
        },100)
    }

    nextWord(roomid,username)
    {
        const value = {"roomid": roomid,
            "username": username,}
        const url = " http://localhost:8000/api/nextword";

        fetch(url, {
            method: "POST",
            headers: {
                "Content-type":"application/json;charset=utf-8",
            },
            body: JSON.stringify(value),
        }).then(res=>{
            if(res.status === 200){
                return res.json();}
            else{if(res.status === 501){
                this.props.history.push({pathname:'/studySummary'});
                alert("跳转至复习页面")}
            }
        }).then(text=>{try{document.getElementById("word").innerHTML = text;} catch(error){}})
    }

    lastWord(roomid,username)
    {
        const value = {"roomid": roomid,
            "username": username,}
        const url = " http://localhost:8000/api/lastword";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type":"application/json;charset=utf-8",
            },
            body: JSON.stringify(value),
        }).then(res=>{
            if(res.status === 200){
                return res.json();}
            else{alert("已经是第一题");
            }
        }).then(text=>{document.getElementById("word").innerHTML = text;})
    }
    render() {
        const{roomid,username}=this.state
        return (
            <html>
            <div className='login-logo' ><Logo/></div>
            <h4 className="study-word" variant="outline-info"> </h4>
            <h4 className="study-word" variant="outline-info">单词： </h4>
            <h4 className="study-word" variant="outline-info" id="word">pear</h4>
            <h4 className="study-word" variant="outline-info">释义： </h4>
            <h4 className="study-word" variant="outline-info" id="mean">梨子</h4>
            <Button variant="primary" size="lg" onClick={this.lastWord.bind(this,roomid,username)}>上一个单词</Button>
            <Button variant="primary" size="lg" onClick={this.nextWord.bind(this,roomid,username)}>下一个单词</Button>
            <Row>
            <div class="study-speed" id="speed1">22</div>
            <div class="study-speed" id="speed2">22</div>
            <div class="study-speed" id="speed3">22</div>
            <div class="study-speed" id="speed4">22</div>
            </Row>
            </html>
    );
    }
}
export default study;