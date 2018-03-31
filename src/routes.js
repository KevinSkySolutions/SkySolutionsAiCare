import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/App';
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    // <Route path="/patients/:patientID" component={Dashboard} />
    <Route path="/dashboard" component={Dashboard} />
  </Route>
);
