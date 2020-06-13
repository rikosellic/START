import React, { Component }from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
  DropdownButton,
} from 'react-bootstrap';
import "./reviewWait.css";
import "./href.css";
import Logo from "../components/Logo";
import NavBar2 from "../components/Nav2";
import Footer from "../components/Footer";
import PropTypes from 'prop-types';

class reviewWait extends React.Component {
	static propTypes = {
    username: PropTypes.string.isRequired,
    roomid: PropTypes.string.isRequired,
    }
	constructor(props) {
    var message=window.location.href;
    var messagesplit=message.split('/');

    //var messagearr=new Array();

    /*while(messagesplit.length!=4){
      var tmp=messagesplit.pop();
      messagearr.unshift(tmp);
    }*/
    //messagearr=[...new Set(messagearr)];//这一步为数组去重操作；将后边重复出现的当前用户的username去掉
    //messagearr即为包含房间号和所有username的数组，
    //其中messagearr[0]为房间号，messagearr[1]为当前用户的username，messagearr[2]为房主的username,之后的即为其他成员的username
    super(props);
    this.onstrChange = this.onstrChange.bind(this);
    this.state = {
      url:messagesplit[3],
      username:  messagesplit[4],
      roomid: messagesplit[5],
      services:[],
      view:"type_a",
      str:"",
      //hostname: messagearr[2],
      }
  }
    componentDidMount () {
		try{
			var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url2=" ws://localhost:8000/api/reviewroomchecktalkwebsocket";
			var socket2=new WebSocket(url2);
			socket2.onopen = function () {
			console.log("websocket for talk success");
			socket2.send(roomid.toString());
			}
			socket2.onclose=function(e){
              console.log(e);
              socket2.close(); //关闭TCP连接
            };
			socket2.onmessage = function(myJson){
                    var str=myJson.data
                    console.log(str)
                    var string=JSON.parse(str);
                    console.log(string)
                    if(document.getElementById("chat")){document.getElementById("chat").innerHTML=string.str;}
                }
			
		}
		catch
		{}
		try{
			var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url=" ws://localhost:8000/api/reviewwaitcheckuserwebsocket";
			var socket=new WebSocket(url);
			socket.onopen = function () {
				console.log("websocket for user success");
				socket.send(roomid.toString());
			}
			socket.onclose=function(e){
              console.log(e);
              socket.close(); //关闭TCP连接
            };
            //if (socket.readyState == WebSocket.OPEN) socket.onopen();	
			socket.onmessage = function(myJson){
                    var str=JSON.parse(myJson.data)
                    var len=str.usernum
                    var start=str.start
                    if(start==0){
                        if(that.state.username != str.user1){
                            if(document.getElementById("block")){document.getElementById("block").disabled=true;}
                        }
                        if(that.state.username == str.user1){
                            if(document.getElementById("block")){document.getElementById("block").disabled=false;}
                        }
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
                    }
                    if(start==1){
                        window.location="/reviewRoom/"+that.state.roomid+'/'+that.state.username
                    }else{}
                }
		}
		catch{}
		/*
        let timer = setInterval(() => {
            var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url1=" http://localhost:8000/api/reviewwaitcheckuser";
            const url2=" http://localhost:8000/api/reviewroomchecktalk";
            try {
                fetch(url1, {
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
                        if(that.state.username != str.user1){
                            if(document.getElementById("block")){document.getElementById("block").disabled=true;}
                        }
                        if(that.state.username == str.user1){
                            if(document.getElementById("block")){document.getElementById("block").disabled=false;}
                        }
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
                    }
                    if(start==1){
                        window.location="/reviewRoom/"+that.state.roomid+'/'+that.state.username
                        clearInterval(that.state.timer);
                    }else{}
                })
            }catch(error){
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
        },100)*/
    }
    onstrChange(event) {
        this.setState({
            str: event.target.value,
        });
    }
    setreviewproblem(roomid){
        const value = {"roomid": roomid,}
        const url = " http://localhost:8000/api/setreviewproblem";
        fetch(url, {
            method: "POST",
            headers: {
                "Content-type":"application/json;charset=utf-8",
            },
            body: JSON.stringify(value),
        }).then()
    }

	startreview(roomid){
		const value = {"roomid": roomid,}
        const url = " http://localhost:8000/api/startreview";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
           }).then(this.props.history.push({pathname:'/reviewRoom/'+this.state.roomid+'/'+this.state.username}))
	}

	quitreviewroom(username,roomid){
		const value = {"username": username,
            "roomid": roomid,}
        const url = " http://localhost:8000/api/quitreviewroom";
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
        const url = " http://localhost:8000/api/reviewroomspeak";
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
	const{roomid,username,str}=this.state;
    function sendout(roomid){
        const value = {"roomid": roomid,
            "username":username,
            "str":str}
        const url = " http://localhost:8000/api/reviewroomspeak";
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
		<div class="reviewWait">
            <html>
			  <NavBar2 myname={username}/>
              <DropdownButton title="chat" size="sm">
                <Form.Group>
                <Form.Control as="textarea" id="chat" rows="5" disabled/>
                </Form.Group>
                <Form.Group ><Form.Control type="text" id="string" onChange={this.onstrChange}/></Form.Group>
                <div class="chatButton">
                <Button id="chat_button" size="sm" onClick={this.sendout.bind(this,roomid,username,str)}>Send out</Button>
                </div>
              </DropdownButton>
              <div className='logo' ><Logo/></div>
              <h4>RoomID：{this.state.roomid}</h4>
			  <Row>
			    <h4 class="usern1" id="usern1">房主:</h4>
				<h4 class="usern2" id="usern2"></h4>
			  	<h4 class="usern3" id="usern3"></h4>
                <h4 class="usern4" id="usern4" ></h4>
			  </Row>
              <Row>
                   <Button variant="primary" size="lg" className="b1" id="block" onClick={this.startreview.bind(this,roomid)} onMouseEnter={this.setreviewproblem.bind(this,roomid)}>开始复习</Button>
                   <Button variant="primary" size="lg" className="b2" onClick={this.quitreviewroom.bind(this,username,roomid)}>退出</Button>
              </Row>
            </html>
		</div>
    );
  }
}

export default reviewWait;
