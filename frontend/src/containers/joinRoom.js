import React, {Component} from 'react';
import {
    Jumbotron,
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';
import "./joinRoom.css";
import Logo from "../components/Logo";
import "./href.css"
import NavBar from "../components/Nav";
import PropTypes from 'prop-types';
import {withRouter} from "react-router-dom";

class JoinRoom extends React.Component {
    static propTypes = {
        roomid: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
    }
    constructor(props) {
		var message=window.location.href;
        super(props);
        this.onroomidChange = this.onroomidChange.bind(this);
		this.onusernameChange = this.onusernameChange.bind(this);
        this.state = {
            roomid: '',
            username:message.slice(31),
        }
    }
    onusernameChange(event) {
        this.setState({
            username: this.props.location.state.username,
        });
    }
    onroomidChange(event) {
        this.setState({
            roomid: event.target.value,
        });
    }
	joinroom(username,roomid) {
        const joinroomValue = {"username": username,
            "roomid": roomid}
		var that = this;
		//var str = Object.create(null);
        const url = " http://localhost:8000/api/enterroom";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(joinroomValue),
            }).then(res=>{
                return res.json();
            }).then(function(myJson){
                var str = JSON.parse(myJson);
				var len = Object.getOwnPropertyNames(str).length;
				if(str.type == 0){
					switch(len) {
						case 4:
						that.props.history.push({pathname:'/studyWait/'+roomid+'/'+username+'/'+str.user1+'/'+str.user2});
						break;
						case 5:
						that.props.history.push({pathname:'/studyWait/'+roomid+'/'+username+'/'+str.user1+'/'+str.user2+'/'+str.user3});
						break;
						case 6:
						that.props.history.push({pathname:'/studyWait/'+roomid+'/'+username+'/'+str.user1+'/'+str.user2+'/'+str.user3+'/'+str.user4});
						break;
					} 
				}
				if(str.type == 1){
					switch(len) {
						case 4:
						that.props.history.push({pathname:'/reviewWait/'+roomid+'/'+username+'/'+str.user1+'/'+str.user2});
						break;
						case 5:
						that.props.history.push({pathname:'/reviewWait/'+roomid+'/'+username+'/'+str.user1+'/'+str.user2+'/'+str.user3});
						break;
						case 6:
						that.props.history.push({pathname:'/reviewWait/'+roomid+'/'+username+'/'+str.user1+'/'+str.user2+'/'+str.user3+'/'+str.user4});
						break;
					} 
				}
			})
        } catch (error) {
        }
    }
    render() {
        const{username,roomid}=this.state  
        return (
            <div>
                <NavBar/>
                <div className="join-div">
                <div className='join-logo'><Logo/></div>
                    <Form.Group as={Row}>
                        <Form.Label column sm="6">
                            Enter the room number
                        </Form.Label>
                        <Col sm="5">
                            <Form.Control type="text" onChange={this.onroomidChange}/>
                        </Col>
                    </Form.Group>
                    <br/><br/><br/>
                    <Row  style={{marginLeft: '15%'}}>
                        <div className="join-button">
                            <Button variant="outline-dark" block onClick={this.joinroom.bind(this, username, roomid)}>join the room</Button>
                        </div>
                        <div className="join-button">
                            <Button variant="outline-dark"><span class="black"><a href="/main">back to home</a></span></Button>
                        </div>
                    </Row>
                </div>
            </div>
        );
    }
}
    
export default JoinRoom;