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

class Personal extends React.Component {
    render() {
        return (
          <div>
            <NavBar/>
            <div class="personal-title">
            sdtyb
            </div>
            <div class="personal-information">
              <p>email:sdtyb</p>
              <p>password:sbtyb</p>
              <p>goal:0</p>
            </div>
            <div class="personal-modif">
              <span class="blue"><a href="/register">Modif personal information</a></span>
            </div>
          </div>
    );
    }
}

export default Personal;