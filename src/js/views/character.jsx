import React from 'react';
import { Link } from 'react-router-dom';

import RigoBatman from '../../assets/img/batman.png';
import RigoVader from '../../assets/img/vader.png';

import GameActions from '../actions/GameActions.js';
import GameStore from '../store/GameStore.js';

export class CharacterSelect extends React.Component {
  
    constructor(){
      
        super();
        
        this.state = {
            selectedCharacter: GameStore.getCharacter(),
            errorMessage: null,
            characters: [
                {
                    slug: 'batman',
                    image: RigoBatman,
                    title: 'Rigo Wane',
                    description: "An eccentric millionaire coder that is afraid of bats and has heavy mental issues."
                },
                {
                    slug: 'vader',
                    image: RigoVader,
                    title: 'Dark Rigo',
                    description: "The best coder that ever existed, a bad boy wannabe with a great heart inside, what makes him weak."
                }
            ]
        }
    }
    
    componentDidMount(){
        if(GameStore.getUsername() == null) this.props.history.push('/home');
    }
    
    sendCharacter(){
        if(this.state.selectedCharacter) GameActions.saveCharacter(this.props.history,this.state.selectedCharacter);
        else this.setState({errorMessage: 'Please select a character'});
    }
    
    render(){
        
        const cards = this.state.characters.map((character)=>{
            return <div key={character.slug} className={"card col-6 "+((this.state.selectedCharacter==character.slug)?'active':'')} onClick={() => this.setState({selectedCharacter: character.slug })}>
                        <img className="card-img-top img-fluid" src={'public/'+character.image} alt="Card image cap" />
                        <div className="card-body">
                            <h5 className="card-title text-center">{character.title}</h5>
                            <p className="card-text">{character.description}</p>
                        </div>
                    </div>;
        })
        return(
            <div className="container-fluid pb-5">
                &nbsp;
                <h2 className="text-center">Pick a character!</h2>
                {(this.state.errorMessage) ? <p className="alert alert-danger">{this.state.errorMessage}</p>: ''}
                <div className="row">
                    {cards}
                </div>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark bottom-action">
                    <button onClick={() => this.sendCharacter()} className="btn btn-primary btn-lg form-control"> Confirm Selection </button>
                </nav>
            </div>
        );
    }
};