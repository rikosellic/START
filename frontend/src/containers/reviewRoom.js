import React from 'react';
import {
    Jumbotron,
    Container,
    Row,
    Col,
    Form,
    Button,
} from 'react-bootstrap';
import "./reviewRoom.css";
import NavBar from "../components/Nav";

class ReviewRoom extends React.Component {
    render() {
        return (
          <div>
            <NavBar/>
            <div class="row">
              <div class="review-score" style={{marginLeft: '24%'}}>tyb:0</div>
              <div class="review-score">zs:0</div>
              <div class="review-score">handsome:0</div>
              <div class="review-score">email:0</div>
            </div>
            <div class='review-time'>time remaining: 10s</div>
            <div class="review-word">integrity</div>
            <div class="review-anwser">
              <Form.Group as={Row}>
                <Col sm={10}>
                <Button variant="outline-info">
                  <Form.Check
                    type="radio"
                    label="nmsl"
                    name="Radios"
                    id="radios1"
                  />
                </Button><br/><br/>
                <Button variant="outline-info">
                  <Form.Check
                    type="radio"
                    label="wdnmd"
                    name="Radios"
                    id="radios2"
                  />
                </Button><br/><br/>
                <Button variant="outline-info">
                  <Form.Check
                    type="radio"
                    label="nnb"
                    name="Radios"
                    id="radios3"
                  />
                </Button><br/><br/>
                  <Button variant="outline-info">
                  <Form.Check
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
              score:20/50  speed:21/50
            </div>
          </div>
    );
    }
}

export default ReviewRoom;