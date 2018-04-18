import React, { Component } from 'react';
import Dialog from 'rc-dialog';
import ReactDOM from 'react-dom';
import { floorsdataActions } from '../../actions';
import { connect } from 'react-redux';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

//Function for adding the history of alerts of a patient to the AlertsList Section
export function AlertHistory(props) {

  return props.alerts.map((alert, keyValue) => {
    <div className="list-detail" key={keyValue}>
      <div className="call-status iBlock-wrap line-wrap">
        <div className="dot iBlock danger"></div>
        <div className="status iBlock list-header">{alert.type}&nbsp;&nbsp;&nbsp;|</div>
        <div className="time iBlock list-subheader">{alert.timestamp}</div>
      </div>
    </div>

  });
}

//Function for adding the alerts to the left hand section of the Dashboard i.e adding alert icons to the floormap
export function ResidentsOnMap(props) {

  let alerts = props.alerts.alerts;

  return alerts.map((alert, keyValue) => {

    var divStyle = {
      color: 'white',
      top: (alert.location.xpercent) * 4.2 + 'px',
      left: (alert.location.ypercent) * 4.2 + 'px'
    };

    return (
      <img key={keyValue} style={divStyle} className="person-on-map" src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
    )
  })
}

//Component for the expanding Overlay of the Dashboard Page and displaying the relevant information
export class Overlay extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      overlay: props.overlay,
      globalalerts: props.alerts
    }
  }

  onClick = e => {
    this.setState({
      clicked: true
    });
  }

  onClose = e => {
    this.setState({
      clicked: false
    });
  }

  render() {
    return <div>
      {
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


//Function for displaying the Global Alerts Data for the entire facility
export function GlobalAlertsData(props) {

  var num = 0;

  const alert = props.alerts.map((alert, keyValue) => {

    num++;

    var divstyle = ("alert-number" + num + " alert-numbers");

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

//Component for displaying all the alerts for the entire facility separately inside the overlay and also the relevant media
export class GlobalAlerts extends Component {

  constructor(props) {
    super(props);
    this.state = {
      alerts: this.props.alerts
    }
  }

  render() {
    return this.state.alerts.map((alert, keyValue) => {

      let divstyle = ("type-of-alert alert-number" + alert.priority);

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
                (alert.media.video === "alert.mp4")
                  ? <VideoControl type={alert.priority} />
                  : <AudioControl type={alert.priority} />
              }

            </div>

          </div>


        </div>
      )
    });
  }
}

//Videoplayer
export function SocialVideo(props) {

  return (
    <div>
      <video controls autoPlay src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4' />
    </div>
  );
}

//Audioplayer
export function SocialAudio(props) {

  return (
    <div>
      <audio controls autoPlay src='http://www.nihilus.net/soundtracks/Static%20Memories.mp3' />
    </div>
  );
}

//Component for Audio dialog
export class AudioControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      width: 600,
      destroyOnClose: false,
      center: false,
      mousePosition: {},
      type: this.props.type
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

  changeWidth = () => {
    this.setState({
      width: this.state.width === 600 ? 800 : 600,
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

    let audiotype = this.state.type;

    let wrapClassName = '';
    if (this.state.center) {
      wrapClassName = 'center';
    }
    const dialog = (
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
        <div><SocialAudio /></div>
      </Dialog>
    );
    return (
      <div style={{ width: '90%', margin: '0 auto' }}>
        <style>
          {`
            .center {
              display: block;
              align-items: right;
              justify-content: right;
            }
            `}
        </style>
        <div className="dialogbutton">
          <img className="" src={require("../../img/audio" + audiotype + ".png")} onClick={this.onClick} />
        </div>
        {dialog}
      </div>
    );
  }
}

//Component for video Dialog
export class VideoControl extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      width: 600,
      destroyOnClose: false,
      center: false,
      mousePosition: {},
      type: this.props.type
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

  changeWidth = () => {
    this.setState({
      width: this.state.width === 600 ? 800 : 600,
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

    let videotype = this.state.type;

    let wrapClassName = '';
    if (this.state.center) {
      wrapClassName = 'center';
    }
    const dialog = (
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
        <div><SocialVideo /></div>
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
          <img className="" src={require("../../img/video" + videotype + ".png")} onClick={this.onClick} />
        </div>
        {dialog}
      </div>
    );
  }
}