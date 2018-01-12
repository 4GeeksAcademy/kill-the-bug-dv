import React from 'react';
import { Link } from 'react-router-dom';

import GameStore from '../store/GameStore.js';
import RigoCoder from '../../assets/img/programmer.png';

export class RequestSent extends React.Component {
  
    constructor(){
      
        super();
        
        this.state = {
        };
          
    }
    
    componentDidMount(){
        if(GameStore.getCharacter() == null) this.props.history.push('/home');
        if(GameStore.getUsername() == null) this.props.history.push('/home');
    }
    
    render(){
        return(
            <div className="container-fluid text-center">
                &nbsp;
                <img className="main-image" src={'public/'+RigoCoder} />
                <h4 className="text-center mt-5">Your commands where sent successfully!</h4>
                <p mb-5 mt-5>All you have to do now is wait for the instructor to run your algorithm, lets hope your code is good for the good of humanity...</p>
                <div className="row">
                    <div className="col-12">
                        <Link to="/" className="btn btn-primary btn-lg form-control"> Play Again </Link>
                    </div>
                </div>
                <footer className="sticky-footer">
                  <div className="container">
                    <div className="text-center">
                      <small>Copyright © 4Geeks Academy</small>
                    </div>
                  </div>
                </footer>
            </div>
        );
    }
};