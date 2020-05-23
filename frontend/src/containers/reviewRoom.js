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
      second: 10,
      services:[],
      view:"type_a",
      roomid:'',
      username:'',
      choice:'',
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

    nextword(roomid) {
        const nextwordValue = {"roomid":roomid}
        const url = " http://localhost:8000/api/nextproblem";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(nextwordValue),
            }).then(res=>{
                if(res.status === 202){
                    alert('Successful')
                }
                else{
                    alert(res.errors)
                }
            })
        } catch (error) {
        }
    }
    render() {
        const{roomid,username,choice}=this.state
        const serviceShows = this.state.services.map((service,index)=>{
            if(service.type === this.state.view){
                return <div className="one-service" key={index}>{service}</div>
            }
        })
        if (this.state.second <= 0) {
            this.nextword.bind(this,roomid);
        }
        return (
          <div>
            <NavBar2/>
            <div class="row">
              {serviceShows}
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
                <Button className="review-button" variant="outline-info" id="anwser1">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="nmsl"
                    name="Radios"
                  />
                </Button><br/><br/>
                <Button className="review-button" variant="outline-info" id="anwser2">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="wdnmd"
                    name="Radios"
                  />
                </Button><br/><br/>
                <Button className="review-button" variant="outline-info" id="anwser3">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="nnb"
                    name="Radios"
                  />
                </Button><br/><br/>
                  <Button className="review-button" variant="outline-info" id="anwser4">
                  <Form.Check
                    className="review-choice"
                    type="radio"
                    label="handsome"
                    name="Radios"
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