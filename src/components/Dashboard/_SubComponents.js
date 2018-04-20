import React, { Component } from 'react';
import Dialog from 'rc-dialog';
import ReactDOM from 'react-dom';
import { floorsdataActions } from '../../actions';
import { connect } from 'react-redux';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

// Function for the right hand side section of the Dashbord for displaying the relevant floor alerts
export function AlertsList (props)  {

  let alerts = props.alerts.alerts; // Making a copy of the alerts object for the relevant floor for data manipulation

  return alerts.map((alert, keyValue) => {

    let divstyle = ("type-of-alert alert-number" + alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

    return (

      <div className="description-mod" key={keyValue}>             

        <div className={divstyle}>{alert.type}</div>
        <div className="alert-content-section">
          <div className="alert-content">
            <div className="pt-log pt-detail">
              <img src={require("../../img/cardalert" + alert.priority + ".png")} className="avatar" />
              <div className="side-text detail-1 side-text-padding">
                <div className="pt-name list-header">{alert.resident}</div>
                <div className="pt-suite-no gray-text list-subheader mr-t-5">{alert.currentlocation}</div>
              </div>
            </div>

            <div className="pt-log pt-stat pt-stat-text">
              <div>
                <div className="help-stat list-header">
                  {alert.description}
                </div>
                <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{alert.time} min ago</div>
              </div>

            </div>
          </div>

          <div>
            <img className="" src={require("../../img/dropdownoncard.png")} />
          </div>
          <AlertHistory alerts={alert.history} />
        </div>
      </div>
    )  
  });
}

// Function for adding the history of alerts of a patient to the AlertsList Section
export function AlertHistory(props) {

  return props.alerts.map((alert, keyValue) => {
    return <div className="list-detail" key={keyValue}>
      <div className="call-status iBlock-wrap line-wrap">
        <div className="dot iBlock danger"></div>
        <div className="status iBlock list-header">{alert.type}&nbsp;&nbsp;&nbsp;|</div>
        <div className="time iBlock list-subheader">{alert.timestamp}</div>
      </div>
    </div>

  });
}

// Function for adding the alerts to the left hand section of the Dashboard i.e adding alert icons to the floormap
export function ResidentsOnMap(props) {

  let alerts = props.alerts.alerts; // Making a copy of the alerts object for the relevant floor for data manipulation

  return alerts.map((alert, keyValue) => {

    // Variable to decide which style to assign the alert based on the priority of the alert being passed
    let divStyle = {
      color: 'white',
      top: (alert.location.xpercent) * 4.2 + 'px',
      left: (alert.location.ypercent) * 4.2 + 'px'
    };

    return (
      <img key={keyValue} style={divStyle} className="person-on-map" src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
    )
  })
}

// Component for the expanding Overlay of the Dashboard Page and displaying the relevant information
export class Overlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      overlay: props.overlay, // The count of all the alerts in the facility stored in an array
      globalalerts: props.alerts // All the alerts in the facility to show in the overlay stored as an object
    }
  }

  onClick = e => { // For displaying the overlay
    this.setState({
      clicked: true
    });
  }

  onClose = e => { // For closing the overlay
    this.setState({
      clicked: false
    });
  }

  render() {
    return <div>
      {
        // Conditional Logic for knowing whether the overlay i open or closed and consequently showing the relevant information
        (this.state.clicked === false)    
          ? (
            <div className="main-heading-section common-margin"> 
              <div className="center-image" >
                <img src={require("../../img/centerimage.png")} alt="" />
                <div className="heading-title">Epoch Elder Care</div>
              </div>
              <GlobalAlertsData alerts={this.state.overlay} overlay="closed" />
              <div className="dropdown-overlay" id="show_alerts_drop_down">
                <img src={require("../../img/dropdowniconoverlay.png")} alt="" onClick={this.onClick} />
              </div>
            </div>
          )

          : (
            <div className="alerts-popup" id="alert_popups">
              <div className="main-heading-section common-margin alert-popup-label">
                <div className="heading-labels">
                  <GlobalAlertsData alerts={this.state.overlay} overlay="open" />
                </div>
                <div className="dropdown-overlay" id="close-icon" onClick={this.onClose}>
                  <img src={require("../../img/dropdowniconoverlay.png")} alt="" className="rotated-arrow" />
                </div>
              </div>
              <div className="alert-popup-section">
                <GlobalAlerts alerts={this.state.globalalerts} />  
              </div>
            </div>
          )
      }</div>
  };
};


