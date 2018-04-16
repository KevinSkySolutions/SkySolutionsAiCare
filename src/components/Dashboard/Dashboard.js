import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import Header from '../Common/Header/Header';
import { AlertsList, ResidentsOnMap, OverlayAlerts, Floors, GlobalAlerts } from './SubComponents';



import { alertsdataActions, overlaydataActions, floorsdataActions } from '../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {

  componentDidMount() {
    const { dispatch } = this.props;

  }

  /**
   * mock call for now, to simulate a future state
   */
  doFetchMockData = (event) => {

    // this.props.dispatch_createaction_doLogin("u", "p");
    this.props.dispatch(alertsdataActions.getAlertsDataMock());
  }

  /**
   * mock call for now, to simulate REQUEST_FLOOR_DATA
   */
  doFetchFloordata = (event) => {

    this.props.dispatch(floorsdataActions.getFloorsData());
  }

  // the render method of this Container
  render() {

    return (
      <div className="content-dash">

        <Header/>

        <div className="content-body">

          <div className="main-heading-section common-margin">
            <div className="center-image">
              <img src={require("../../img/centerimage.png")} alt=""/>
              <div className="heading-title">Epoch Elder Care</div>
            </div>

            <OverlayAlerts/>
            
            

          </div>

          <div className="content-section">
            <div className="left-section">
              <Floors/>
              <div className="floor-image">
                <img src={require("../../img/floorplan.png")} alt="" className="floor-map"/>
                <ResidentsOnMap alerts={this.props.globalalerts}/> 
              </div>
            </div>
          </div>  
            

          <div className="col-1 right-section">
            <div><h1 className="alerts-heading no-margin">Alerts</h1></div>
            <div className="right-section-content">

              <AlertsList alerts={this.props.flooralerts} />

            </div>
            </div>
          </div>
          <div className="alerts-popup" id="alert-popups">
            <div className="main-heading-section common-margin alert-popup-label">
      <div className="heading-labels">
        <div className="alerts">
          <img src={require("../../img/alert5.png")} alt=""/>
          <div className="alert-number5 alert-number">02</div>
        </div>
        <div className="alerts">
          <img src={require("../../img/alert4.png")} alt=""/>
          <div className="alert-number4 alert-numbers">02</div>
        </div>
        <div className="alerts">
          <img src={require("../../img/alert3.png")} alt=""/>
          <div className="alert-number3 alert-numbers">03</div>
        </div>
        <div className="alerts">
          <img src={require("../../img/alert2.png")} alt=""/>
          <div className="alert-number2 alert-numbers">04</div>
        </div>
        <div className="alerts">
          <img src={require("../../img/alert1.png")} alt=""/>
          <div className="alert-number1 alert-numbers">01</div>
        </div>
        <div className="dropdown-overlay" id="close-icon">
          <img src={require("../../img/dropdowniconoverlay.png")} alt="" className="rotated-arrow"/>
        </div>
      </div>
    </div>

    <div className="alert-popup-section">
      <div className="popup-card">
        <div className="map-point">
          <img src={require("../../img/locationoyellow.png")} className="avatar"/>
        </div>
        <div className="type-of-alert alert-number-different">WAKING UP ALERT</div>
        <div className="alert-content-section">
          <div className="alert-content">
            <div className="pt-log pt-detail">
              <img src={require("../../img/cardalertd.png")} className="avatar"/>
              <div className="side-text detail-1 side-text-padding">
                <div className="pt-name list-header">Richard Branson</div>
                <div className="pt-suite-no gray-text list-subheader mr-t-5">Suite #101</div>
              </div>
            </div>
          </div>

          <div>
              <img className="" src={require("../../img/videoyellow.png")} />
          </div>
        </div>
      </div>
    </div>
    </div>
          <GlobalAlerts/>
    </div>
    );
  }
}

const mapStateToProps = (state) => {

  const alertsCopy = state.dashboard.alertsdata;

  const floorCopy = state.floorsdata.selection;

  const overlayCopy = state.overlaydata.summary;
  console.log("ERROR:")
  console.log(floorCopy);

  return {
    globalalerts: alertsCopy,
    flooralerts: floorCopy,
    overlay: overlayCopy
  };
};

export default connect(mapStateToProps)(Dashboard);
