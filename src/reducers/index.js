import { combineReducers } from 'redux';

import datafetchReducer from './datafetch-reducer';


const rootReducer = combineReducers({ 
  homepage:  datafetchReducer,
  dashboard: datafetchReducer,
  overlaydata: datafetchReducer,
  floorsdata: datafetchReducer,
  userdata: datafetchReducer
});

export default rootReducer;