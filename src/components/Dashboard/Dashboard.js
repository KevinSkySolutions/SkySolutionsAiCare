import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import Header from '../Common/Header/Header';
import Floors from './_Floors.subComponent';

import { ResidentsOnMap, OverlayAlerts, GlobalAlerts, AlertHistory, GlobalAlertsData, Overlay, AlertsList } from './_SubComponents';

import { alertsdataActions, overlaydataActions, floorsdataActions } from '../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {

  constructor (props){
    super(props);
  }

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

  // the render method of this Container
  render() {

    return (
      <div className="content-dash">

        <Header/>

        <div className="content-body">

          <Overlay overlay={ this.props.overlay} alerts={ this.props.globalalerts }/>  
          
          <div className="content-section">
            <div className="left-section">
            <div className="pagination">
              <div className="floors-heading no-margin">Floors</div>
                <div className="pages">
                  <Floors defaultfloor={this.props.defaultfloor} floors={this.props.floors}/>

                  <div className="floors-dropdown">
                    <img className="" src={require("../../img/moreoptionfloor.png")} />
                    <img className="" src={require("../../img/dropdownfloors.png")} />
                  </div>
                </div>
              </div>

              <div className="floor-image">
                <img src={require("../../img/floorplan.png")} alt="" className="floor-map"/>
                <ResidentsOnMap alerts={this.props.flooralerts}/> 
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
          
    </div>
    );
  }
}

const mapStateToProps = (state) => {

  const alertsCopy = state.dashboard.alertsdata;
  const floorCopy = state.floorsdata.selection;
  const floors = state.floorsdata.floors;
  const overlayCopy = state.overlaydata.summary;
  const userData = state.userdata.defaultfloor;

  return {
    globalalerts: alertsCopy,   //Data for the overlay
    flooralerts: floorCopy,     //Data for the Right hand side alerts list and corresponding alerts on the floor map
    overlay: overlayCopy,       //Getting the count for the total alerts in the facility
    defaultfloor:userData,      //user information for showing the default floor assigned to the user
    floors: floors              //Data for showing the total number of floors in the facility
  };
};

export default connect(mapStateToProps)(Dashboard);