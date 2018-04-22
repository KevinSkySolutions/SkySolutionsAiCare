import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertsdataActions } from '../../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Header.css');
  // eslint-disable-line global-require
}

class Header extends Component {

  constructor(props) {
    super(props);
  }

  originaldata = () => {
    this.props.dispatchaction_getdata();
  }

  mock1 = () => {
    this.props.dispatchaction_mock1();
  };

  mock2 = () => {
    this.props.dispatchaction_mock2();
  };

  render() {

    return (

      <div>
        <header>
          <div className="logo">
            <img src={require("../../../img/logo.png")} alt="" />
          </div>
          <div className="header-image">

          </div>

          <div className="nav-container">
            <ul className="nav-list">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Patients</a>
              </li>
              <li onClick={ this.originaldata }>
                <a href="#">Facilities</a>
              </li>
              <li onClick={ this.mock1 }>
                <a href="#">Reports</a>
              </li>
              <li onClick={ this.mock2 }>
                <a href="#">Help</a>
              </li>
              <div className="user-wrap">
                <div className="profile-pic" />
              </div>
            </ul>
          </div>
        </header>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {

  let ac_requestAlertsDataMock1 = alertsdataActions.requestAlertsDataMock1;
  let ac_requestAlertsDataMock2 = alertsdataActions.requestAlertsDataMock2;
  let ac_requestAlerts          = alertsdataActions.requestAlertsData;

  return {
      ...bindActionCreators({
          dispatchaction_mock1:   ac_requestAlertsDataMock1,
          dispatchaction_mock2:   ac_requestAlertsDataMock2,
          dispatchaction_getdata: ac_requestAlerts
      },
      dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Header);