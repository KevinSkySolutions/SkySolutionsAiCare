import { RECEIVE_USER_DATA } from '../constants';

// this is the alerts overlay reducer, responds to all ACTIONS raised from the overlay part of every page. 
export default function userdataReducer(state = {}, action) {
  switch (action.type) {

    case RECEIVE_USER_DATA:

      console.log("RECEIVE_USER_DATA type of action called.");

      let userDataFromServer = action.payload;

      return {
        ...state,
        ...userDataFromServer
      }
    default:
      return state;
  }
};