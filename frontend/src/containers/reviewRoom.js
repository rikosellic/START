import React, { Component } from 'react';
import {
    Jumbotron,
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';
import "./reviewRoom.css";
import NavBar2 from "../components/Nav2";

class ReviewRoom extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
       second: 10
        }
    }
    componentDidMount () {
      let remaining = 10000;
      this.timer = setInterval(() => {
        if (remaining >= 1000) {
          remaining -= 1000;
          let second = Math.floor(remaining/1000);
          this.setState({
            second:second < 10 ? "0" + second : second
          })
        } else {
          clearInterval(this.timer);
          }
      }, 1000);
     }
    render() {
        if (this.state.second <= 0) {
            window.location.href='/reviewRoom';
        }
        return (
          <div>
            <NavBar2/>
            <div class="row">
              <div class="review-score" style={{marginLeft: '24%'}}>tyb:0</div>
              <div class="review-score">zs:0</div>
              <div class="review-score">handsome:0</div>
              <div class="review-score">email:0</div>
            </div>
            <div class='review-time'>
              <span>time remaining: {this.state.second}s</span>
            </div>
            <div class="review-word">integrity</div>
            <div class="review-anwser">
              <Form.Group as={Row}>
                <Col sm={10}>
                <Button className="review-button" variant="outline-info">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="nmsl"
                    name="Radios"
                    id="radios1"
                  />
                </Button><br/><br/>
                <Button className="review-button" variant="outline-info">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="wdnmd"
                    name="Radios"
                    id="radios2"
                  />
                </Button><br/><br/>
                <Button className="review-button" variant="outline-info">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="nnb"
                    name="Radios"
                    id="radios3"
                  />
                </Button><br/><br/>
                  <Button className="review-button" variant="outline-info">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="handsome"
                    name="Radios"
                    id="radios4"
                  />
                </Button>
                </Col>
              </Form.Group>
            </div>
            <div class="review-speed">
              score:20/50 speed:21/50
            </div>
          </div>
    );
    }
}

export default ReviewRoom;