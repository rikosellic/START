import './App.css';
import React, {Component} from 'react';
import {BrowserRouter as Router, Route} from "react-router-dom";
import Init from "./containers/init";
import Login from "./containers/login";
import Register from "./containers/register";
import Main from "./containers/main";
import Personal from "./containers/personal";
import ReviewRoom from "./containers/reviewRoom";
import JoinRoom from "./containers/joinRoom";
import ReviewSummary from "./containers/reviewSummary"
import studyRoom from "./containers/studyRoom";
import reviewWait from "./containers/reviewWait";
import studyWait from "./containers/studyWait";
import studySummary from "./containers/studySummary";
import searchWord from "./containers/searchWord";


class App extends Component {
  render() {
    return (
      <Router>
        <div className='start'>
          <Route path='/init' component={Init}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/main' component={Main}/>
          <Route path='/personal' component={Personal}/>
          <Route path='/reviewRoom' component={ReviewRoom}/>
          <Route path='/joinRoom' component={JoinRoom}/>
          <Route path='/reviewSummary' component={ReviewSummary}/>
		  <Route path='/studyRoom' component={studyRoom}/>
	      <Route path='/studyWait' component={studyWait}/>
		  <Route path='/reviewWait' component={reviewWait}/>
		  <Route path='/studySummary' component={studySummary}/>
		  <Route path='/searchWord' component={searchWord}/>
        </div>
      </Router>
    )
  }
}

export default App;
