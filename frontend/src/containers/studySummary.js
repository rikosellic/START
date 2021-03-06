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
      roomid: messagesplit[5] ,
      services:[],
      view:"type_a",
      //hostname: messagearr[2],
      }
  }
  	startreview(roomid,username){
		const value = {"roomid": roomid,
        "username":username,}
        var that=this
        const url = " http://localhost:8000/api/studyroomtoreviewroom";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
           }).then(function(response){
               if(response.status==200)
               { return response.json();}
               else{
                   return '{"newid":"failed"}'
               }
        }).then(function(myJson){
            var str=JSON.parse(myJson);
            var id=str.newid
            window.location='/reviewWait/'+that.state.username+'/'+id
        })
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
        <div className='studysummary-logo' ><Logo/></div>
          <div class="studysu-button1">
            <Button variant="outline-dark" id="bot1"size="lg" onClick={this.startreview.bind(this,roomid,username)}>Review Together</Button>
          </div>
          <div class="studysu-button2">
            <Button variant="outline-dark" id="bot2" size="lg" onClick={this.quit.bind(this,username,roomid)} >Quit the Room</Button>
          </div>
      </div>
	</html>
    );
  }
}

export default studySummary ;