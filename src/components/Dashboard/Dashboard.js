import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import { bindActionCreators } from 'redux';

import { createaction_requestAlerts, REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../../actions';
import Header from '../Common/Header/Header';
import { AlertsList, ResidentsOnMap } from './SubComponents';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  static getMeta(id) {
    return {
      title: `AiCare AshbyPonds Monitoring Portal`,
      link: [
        {
          rel: 'canonical',
          href: `http://localhost:3000/post/${id}`
        }
      ],
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description', content: 'Put the description here!'
        }
      ]
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
    this.props.dispatch({ type: REQUEST_ALERTS, payload: {} });
    // dispatch({ type: REQUEST_ALERTS, payload: {} });
  }

  doFetchMockData = (event) => {

    // this.props.dispatch_createaction_doLogin("u", "p");
    this.props.dispatch({ type: REQUEST_ALERTS_MOCK, payload: {} });
  }

  render() {
    // for use inside render
    const head = Dashboard.getMeta();

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
