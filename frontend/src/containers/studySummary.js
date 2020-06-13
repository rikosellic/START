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
import "./studySummary.css";
import "./href.css";
import Logo from "../components/Logo";
import NavBar2 from "../components/Nav2";
import Footer from "../components/Footer";
import PropTypes from 'prop-types';

class studySummary extends React.Component {
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
      services:[],
      view:"type_a",
      //hostname: messagearr[2],
      }
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
           }).then(this.props.history.push({pathname:'/reviewWait/'+this.state.roomid+'/'+this.state.username}))
	}
	quit(username,roomid){
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
	  const{roomid,username}=this.state;
    return (
	<html>
	<NavBar2 myname={username}/>
      <div>
              <div className='login-logo' ><Logo/></div>
            <Button variant="primary" className="study-button1" id="but1" size="lg" onClick={this.startreview.bind(this,username,roomid)}> <span>复习</span></Button>
            <Button variant="primary" className="study-button2" id="but2" size="lg" onClick={this.quit.bind(this,username,roomid)} ><span>退出</span></Button>
      </div>
	</html>
    );
  }
}

export default studySummary ;