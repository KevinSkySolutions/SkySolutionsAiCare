import React, { Component } from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import Header from '../Common/Header/Header';
import Floors from './_Floors.subComponent';
import AlertsList from './_AlertsList.subComponent';
import { Overlay } from './_Overlay.subComponent';

import { FloorMap } from './_SubComponents';

import { alertsdataActions, overlaydataActions, floorsdataActions } from '../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {

  constructor(props) {
    super(props);

    this.state = {
      globalalerts: props.globalalerts,   
      flooralerts:  props.flooralerts,     
      overlay:      props.overlay,    
      floors:       props.floors              
    };
  }

  componentDidMount() {
    const { dispatch } = this.props;
  }

  componentWillReceiveProps(newProps) {

    // TODO, conditionally setState only if changes are necessary
    this.setState({
      globalalerts: newProps.globalalerts,   
      flooralerts:  newProps.flooralerts,     
      overlay:      newProps.overlay,     
      floors:       newProps.floors
    });
  }

  // the render method of this Container
  render() {

    return (
      <div className="content-dash">

        <Header />
        <div className="content-body">

          <Overlay overlay={this.state.overlay} alerts={this.state.globalalerts} />
          <div>
            <div className="content-section">
              <div className="left-section">
                <div className="pagination">
                  <div className="floors-heading no-margin">Floors</div>
                  <div className="pages">

                    <Floors />
                    <div className="floors-dropdown">
                      <img className="" src={require("../../img/moreoptionfloor.png")} />
                      <img className="" src={require("../../img/dropdownfloors.png")} />
                    </div>
                  </div>
                </div>
                <div className="floor-image">
                  <img src={require("../../img/floorplan" + ((this.state.flooralerts.floor==undefined)? "1" : this.state.flooralerts.floor) + ".png")} alt="" className="floor-map" />
                  
                  <FloorMap alerts={this.state.flooralerts} />
                </div>
              </div>
            </div>

            <div className="col-1 right-section">
              <div><h1 className="alerts-heading no-margin">Alerts</h1></div>
              <div className="right-section-content">

                <AlertsList />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  return {
    globalalerts: state.dashboard.alertsdata,         //Data for the overlay
    flooralerts:  state.floorsdata.selection,  //Data for the Right hand side alerts list and corresponding alerts on the floor map
    overlay:      state.overlaydata.summary,          //Getting the count for the total alerts in the facility
    floors:       state.floorsdata.floors             //Data for showing the total number of floors in the facility
  };
};

export default connect(mapStateToProps)(Dashboard);