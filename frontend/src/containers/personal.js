import React from 'react';
import {
    Jumbotron,
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';
import "./personal.css";
import "./href.css"
import NavBar from "../components/Nav";
import PropTypes from 'prop-types';

class Personal extends React.Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
    }
    constructor(props) {
        var message=window.location.href;
        var messagesplit=message.split('/');
        super(props);
        this.state = {
            username:  messagesplit[4],
            clearInterval: false
        }
    }
    componentDidMount () {
        let remaining=1000;
        let timer = setInterval(() => {
            const username=this.state.username
            const Value={"username":username};
            const url=" http://localhost:8000/api/getstudyrecord";
            if (remaining<=0){
                clearInterval(timer);
            }
            else{
                remaining-=1000;
                try {
                    fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json;charset=utf-8",
                        },
                        body: JSON.stringify(Value),
                    }).then(function(response) {
                        console.log(response)
                        if(response.status==200)
                        {return response.json();}
                        else{return '{"username":"failed"}'}
                    }).then(function(myJson){
                        var str=JSON.parse(myJson);
                        if(document.getElementById("email")){document.getElementById("email").innerHTML="email: "+str.email;}
                        if(document.getElementById("username")){document.getElementById("username").innerHTML=str.username;}
                        if(document.getElementById("history")){document.getElementById("history").innerHTML=str.history;}
                        if(document.getElementById("userID")){document.getElementById("userID").innerHTML="userID: "+str.userID;}
                     })
                }catch(error){
                }
            }
        },1000)
    }
    render() {
        const{username}=this.state;
        return (
          <div>
            <NavBar myname={username}/>
            <div id="username" class="personal-title">
            username
            </div>
            <div class="personal-information">
              <p id="userID">userID:</p>
              <p id="email">email:</p>
              <Form.Group>
                <Form.Control as="textarea" id="history" rows="1" disabled/>
              </Form.Group>
            </div>
          </div>
    );
    }
}

export default Personal;