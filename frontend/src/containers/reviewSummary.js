import React from 'react';
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

class ReviewSummary extends React.Component {
    render() {
        return (
            <div>
                <NavBar2/>
                <div className='reviewsummary-div'>
                    <div className='reviewsummary-logo'><Logo/></div>
                    <h4>It's the fourth day you joined START!<br/>You have studied 50 words today</h4>
                    <br/><h5>你是第4名!</h5><br/>
                    <div className="reviewsummary-score">
                        <br/>
                        <h5>handsomezsk 49分</h5>
                        <h5>tyb 43分</h5>
                        <h5>nmsl 41分</h5>
                        <h5>sdtyb 29分</h5>
                        <br/>
                    </div>
                    <div className="reviewsummary-button">
                        <Button variant="primary" size="lg"><span class="white"><a href="/main">End review</a></span></Button>
                    </div>
                </div>
            </div>
    );
    }
}

export default ReviewSummary;