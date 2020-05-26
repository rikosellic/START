import React from 'react';
import NavBar from "../components/Nav";
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import "./href.css";
import Logo from "../components/Logo";
import NavBar2 from "../components/Nav2";
import Footer from "../components/Footer";
import PropTypes from 'prop-types';

class studyWait extends React.Component {
	static propTypes = {
    username: PropTypes.string.isRequired,
    roomid: PropTypes.string.isRequired,
    }
	constructor(props) {
    var message=window.location.href;
    var messagesplit=message.split('/');
    super(props);
    this.state = {
      url:messagesplit[3],
      username:  messagesplit[4],
      roomid: messagesplit[5],
      services:[],
      view:"type_a",
      }
  }
    componentDidMount () {
        let timer = setInterval(() => {
            var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url=" http://localhost:8000/api/studywaitcheckuser";
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
                                document.getElementById("usern1").innerHTML="房主："+str.user1
                                document.getElementById("usern2").innerHTML=""
                                document.getElementById("usern3").innerHTML=""
                                document.getElementById("usern4").innerHTML=""
                                break;
                            case 2:
                                document.getElementById("usern1").innerHTML="房主："+str.user1
                                document.getElementById("usern2").innerHTML=str.user2
                                document.getElementById("usern3").innerHTML=""
                                document.getElementById("usern4").innerHTML=""
                                break;
                            case 3:
                                document.getElementById("usern1").innerHTML="房主："+str.user1
                                document.getElementById("usern2").innerHTML=str.user2
                                document.getElementById("usern3").innerHTML=str.user3
                                document.getElementById("usern4").innerHTML=""
                                break;
                            case 4:
                                document.getElementById("usern1").innerHTML="房主："+str.user1
                                document.getElementById("usern2").innerHTML=str.user2
                                document.getElementById("usern3").innerHTML=str.user3
                                document.getElementById("usern4").innerHTML=str.user4
                                break;
                        }
                    }else{}
                })
            }catch(error){
            }
        },1000)
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

    render() {
	const{roomid,username}=this.state
    return (
            <html>
              <div className='login-logo' ><Logo/></div>
              <h4>房间号：{this.state.roomid}</h4>
			  <Row>
			    <h4 id="usern1">房主:</h4>
				<h4 id="usern2"></h4>
			  	<h4 id="usern3"></h4>
                <h4 id="usern4"></h4>
			  </Row>
              <Row>
                 <div class="main-button">
                    <Button variant="primary" size="lg" onClick={this.startstudy.bind(this,roomid)} onMouseEnter={this.studysetwordlist.bind(this,roomid)}>开始学习</Button>
                 </div>
                 <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button" onClick={this.quitstudyroom.bind(this,roomid)}>退出</Button>
                 </div>
              </Row>
            </html>
    );
  }
}

export default studyWait;