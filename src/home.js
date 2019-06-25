import React, { Component } from 'react';
import { HashRouter as Router,Switch,Route,Link} from 'react-router-dom';

class Home extends Component{
    render(){
        return(
            <div>            
                <Link to='/photoWall'><h3>Photo wall</h3></Link>
                <Link to='/paraScroll'><h3>Parallax scrolling</h3></Link>
                <Link to='/bubbles'><h3>Bubbles</h3></Link>
            </div>
        )      
    }
}

export default Home;