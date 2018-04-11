import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import { bindActionCreators } from 'redux';

import { createaction_requestAlerts } from '../../actions';
import { REQUEST_ALERTS, REQUEST_ALERTS_SUMMARY } from '../../constants';
import Header from '../Common/Header/Header';
import { AlertsList, ResidentsOnMap } from './SubComponents';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {
  
  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch({ type: REQUEST_ALERTS, payload: {} });
    // dispatch({ type: REQUEST_ALERTS, payload: {} });
  }

  doFetchMockData = (event) => {

    // this.props.dispatch_createaction_doLogin("u", "p");
    this.props.dispatch({ type: REQUEST_ALERTS_SUMMARY, payload: {} });
  }

  render() {

    return (
      <div className="content-dash">

        <Header />

        <div className="content-body">

          <div className="left-section">
            <img src={require("../../img/bg5.png")} alt="" className="floor-map"/>
            <div className="pagination">
              <div className="pages">
                <div className="page active" onClick={ this.doFetchMockData }>1</div>
                <div className="page">2</div>
                <div className="page">3</div>
              </div>
            </div>

            <ResidentsOnMap alerts={ this.props.alerts } />
          
          </div>

          <div className="col-1 right-section">
            <h1 className="alerts-heading no-margin">Alerts</h1>
            <div className="right-section-content">
            
              <AlertsList alerts={ this.props.alerts } />
          
            </div>
          </div>
        </div>
      </div>
      
    );
  }
}

const mapStateToProps = (state) => {

  const alertsCopy = state.dashboard.alertsdata;

  return {
    alerts: alertsCopy
  };
};

// adding callables to props
const mapDispatchToProps = (dispatch, props) => {

  return Object.assign({dispatch: dispatch}, bindActionCreators({
    dispatch_createaction_requestAlerts:  
      () => { 
        dispatch(createaction_requestAlerts());
      }
  }, dispatch));
}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard);
