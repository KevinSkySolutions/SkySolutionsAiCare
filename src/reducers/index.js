import { combineReducers } from 'redux';

import homepageReducer from './homepage-reducer';
import datafetchReducer from './datafetch-reducer';
import alertsoverlayReducer from './alertsoverlay-reducer';
import floordataReducer from './floorsdata-reducer';
import userdataReducer from './userdata-reducer';

const rootReducer = combineReducers({ 
  homepage:  homepageReducer,
  dashboard: datafetchReducer,
  overlaydata: alertsoverlayReducer,
  floorsdata: floordataReducer,
  userdata: userdataReducer
});

export default rootReducer;