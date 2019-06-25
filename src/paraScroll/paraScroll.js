import React, { Component } from 'react';
import { HashRouter as Router,Switch,Route,Link} from 'react-router-dom';
import './paraScroll.css'

class ParaScroll extends Component{
    render(){
        return(
            
                // <div className="container">
                //     <div className="box2">正常滚动元素</div>
                //     <div className='wrapper'>
                //         <div className="box1">视觉差元素</div>
                //     </div>
                // </div>
                <div className="name-container">
                    <div className='wrapper'>
                        <div className="name letter-1">H</div>
                        <div className="name letter-2">U</div>
                        <div className="name letter-3">I</div>
                    </div>
                </div>
            
        )
    }
}

export default ParaScroll;