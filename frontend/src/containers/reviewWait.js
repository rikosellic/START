import React, { Component }from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
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
    this.state = {
      url:messagesplit[3],
      username:  messagesplit[4],
      roomid: messagesplit[5],
      services:[],
      view:"type_a",
      //hostname: messagearr[2],
      }
  }
    componentDidMount () {
        let timer = setInterval(() => {
            var that=this;
            const roomid=this.state.roomid;
            const reviewwaitcheckuserValue={"roomid":roomid};
            const url=" http://localhost:8000/api/reviewwaitcheckuser";
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
                        if(that.state.username != str.user1){
                            document.getElementById("block").disabled=true;
                        }
                        if(that.state.username == str.user1){
                            document.getElementById("block").disabled=false;
                        }
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
                    }
                    if(start==1){
                        window.location="/reviewRoom/"+that.state.roomid+'/'+that.state.username
                        clearInterval(that.state.timer);
                    }else{}
                })
            }catch(error){
            }
        },100)
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
    render() {
	const{roomid,username}=this.state
    return (
		<div class="reviewWait">
            <html>
			  <NavBar2/>
              <div className='logo' ><Logo/></div>
              <h4>房间号：{this.state.roomid}</h4>
			  <Row>
			    <h4 class="usern1" id="usern1">房主:</h4>
				<h4 class="usern2" id="usern2"></h4>
			  	<h4 class="usern3" id="usern3"></h4>
                <h4 class="usern4" id="usern4"></h4>
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
