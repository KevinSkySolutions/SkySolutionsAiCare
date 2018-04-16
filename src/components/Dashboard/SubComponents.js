import React, { Component } from 'react';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

// stateless functional component for use by Dashboard
export function AlertsList(props) {
 
  let alerts = props.alerts.alerts;

  const alertsList = alerts.map((alert, keyValue) => { 

    return(
      
      <div className="description-mod">
                            <div className="type-of-alert alert-number3">ASSISTANCE REQUIRED</div>
                            <div className="alert-content-section">
                                <div className="alert-content">
                                    <div className="pt-log pt-detail">
                                        <img src={require("../../img/cardalertb.png")} className="avatar"/>
                                        <div className="side-text detail-1 side-text-padding">
                                            <div className="pt-name list-header">Richard Branson</div>
                                            <div className="pt-suite-no gray-text list-subheader mr-t-5">Suite #101</div>
                                        </div>
                                    </div>
                                   
                                    <div className="pt-log pt-stat pt-stat-text">
                                        <div>
                                            <div className="help-stat list-header">
                                                Help active
                                            </div>
                                            <div className="elapsed-time gray-text side-text list-subheader mr-t-5">30 min ago</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <img className="" src={require("../../img/dropdownoncard.png")} />
                                </div>
                            </div>
                        </div> 
  )});

  return alertsList

}

export function ResidentsOnMap(props) {

  return props.alerts.map((alert, keyValue) => { 

    var divStyle = {
      color: 'white',
      top: (alert.location.xpercent)*4.2+'px',
      left: (alert.location.ypercent)*4.2+'px'
    };

    return(
      <img key={ keyValue } style={divStyle} className="person-on-map" src={ require("../../img/" + alert.icon + "_" + alert.priority + ".png") }/>
    )
  })
}

export  const OverlayAlerts = () => (
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
      <div className="dropdown-overlay" id="show-alerts-drop-down">
        <img src={require("../../img/dropdowniconoverlay.png")} alt=""/>
      </div>
    </div>
);



export const Floors = () => (
  <div className="pagination">
    <div className="floors-heading no-margin">Floors</div>
    <div className="pages">
      <div className="page">10</div>
      <div className="page">9</div>
      <div className="page">8</div>
      <div className="page">7</div>
      <div className="page">6</div>
      <div className="page">5</div>
      <div className="page">4</div>
      <div className="page">3</div>
      <div className="page">2</div>
      <div className="page active">1</div>
      <div className="floors-dropdown">
        <img className="" src={require("../../img/moreoptionfloor.png")} />
        <img className="" src={require("../../img/dropdownfloors.png")} />
      </div>
    </div>
  </div>
);

export class GlobalAlerts extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
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
    );
  }
}