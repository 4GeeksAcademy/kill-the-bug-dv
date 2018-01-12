import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {CharacterSelect} from './character.jsx';
import {Home} from './home.jsx';
import {LevelSelect} from './levels.jsx';
import {CommandsSelect} from './commands.jsx';
import {RequestSent} from './sent.jsx';

import GameActions from '../actions/GameActions.js';

export class Layout extends React.Component {
    
    constructor(){
        
        super();
        
        GameActions.getAvailableLevels();
    }
    
    render(){
        
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/character' component={CharacterSelect} />
                        <Route exact path='/level' component={LevelSelect} />
                        <Route exact path='/commands' component={CommandsSelect} />
                        <Route exact path='/sent' component={RequestSent} />
                        <Route render={() => <p className="text-center mt-5">Not found</p>} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};