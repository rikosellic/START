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
    super(props);
    this.state = {
      username: '',
      roomid: '',
    }
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
			   alert('Successful')
			   this.props.history.push('/studyRoom')
           })
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
			   alert('Successful')
			   this.props.history.push('/studyRoom')
           })
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
    <div class="study-speed" >speed:</div>
	<div class="study-speed" id="speed">22</div>
	<div class="study-speed" >/50</div>
	<div class="study-speed" >speed:</div>
	<div class="study-speed" id="speed">22</div>
	<div class="study-speed" >/50</div>
	<div class="study-speed" >speed:</div>
	<div class="study-speed" id="speed">22</div>
	<div class="study-speed" >/50</div>
	<div class="study-speed" >speed:</div>
	<div class="study-speed" id="speed">22</div>
	<div class="study-speed" >/50</div>
	</Row>
	</html>
		);
    }
}
export default study;