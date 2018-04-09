import { combineReducers } from 'redux';

import homepageReducer from './homepage-reducer';
import datafetchReducer from './datafetch-reducer';

const rootReducer = combineReducers({ 
  homepage:  homepageReducer,
  dashboard: datafetchReducer
});

export default rootReducer;