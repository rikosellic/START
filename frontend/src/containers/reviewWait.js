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
import "./reviewSummary.css";
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
    var messagearr=new Array();
    while(messagesplit.length!=4){
      var tmp=messagesplit.pop();
      messagearr.unshift(tmp);
    }
    messagearr=[...new Set(messagearr)];//这一步为数组去重操作；将后边重复出现的当前用户的username去掉
    //messagearr即为包含房间号和所有username的数组，
    //其中messagearr[0]为房间号，messagearr[1]为当前用户的username，messagearr[2]为房主的username,之后的即为其他成员的username
    super(props);
    this.state = {
      username:  messagearr[1],
      roomid: messagearr[0],
      //hostname: messagearr[2],
      }
  }
	startreview(roomid){
		const value = {"roomid": roomid,}
        const url = " http://localhost:8000/api/nextword";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
           }).then(this.props.history.push({pathname:'/reviewRoom/'+this.state.roomid+'/'+this.state.username}))
	}
	quitreviewroom(username,roomid){
		const value = {"roomid": roomid,
						"username": username,}
        const url = " http://localhost:8000/api/nextword";
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
              <h4>房间号：123</h4>
			  <Row>
			  <h4>房主：小明
				</h4>
				<h4>小红
				</h4>
			  	<h4>小华
				</h4>
			  </Row>
              <Row>
                 <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button" onClick={this.startreview.bind(this,roomid)}>开始复习</Button>
                 </div>
                 <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button" onClick={this.quitreviewroom.bind(this,username,roomid)}>退出</Button>
                 </div>
              </Row>
            </html>
    );
  }
}

export default reviewWait;
