import React from 'react';
import NavBar from "../components/Nav";
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

class reviewWait extends React.Component {
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
	startreview(roomid){
		const value = {"roomid": roomid,}
        const url = " http://localhost:8000/api/nextword";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
           }).then()
	}
	quitreviewroom(username,roomid){
		const value = {"roomid": roomid,
						"username": username,}
        const url = " http://localhost:8000/api/nextword";
           fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(value),
           }).then(this.props.history.push({pathname:'/main/'+this.state.username}))
	}
    render() {
	const{roomid,username}=this.state
    return (
            <html>
              <div className='login-logo' ><Logo/></div>
              <h4>房间号：123</h4>
			  <Row>
			  <h4>房主：小明
				</h4>
				<h4>小红
				</h4>
			  	<h4>小华
				</h4>
			  </Row>
              <Row>
                 <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button" onClick={this.startreview.bind(this,roomid)}>开始复习</Button>
                 </div>
                 <div class="main-button">
                    <Button variant="primary" size="lg" class="main-button" onClick={this.quitreviewroom.bind(this,username,roomid)}>退出</Button>
                 </div>
              </Row>
            </html>
    );
  }
}

export default reviewWait;