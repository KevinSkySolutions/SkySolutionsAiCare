import { combineReducers } from 'redux';

import homepageReducer from './homepage-reducer';
import datafetchReducer from './datafetch-reducer';
import userdataReducer from './userdata-reducer';

const rootReducer = combineReducers({ 
  homepage:  homepageReducer,
  dashboard: datafetchReducer,
  overlaydata: datafetchReducer,
  floorsdata: datafetchReducer,
  userdata: userdataReducer
});

export default rootReducer;