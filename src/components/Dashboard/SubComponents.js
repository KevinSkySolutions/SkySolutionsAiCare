import React from 'react';

import { createaction_requestAlerts, REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

// stateless functional component for use by Dashboard
export const AlertsList = props => {
  return <div>AlertsList</div>
}
