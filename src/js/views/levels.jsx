import React from 'react';
import { Link } from 'react-router-dom';

import GameActions from '../actions/GameActions.js';
import GameStore from '../store/GameStore.js';

export class LevelSelect extends React.Component {
  
    constructor(){
      
        super();
        
        this.state = {
            selectedLevel: GameStore.getLevel(),
            errorMessage: null,
            levels: GameStore.getAvailableLevels()
        }
    }
    
    componentDidMount(){
        if(GameStore.getUsername() == null) this.props.history.push('/home');
        GameStore.on('change',()=>{
            this.setState({
                selectedLevel: GameStore.getLevel(),
                errorMessage: null,
                levels: GameStore.getAvailableLevels()
            });
        });
    }
    
    sendLevel(){
        if(this.state.selectedLevel) GameActions.saveLevel(this.props.history,this.state.selectedLevel);
        else this.setState({errorMessage: 'Please select a level'});
    }
    
    render(){
        
        if(!this.state.levels || this.state.levels.length==0) return (<h2>Loading Levels...</h2>);
        
        const cards = this.state.levels.map((lvl)=>{
            return <div key={lvl.slug} className={"card col-6 "+((this.state.selectedLevel==lvl.slug)?'active':'')} onClick={() => this.setState({selectedLevel: lvl.slug })}>
                        <img className="card-img-top img-fluid level" src={'https://assets.breatheco.de/apis/kill-the-bug/'+lvl.thumb} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title text-center">{lvl.title}</h5>
                        </div>
                    </div>;
        })
        return(
            <div className="container-fluid pb-5">
                &nbsp;
                <h2 className="text-center">Pick the coding level!</h2>
                {(this.state.errorMessage) ? <p className="alert aler-danger">{this.state.errorMessage}</p>: ''}
                <div className="row">
                    {cards}
                </div>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark bottom-action">
                    <button onClick={() => this.sendLevel()} className="btn btn-primary btn-lg form-control"> Confirm Selection </button>
                </nav>
            </div>
        );
    }
};