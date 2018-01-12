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
        this.absolutePath = '/kill-the-bug/mobile';
        GameActions.getAvailableLevels();
    }
    
    render(){
        
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path={this.absolutePath+'/'} component={Home} />
                        <Route exact path={this.absolutePath+'/character'} component={CharacterSelect} />
                        <Route exact path={this.absolutePath+'/level'} component={LevelSelect} />
                        <Route exact path={this.absolutePath+'/commands'} component={CommandsSelect} />
                        <Route exact path={this.absolutePath+'/sent'} component={RequestSent} />
                        <Route render={() => <p className="text-center mt-5">Not found</p>} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};