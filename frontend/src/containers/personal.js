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
            const reviewwaitcheckuserValue={"username":username};
            const url=""
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
                        body: JSON.stringify(reviewwaitcheckuserValue),
                    }).then(function(response) {
                        if(response.status==200)
                        {return response.json();}
                        else{return '{"str":"failed"}'}
                    }).then(function(myJson){
                        var str=JSON.parse(myJson);

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
            <div class="personal-title">
            sdtyb
            </div>
            <div class="personal-information">
              <p id="email">email:</p>
              <p id="password">password:</p>
              <p>goal:</p>
            </div>
            <div class="personal-modif">
              <span class="blue"><a href="/register">Modif personal information</a></span>
            </div>
          </div>
    );
    }
}

export default Personal;