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
import "./studyWait.css"
class studyWait extends React.Component {
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
      url:messagesplit[3],
      username:  messagesplit[4],
      roomid: messagesplit[5],
      services:[],
      view:"type_a",
      str:"",
      }
  }
    componentDidMount () {
        let timer = setInterval(() => {
            var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url=" http://localhost:8000/api/studywaitcheckuser";
            const url2=" http://localhost:8000/api/studyroomchecktalk";
            try {
                fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-type": "application/json;charset=utf-8",
                    },
                    body: JSON.stringify(reviewwaitcheckuserValue),
                }).then(function (response) {
                    if(response.status==200) {
                        return response.json();
                    }else{
                        return '{"start":2}'
                    }
                }).then(function(myJson){
                    var str=JSON.parse(myJson)
                    var len=str.usernum
                    var start=str.start
                    if(start==0){
                        switch(len){
                            case 1:
                                if(document.getElementById("usern1")){document.getElementById("usern1").innerHTML="房主："+str.user1}
                                if(document.getElementById("usern2")){document.getElementById("usern2").innerHTML=""}
                                if(document.getElementById("usern3")){document.getElementById("usern3").innerHTML=""}
                                if(document.getElementById("usern4")){document.getElementById("usern4").innerHTML=""}
                                break;
                            case 2:
                                if(document.getElementById("usern1")){document.getElementById("usern1").innerHTML="房主："+str.user1}
                                if(document.getElementById("usern2")){document.getElementById("usern2").innerHTML=str.user2}
                                if(document.getElementById("usern3")){document.getElementById("usern3").innerHTML=""}
                                if(document.getElementById("usern4")){document.getElementById("usern4").innerHTML=""}
                                break;
                            case 3:
                                if(document.getElementById("usern1")){document.getElementById("usern1").innerHTML="房主："+str.user1}
                                if(document.getElementById("usern2")){document.getElementById("usern2").innerHTML=str.user2}
                                if(document.getElementById("usern3")){document.getElementById("usern3").innerHTML=str.user3}
                                if(document.getElementById("usern4")){document.getElementById("usern4").innerHTML=""}
                                break;
                            case 4:
                                if(document.getElementById("usern1")){document.getElementById("usern1").innerHTML="房主："+str.user1}
                                if(document.getElementById("usern2")){document.getElementById("usern2").innerHTML=str.user2}
                                if(document.getElementById("usern3")){document.getElementById("usern3").innerHTML=str.user3}
                                if(document.getElementById("usern4")){document.getElementById("usern4").innerHTML=str.user4}
                                break;
                        }
                    }else{}
                })
            }catch(error){
            }try {
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
        },100)
    }
    onstrChange(event) {
        this.setState({
            str: event.target.value,
        });
    }
	startstudy(roomid){
		const value = {"roomid": roomid,}
        const url = " http://localhost:8000/api/startstudy";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
           }).then(this.props.history.push({pathname:'/studyRoom/'+this.state.roomid+'/'+this.state.username}))
	}
    studysetwordlist(roomid){
        const value = {"roomid": roomid,}
        const url = " http://localhost:8000/api/studysetwordlist";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type":"application/json;charset=utf-8",
            },
            body: JSON.stringify(value),
        }).then()
    }

    quitstudyroom(username,roomid){
        const value = {"username": username,
            "roomid": roomid,}
        const url = " http://localhost:8000/api/quitstudyroom";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type":"application/json;charset=utf-8",
            },
            body: JSON.stringify(value),
        }).then(this.props.history.push({pathname:'/main/'+this.state.username}))
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
    return (
	<div class="studyWait">
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
			<div class="logo"> <Logo/></div>
              <h4>房间号：{this.state.roomid}</h4>
			  <Row>
			    <h4 class="usern1" id="usern1">房主:</h4>
				<h4 class="usern2" id="usern2"></h4>
			  	<h4 class="usern3" id="usern3"></h4>
                <h4 class="usern4" id="usern4"></h4>
			  </Row>
              <Row>
                  <Button variant="primary" size="lg" id="b1" className="b1" onClick={this.startstudy.bind(this,roomid)} onMouseEnter={this.studysetwordlist.bind(this,roomid)}>开始学习</Button>
                  <Button variant="primary" size="lg" id="b2" className="b2" onClick={this.quitstudyroom.bind(this,roomid,username)}>退出</Button>
              </Row>
            </html>
			</div>
    );
  }
}

export default studyWait;