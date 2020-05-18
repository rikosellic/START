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
        roomnumber: PropTypes.string.isRequired,
    }
    constructor(props) {
        super(props);
        this.onroomnumberChange = this.onroomnumberChange.bind(this);
        this.state = {
            roomnumber: '',
        }
    }
    onroomnumberChange(event) {
        this.setState({
            roomnumber: event.target.value,
        });
    }
    render() {
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
                            <Form.Control type="text"/>
                        </Col>
                    </Form.Group>
                    <br/><br/><br/>
                    <Row  style={{marginLeft: '15%'}}>
                        <div className="join-button">
                            <Button variant="outline-dark">join the room</Button>
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