import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import {CharacterSelect} from './character.jsx';
import {Home} from './home.jsx';
import {CommandsSelect} from './commands.jsx';
import {RequestSent} from './sent.jsx';
//import {SingleEmployee} from './views/shifts/ListShifts.jsx';

export class Layout extends React.Component {
    
    render(){
        
        return(
            <div>
                <BrowserRouter>
                    <Switch>
                        <Route exact path='/' component={Home} />
                        <Route exact path='/character' component={CharacterSelect} />
                        <Route exact path='/commands' component={CommandsSelect} />
                        <Route exact path='/sent' component={RequestSent} />
                        <Route render={() => <p className="text-center mt-5">Not found</p>} />
                    </Switch>
                </BrowserRouter>
            </div>
        );
    }
};