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

class JoinRoom extends React.Component {
    static propTypes = {
        roomid: PropTypes.string.isRequired,
    }
    constructor(props) {
        super(props);
        this.onroomidChange = this.onroomidChange.bind(this);
        this.state = {
            roomid: '',
            username:'',
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
        const registerValue = {"username": username,
            "roomid": roomid}
        const url = " http://localhost:8000/api/enterstudyroom";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(registerValue),
            }).then(res=>{
                if(res.status === 200){
                    alert('Successful')
                    this.props.history.push('/studyRoom')
                }
                else{
                    alert(res)
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