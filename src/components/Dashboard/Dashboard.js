import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import { bindActionCreators } from 'redux';

import { find } from 'lodash';

import { createaction_requestAlerts, REQUEST_ALERTS, REQUEST_ALERTS_MOCK } from '../../actions';
import Header from '../Common/Header/Header';

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
      title: `Post Detail Page - Post ${id}`,
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

    // 
    // this.props.dispatch_createaction_doLogin("u", "p");
    this.props.dispatch({ type: REQUEST_ALERTS_MOCK, payload: {} });
  }

  render() {
    // for use inside render
    const head = Dashboard.getMeta();

    return (
      <div className="dashbodyclass">
        <div className="content">
          <div className="nav-container">
            <ul>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="/patients">Patients</a>
              </li>
              <li>
                <a href="/facilities">Facilities</a>
              </li>
              <li>
                <a href="/reports">Reports</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>

          <div className="col-1 left-section">
            <img src={require("../../img/bg4.png")} />
          </div>

          <div className="col-1 right-section">
            <h1>
              <span className="subheading">Alerts</span>
            </h1>
            <div className="scrollable-area">

            { this.props.alertsList }

            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  const alertsCopy = state.dashboard.alertsdata;
  const alertsList = alertsCopy.map((alert, keyValue) => { return(
    // <ObjectRow obj={alert} key={keyValue}  />
    <div className="description-mod" key={keyValue}>
      <div className="pt-log pt-detail">
        <img src={require("../../img/avatar.png")} />
        <div className="side-text detail-1">
          <div className="pt-name">{ alert.resident }</div>
          <div className="pt-suite-no gray-text">{ alert.currentlocation }</div>
        </div>
      </div>
      <div className="pt-log pt-loc">
        <img src={require("../../img/sos.png")} />
        <div className="side-text detail-2">
          <div className="pt-condition">{ alert.type }</div>
          <div className="curr-location gray-text">@{ alert.location.room }</div>
        </div>
      </div>
      <div className="pt-log pt-stat">
        <div className="help-stat">{ alert.status }</div>
        <div className="elapsed-time gray-text side-text">{ alert.time } min ago</div>
      </div>
      <div className="drop-down" />
    </div>
  )});

  return {
    alerts: alertsCopy,
    alertsList: alertsList
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
