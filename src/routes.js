import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './components/App/App';
import HomePage from './components/HomePage/HomePage';
import Dashboard from './components/Dashboard/Dashboard';
import Patients from './components/Patients/Patients';
import Facilities from './components/Facilities/Facilities';
import Reports from './components/Reports/Reports';

export default (
  <Route path="/" component={App}>
    <IndexRoute component={HomePage} />
    <Route path="/dashboard" component={ Dashboard } />
    <Route path="/patients" component={ Patients } />
    <Route path="/facilities" component={ Facilities } />
    <Route path="/reports" component={ Reports } />
  </Route>
);
