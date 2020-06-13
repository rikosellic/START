import React, { Component }from 'react';
import {
  Jumbotron,
  Container,
  Row,
  Col,
  Form,
  Button,
} from 'react-bootstrap';
import "./href.css";
import Logo from "../components/Logo";
import NavBar2 from "../components/Nav2";
import Footer from "../components/Footer";
import PropTypes from 'prop-types';

class SearchWord extends React.Component {
	static propTypes = {
		word: PropTypes.string.isRequired,
		username: PropTypes.string.isRequired,
		wordlist: PropTypes.string.isRequired,
    }
    constructor(props) {
		super(props);
		var message=window.location.href;
		var messagesplit=message.split('/');
		const messages = this.props.location.state.res1
		const mess = this.props.location.state.res2
		const mess1 = this.props.location.state.res3
		var message=window.location.href;
		this.onusernameChange = this.onusernameChange.bind(this);
		this.onwordChange = this.onwordChange.bind(this);
		this.state = {
		word: mess,
		wordlist: messages,
        username: messagesplit[4],
      }
    }
	searchword(word){
		var that = this;
		const searchwordValue = {"word": word}
        const url = " http://localhost:8000/api/searchword";
        try {
            fetch(url, {
                method: "POST",
                headers: {
                    "Content-type":"application/json;charset=utf-8",
                },
                body: JSON.stringify(searchwordValue),
            }).then(function(response) {
				return response.json()
            }).then(function(myJson){
				var cont = JSON.parse(myJson);
                that.setState({
            wordlist: cont,
        });
            })
        } catch (error) {
        }
	}
	onusernameChange(event) {
		this.setState({
            username: this.props.location.state.username,
        });
    }
	onwordChange(event) {
        this.setState({
            word: event.target.value,
        });
	}
	render() {
    const{username,wordlist,word}=this.state
    return (
	<div>
		<div>
		<NavBar2 myname={username}/>
		<Form inline>
			<Form.Control style={{display:"none"}}/>
            <Form.Control type="text" onChange={this.onwordChange}/>
            <Button variant="danger" onClick={this.searchword.bind(this,word)}>Search</Button>
        </Form>
		{  
		(wordlist.length==0)
		?<h4>Not Found.</h4>
		:wordlist.map((item,index)=>{
		return (
		<div>
		<div className='many'>
		<h4>{item.Word}</h4>
		<h4>{item.meaning}</h4>
		</div>                    
		</div> 
		)
		},this)
		}
		</div>
    </div>
    );
  }
}

export default SearchWord;