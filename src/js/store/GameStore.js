import BaseStore from './BaseStore.js';

class GameStore extends BaseStore {

  constructor() {
      
    super();
    // First we register to the Dispatcher to listen for actions.
    this.subscribe(() => this._registerToActions.bind(this));
    this._availableCommands = [
        {slug: "runRight", label: "Run Right", "icon": "arrow-right"}, 
        {slug: "runLeft", label: "Run Left", "icon": "arrow-left"}, 
        {slug: "jumpRight", label: "Jump Right", "icon": "arrow-up"}, 
        {slug: "jumpLeft", label: "Jump Left", "icon": "arrow-up"}, 
        {slug: "climb", label: "Climb", "icon": "level-up"}, 
        {slug: "open", label: "Open Door", "icon": "key"}, 
        {slug: "push", label: "Push", "icon": "hand-paper-o"}, 
        {slug: "kill", label: "Kill Bug", "icon": "free-code-camp"}
    ];
    
    this._character = null;
    this._username = null;
  }

  _registerToActions(action) {
    if(typeof(action) == 'undefined') return;
    switch(action.actionType) {
      case 'ATTEMPT_SAVED':
        this.emitChange();
        break;
      case 'SAVE_USERNAME':
          this._username = action.actionData;
        this.emitChange();
        break;
      case 'SAVE_CHARACTER':
          this._character = action.actionData;
        this.emitChange();
        break;
      default:
        break;
    };
  }
  
  getUsername(){
      return this._username;
  }
  getCharacter(){
      return this._character;
  }
  
  getCommand(slug){
      for(var i = 0; i<this._availableCommands.length;i++){
          if(this._availableCommands[i].slug == slug) return this._availableCommands[i];
      }
      return null;
  }

  // Just getters for the properties it got from the action.
  getAvailableCommands() {
    return this._availableCommands;
  }
}
export default new GameStore();