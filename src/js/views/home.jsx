import React from 'react';

import GameActions from '../actions/GameActions.js';
import GameStore from '../store/GameStore.js';

import RigoVolando from '../../assets/img/rigo-volando.png';

export class Home extends React.Component {
  
    constructor(){
      
        super();
        
        this.state = {
            usernameError: false,
            username: GameStore.getUsername()
        };
    }
    
    saveUsername(){
        if(this.state.username) GameActions.saveUsername(this.props.history,this.state.username);
        else this.setState({usernameError: true});
    }
    
    render(){
        return(
            <div className="container-fluid text-center bg-dark text-white pb-5 full-height">
                &nbsp;
                <img className="main-image" src={'public/'+RigoVolando} />
                <h1 className="text-center game-title">Kill The Bug</h1>
                <div className="row mt-5">
                    <div className="col-12">
                        <h6>Please enter a nickname to begin:</h6>
                        <input type="text" className="form-control" placeholder="nickname" onChange={(evt) => this.setState({username: evt.target.value})} />
                        {(this.state.usernameError) ? <p className="alert alert-danger">Please enter a valid username</p> : '' }
                        <span>(Only letters and numbers allowed)</span>
                    </div>
                </div>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark bottom-action">
                    <button onClick={() => this.saveUsername()} className="btn btn-primary btn-lg form-control"> Start Playing </button>
                </nav>
            </div>
        );
    }
};