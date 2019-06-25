import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router,Switch,Route,Link} from 'react-router-dom';
import './App.css';

import Home from './home';
import PhotoWall from './photowall/photoWall';
import ParaScroll from './paraScroll/paraScroll';
import Bubbles from './bubbles/bubbles'

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path='/' component={Home}></Route>
          <Route path='/photoWall' component={PhotoWall}></Route>
          <Route path='/paraScroll' component={ParaScroll}></Route>
          <Route path='/bubbles' component={Bubbles}></Route>
        </Switch>
      </Router>
    );
  }
}

export default App;



