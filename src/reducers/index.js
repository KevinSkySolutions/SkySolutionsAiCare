import { combineReducers } from 'redux';

import homepageReducer from './homepage-reducer';
import datafetchReducer from './datafetch-reducer';
import alertsoverlayReducer from './alertsoverlay-reducer';
import floordataReducer from './floorsdata-reducer';

const rootReducer = combineReducers({ 
  homepage:  homepageReducer,
  dashboard: datafetchReducer,
  overlaydata: alertsoverlayReducer,
  floorsdata: floordataReducer
});

export default rootReducer;