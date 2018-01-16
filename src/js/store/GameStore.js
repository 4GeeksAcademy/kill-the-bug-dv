import BaseStore from './BaseStore.js';

class GameStore extends BaseStore {

  constructor() {
      
    super();
    // First we register to the Dispatcher to listen for actions.
    this.subscribe(() => this._registerToActions.bind(this));
    this._availableLevels = null;
    this._availableCommands = [
        {slug: "runRight", label: "Right", "icon": "arrow-right"}, 
        {slug: "runLeft", label: "Left", "icon": "arrow-left"}, 
        {slug: "jumpRight", label: "Jump Right", "icon": "arrow-up arrow-right"}, 
        {slug: "jumpLeft", label: "Jump Left", "icon": "arrow-up arrow-left"}, 
        {slug: "climb", label: "Climb", "icon": "level-up"}, 
        {slug: "open", label: "Open Door", "icon": "key"}, 
        {slug: "push", label: "Push", "icon": "hand-paper-o"}, 
        {slug: "kill", label: "Kill", "icon": "free-code-camp"}
    ];
    
    this._character = null;
    this._username = null;
    this._level = null;
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
      case 'SAVE_AVAILABLE_LEVELS':
          this._availableLevels = action.actionData;
        this.emitChange();
        break;
      case 'SAVE_LEVEL':
          this._level = action.actionData;
        this.emitChange();
        break;
      default:
        break;
    };
  }
  
  getAssetsURL(){
    return 'https://assets.breatheco.de/apis/kill-the-bug/';
  }
  
  getAvailableLevels(){
      return this._availableLevels;
  }
  getSelectedLevel(){
    
    if(this._availableLevels == null) return null;
    
    for(var i = 0; i<this._availableLevels.length;i++){
        if(this._availableLevels[i].slug == this._level) return this._availableLevels[i];
    }
    return null;
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