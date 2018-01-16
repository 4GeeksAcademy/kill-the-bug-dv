import React from 'react';

import GameStore from '../store/GameStore.js';
import GameActions from '../actions/GameActions.js';

export class CommandsSelect extends React.Component {
  
    constructor(){
      
        super();
        this.state = {
            errorMessage: null,
            availableCommands: GameStore.getAvailableCommands(),
            commands: [],
            selectedLevel: GameStore.getSelectedLevel(),
            toolbarOpened: false
        };
          
    }
    
    componentDidMount(){
        if(GameStore.getCharacter() == null) this.props.history.push('/home');
        if(GameStore.getUsername() == null) this.props.history.push('/home');
        if(GameStore.getSelectedLevel() == null) this.props.history.push('/home');
    }
    
    enqueCommand(commandKey){
        
        let aux = this.state.commands.slice(0); 
        let commandToAdd = GameStore.getCommand(commandKey);
        if(commandToAdd) aux.push(commandToAdd);

        this.setState({
            commands: aux,
            toolbarOpened: false
        });
    }
    
    deleteCommand(position){
        
        this.setState({
            commands: this.state.commands.filter((cmd, index)=>{
                return (position != index);
            })
        });
    }
    
    closeCommandBar(){
        this.setState({
            toolbarOpened: false
        });
    }
    
    openCommandBar(){
        this.setState({
            toolbarOpened: true
        });
    }
    
    publishAttempt(){
        if(this.state.commands.length>0) GameActions.publishAttempt(this.props.history,this.state.commands);
        else this.setState({errorMessage: 'You have to add some commands to your algorithm before sending it'});
    }
    
    render(){
        const commandsToRender = this.state.commands.map((command, index) => {
            return (<li key={index}>
                        {command.label}
                        <button className="delete" onClick={() => this.deleteCommand(index)}><i className="fa fa-trash" aria-hidden="true"></i></button>
                    </li>);
        });
        
        const aCommands = this.state.availableCommands.map((acmd)=>{
           return (<li key={acmd.slug} className="nav-item text-center">
                        <a className="nav-link active" href="#" onClick={() => this.enqueCommand(acmd.slug) }>
                        <p><i className={"fa fa-"+acmd.icon} aria-hidden="true"></i></p>
                        {acmd.label}
                        </a>
                      </li>);
        });
        return(
            <div className="container-fluid pb-5">
                <p className='mr-auto'>&nbsp;</p>
                <h2 className="text-center">Build Your Code</h2>
                <p className="text-center">Like the great coder he is, Rigoberto needs to find and kill the bug, help him!</p>
                {(this.state.errorMessage) ? <p className="alert alert-danger">{this.state.errorMessage}</p> : '' }
                <ul className="commands">
                    {commandsToRender}
                    <li onClick={()=>this.openCommandBar()} className={"nav-item text-center addcommand bg-warning "+((this.state.toolbarOpened) ? 'm-fadeOut' : 'm-fadeIn')}>
                        Add New Command
                    </li>
                </ul>
                <nav className="navbar fixed-bottom navbar-expand-sm navbar-dark bg-dark bottom-action">
                    <div className={((this.state.toolbarOpened) ? "m-popIn":"m-popOut")}>
                        {(this.state.selectedLevel) ? <img src={GameStore.getAssetsURL() + this.state.selectedLevel.thumb} /> : ''}
                        <ul className={"nav justify-content-center "}>
                            {aCommands}
                        </ul>
                        <button onClick={()=>this.closeCommandBar()} className="btn btn-danger btn-lg form-control"> Close Commands </button>
                    </div>
                    <button onClick={()=>this.publishAttempt()} className="btn btn-primary btn-lg form-control"> Run My Code </button>
                </nav>
            </div>
        );
    }
};