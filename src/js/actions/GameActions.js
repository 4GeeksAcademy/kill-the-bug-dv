// LoginAction.js

import AppDispatcher from '../dispatcher.js';
import GameStore from '../store/GameStore.js';

import axios from 'axios';

export default {
  saveUsername: (history, username) => {
    history.push('/character');
    AppDispatcher.dispatch({
      actionType: 'SAVE_USERNAME',
      actionData: username
    });
  },
  saveCharacter: (history, character) => {
    history.push('/level');
    AppDispatcher.dispatch({
      actionType: 'SAVE_CHARACTER',
      actionData: character
    });
  },
  saveLevel: (history, level) => {
    history.push('/commands');
    AppDispatcher.dispatch({
      actionType: 'SAVE_LEVEL',
      actionData: level
    });
  },
  publishAttempt: (history, commands) => {
    // Send the action to all stores through the Dispatcher
    let dataToSend = {
      username: GameStore.getUsername(),
      character: GameStore.getCharacter(),
      level: parseInt(GameStore.getLevel()),
      commands: commands.map(function(item){
        return item.slug;
      })
    }
    axios.post('https://assets.breatheco.de/apis/kill-the-bug/api/add_attempt', JSON.stringify(dataToSend),{
      headers: { 'Content-Type': 'text/plain' }
    })
    .then(function (response) {
      if(response.data.code==200)
      {
        console.log("Request sent successfully",response);
        history.push('/sent');
        AppDispatcher.dispatch({
          actionType: 'ATTEMPT_SAVED',
          actionData: commands
        });
      }
      else if(response.data.code!=200) alert(response.data.message);
    })
    .catch(function (error) {
      console.log("Error in the request",error);
    });
    
  },
  getAvailableLevels: () => {
    axios.get('https://assets.breatheco.de/apis/kill-the-bug/api/get_levels')
    .then(function (response) {
      if(response.data.code==200)
      {
        AppDispatcher.dispatch({
          actionType: 'SAVE_AVAILABLE_LEVELS',
          actionData: response.data.data
        });
      }
      else console.log("Error in the request",response.data);
    })
    .catch(function (error) {
      console.log("Error in the request",error);
    });
    
  },
}