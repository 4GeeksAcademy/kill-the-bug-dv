import React from 'react';
import { Link } from 'react-router-dom';
import GameStore from '../store/GameStore.js';

export class RequestSent extends React.Component {
  
    componentDidMount(){
        debugger;
        if(GameStore.getCharacter() == null) this.props.history.push('/home');
        if(GameStore.getUsername() == null) this.props.history.push('/home');
        if(GameStore.getSelectedLevel() == null) this.props.history.push('/home');
    }
    
    render(){
        debugger;
        return(
            <div className="container-fluid text-center">
                <h1>Hello World</h1>
            </div>
        );
    }
};
/*
                <h1 className="text-center game-title">Menu</h1>
                <ul className={"nav justify-content-center flex-column"}>
                    <li className="nav-item text-center"><Link to="/help">Help</Link></li>
                    <li className="nav-item text-center"><Link to="/map">Check Current Map</Link></li>
                    <li className="nav-item text-center"><Link to="/">Start New Game</Link></li>
                    <li className="nav-item text-center"><Link to="/level">Change Level</Link></li>
                    <li className="nav-item text-center"><Link to="/character">Change Character</Link></li>
                </ul>
                */