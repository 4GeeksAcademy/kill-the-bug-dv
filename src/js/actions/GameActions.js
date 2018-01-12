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
    history.push('/commands');
    AppDispatcher.dispatch({
      actionType: 'SAVE_CHARACTER',
      actionData: character
    });
  },
  publishAttempt: (history, commands) => {
    // Send the action to all stores through the Dispatcher
    let dataToSend = {
      username: GameStore.getUsername(),
      character: GameStore.getCharacter(),
      commands: commands.map(function(item){
        return item.slug;
      })
    }
    axios.post('https://assets.breatheco.de/apis/kill-the-bug/api/add_attempt', JSON.stringify(dataToSend),{
      headers: { 'Content-Type': 'text/plain' }
    })
    .then(function (response) {
      console.log("Request sent successfully",response);
      history.push('/sent');
      AppDispatcher.dispatch({
        actionType: 'ATTEMPT_SAVED',
        actionData: commands
      });
    })
    .catch(function (error) {
      console.log("Error in the request",error);
    });
    
  },
}