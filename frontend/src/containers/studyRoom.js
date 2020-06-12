import React from 'react';
import {
    Jumbotron,
    Container,
    Row,
    Col,
    Form,
    Button,
    DropdownButton,
} from 'react-bootstrap';
import "./href.css";
import Logo from "../components/Logo";
import NavBar2 from "../components/Nav2";
import Footer from "../components/Footer";
import PropTypes from 'prop-types';
import "./studyRoom.css"
class studyRoom extends React.Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
        roomid: PropTypes.string.isRequired,
    }
    constructor(props) {
        var message=window.location.href;
        var messagesplit=message.split('/');
        super(props);
        this.onstrChange = this.onstrChange.bind(this);
        this.state = {
            url: messagesplit[3],
            username: messagesplit[5],
            roomid: messagesplit[4],
            str:"",
        }
    }

    componentDidMount () {
        let timer = setInterval(() => {
            var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url=" http://localhost:8000/api/returnstudyprocess";
            const url2=" http://localhost:8000/api/studyroomchecktalk";
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
                try {
                    fetch(url2, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(reviewwaitcheckuserValue),
                    }).then(function(response) {
                        if(response.status==200)
                        {return response.json();}
                        else{return '{"str":"failed"}'}
                    }).then(function(myJson){
                        var str=myJson
                        console.log(str)
                        var string=JSON.parse(str);
                        console.log(string)
                        if(document.getElementById("chat")){document.getElementById("chat").innerHTML=string.str;}
                    })
                }catch(error){
                }
            }
        },100)
    }
    onstrChange(event) {
        this.setState({
            str: event.target.value,
        });
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
        }).then(text=>{try{document.getElementById("word").innerHTML = JSON.parse(text).Word;
		document.getElementById("mean").innerHTML = JSON.parse(text).meaning;
		if (JSON.parse(text).lx !=null){document.getElementById("lx").innerHTML = JSON.parse(text).lx;}
		else {document.getElementById("lx").innerHTML = "暂无例句"};} 
		catch(error){}})
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
        }).then(text=>{console.log(text)
			try{document.getElementById("word").innerHTML = JSON.parse(text).Word;
		document.getElementById("mean").innerHTML = JSON.parse(text).meaning;
		if (JSON.parse(text).lx !=null){document.getElementById("lx").innerHTML = JSON.parse(text).lx;
		console.log(JSON.parse(text).lx)}
		else {document.getElementById("lx").innerHTML = "暂无例句"}} catch(error){}})
    }
    sendout(roomid,username,str){
        const value = {"roomid": roomid,
            "username":username,
            "str":str}
        const url = " http://localhost:8000/api/studyroomspeak";
        if (str==""){}
        else{
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
            }).then()}
        document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight
        document.getElementById('string').value=""
    }
    render() {
        const{roomid,username,str}=this.state
        function sendout(roomid){
            const value = {"roomid": roomid,
                "username":username,
                "str":str}
            const url = " http://localhost:8000/api/studyroomspeak";
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
            }).then()
        }
        onkeyup = (e)=>{
            if (e.keyCode === 13) {
                if(this.state.str==""){}
                else{
                    sendout(this.state.roomid,this.state.username,this.state.str)
                    if(document.getElementById('chat')) {document.getElementById('chat').scrollTop = document.getElementById('chat').scrollHeight}}
                if(document.getElementById('string')){document.getElementById('string').value = ""}
            }
        }
        return (<div class="studyRoom">
		
            <html>
			<NavBar2/>
            <DropdownButton title="chat" size="sm">
                <Form.Group>
                    <Form.Control as="textarea" id="chat" rows="5" disabled/>
                </Form.Group>
                <Form.Group ><Form.Control type="text" id="string" onChange={this.onstrChange}/></Form.Group>
                <div class="chatButton">
                    <Button id="chat_button" size="sm" onClick={this.sendout.bind(this,roomid,username,str)}>Send out</Button>
                </div>
            </DropdownButton>
			<div>
            <h1 className="study-word" id="word"></h1>
            <h4 className="study-mean" id="mean"></h4>
            <h5 className="study-lx" id="lx"></h5>
            <Button variant="primary" className="study-button1" id="but1" size="lg" onClick={this.lastWord.bind(this,roomid,username) }><span>last</span></Button>
            <Button variant="primary" className="study-button2" id="but2" size="lg" onClick={this.nextWord.bind(this,roomid,username)} ><span>next</span></Button>
            <Row>
            <h4 class="study-speed1" id="speed1"></h4>
            <h4 class="study-speed2" id="speed2"></h4>
            <h4 class="study-speed3" id="speed3"></h4>
            <h4 class="study-speed4" id="speed4"></h4>
            </Row>
			</div>
            </html>
		</div>
    );
    }
}
export default studyRoom;