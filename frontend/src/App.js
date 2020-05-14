import React, {Component} from "react";
import {BrowserRouter as Router, Route} from "react-router-dom";
import Init from "./containers/init";
import Login from "./containers/login";
import Register from "./containers/register";
import Main from "./containers/main";

class App extends Component {
  render() {
    return (
      <Router>
        <div className='start'>
          <Route path='/init' component={Init}/>
          <Route path='/login' component={Login}/>
          <Route path='/register' component={Register}/>
          <Route path='/main' component={Main}/>
        </div>
      </Router>
    )
  }
}

export default App;