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
                <BrowserRouter basename='/kill-the-bug/mobile'>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route path='/home' component={Home} />
                        <Route path='/character' component={CharacterSelect} />
                        <Route path='/level' component={LevelSelect} />
                        <Route path='/commands' component={CommandsSelect} />
                        <Route path='/sent' component={RequestSent} />
                        <Route render={() => <p className="text-center mt-5">Not found</p>} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};