// Function for displaying the Global Alerts Data for the entire facility
export function GlobalAlertsData(props) {

  let num = 0; // Variable for iterating through the styles of priorities for different types of alerts

  const alert = props.alerts.map((alert, keyValue) => {

    num++; // Incrementing the variable since the priority levels start at 1

    let divstyle = ("alert-number" + num + " alert-numbers"); // Variable to decide which style to assign the alert based on the priority of the alert being passed

    if (num == 1 && props.overlay == "closed") { divstyle = ("alert-number" + num + " alert-numbers"); }

    else if (num == 1 && props.overlay == "open") { divstyle = ("alert-number" + num + " alert-number"); }

    return (
      <div className="alerts" key={keyValue}>
        <img src={require("../../img/alert" + num + ".png")} alt="" />
        <div className={divstyle}>{alert}</div>
      </div>
    );
  }
  )
  return alert;
}

// Component for displaying all the alerts for the entire facility separately inside the overlay and also the relevant media
export class GlobalAlerts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alerts: this.props.alerts // Making a copy of the alerts object for the entire facility for data manipulation
    }
  }

  render() {
    return this.state.alerts.map((alert, keyValue) => {

      let divstyle = ("type-of-alert alert-number" + alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

      return (
        <div key={keyValue}>

          <div className="popup-card" id="alert_popups" >
            <div className="map-point">
              <img src={require("../../img/location" + alert.priority + ".png")} className="avatar" />
            </div>
            <div className={divstyle}>{alert.type}</div>
            <div className="alert-content-section">
              <div className="alert-content">
                <div className="pt-log pt-detail">
                  <img src={require("../../img/cardalert" + alert.priority + ".png")} className="avatar" />
                  <div className="side-text detail-1 side-text-padding">
                    <div className="pt-name list-header">{alert.resident}</div>
                    <div className="pt-suite-no gray-text list-subheader mr-t-5">{alert.currentlocation}</div>
                  </div>
                </div>
              </div>
              {
                (alert.media.video === "alert.mp4")   // Conditional logic for selecting whether the alert has attached video or audio
                  ? <MediaControl type={alert.priority} media="video"/>
                  : <MediaControl type={alert.priority} media="audio"/>
              }

            </div>

          </div>


        </div>
      )
    });
  }
}

// Component for Playing Media
export function MediaPlayer(props) {

  return (
    <div>
    {
      (props.media === "video")   // Conditional logic for selecting whether the alert has attached video or audio
        ? <video controls autoPlay src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4' />
        : <audio controls autoPlay src='http://www.nihilus.net/soundtracks/Static%20Memories.mp3' />
    }
    </div>

  );
}

// Component for the Media Dialog
export class MediaControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      width: 600,
      destroyOnClose: true,
      center: false,
      mousePosition: {},
      type: this.props.type,   // Variable for deciding the type of alert being passed to the Component for dynamic styling
      media: this.props.media  // Variable for deciding whether the props being passed is of type audio or video
    };
  }

  onClick = e => {
    this.setState({
      mousePosition: {
        x: e.pageX,
        y: e.pageY,
      },
      visible: true,
    });
  }

  onClose = e => {
    this.setState({
      visible: false,
    });
  }

  onDestroyOnCloseChange = e => {
    this.setState({
      destroyOnClose: e.target.checked,
    });
  }

  center = e => {
    this.setState({
      center: e.target.checked,
    });
  }

  render() {
    const style = {
      width: this.state.width,
    };

    let alertType = this.state.type; // Variable to decide which style to assign the alert based on the priority of the alert being passed

    let mediaType = this.state.media; // Variable to decide which style to assign the alert based on the type of media attached to the alert being passed

    let wrapClassName = '';
    if (this.state.center) {
      wrapClassName = 'center';
    }
    const dialog = (  //Contents of the dialog being displayed
      <Dialog
        visible={this.state.visible}
        wrapClassName={wrapClassName}
        animation="zoom"
        maskAnimation="fade"
        onClose={this.onClose}
        style={style}
        mousePosition={this.state.mousePosition}
        destroyOnClose={this.state.destroyOnClose}
      >
        {
          (mediaType === "video")   // Conditional logic for selecting whether the alert has attached video or audio
            ? <div><MediaPlayer media="video" /></div>
            : <div><MediaPlayer media="audio" /></div>
        }
        
      </Dialog>
    );
    return (
      <div style={{ width: '90%', margin: '0 auto' }}>
        <style>
          {`
            .center {
              display: flex;
              align-items: center;
              justify-content: center;
            }
            `}
        </style>
        <div className="dialogbutton">
          <img className="" src={require("../../img/" + mediaType + alertType + ".png")} onClick={this.onClick} />
        </div>
        {dialog}
      </div>
    );
  }
}