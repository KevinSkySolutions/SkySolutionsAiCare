import React, { Component } from 'react';

import Dialog from 'rc-dialog';

import ReactDOM from 'react-dom';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

// stateless functional component for use by Dashboard
export function AlertsList(props) {
 
  let alerts = props.alerts.alerts;

  const alertsList = alerts.map((alert, keyValue) => { 

    var divstyle = ("type-of-alert alert-number" + alert.priority);

    return(

      <div className="description-mod">

        <div className={divstyle}>{alert.type}</div>
        <div className="alert-content-section">
          <div className="alert-content">
            <div className="pt-log pt-detail">
              <img src={require("../../img/cardalert" + alert.priority + ".png")} className="avatar"/>
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
        </div>
        <AlertHistory alerts={alert.history}/>
      </div>

  )});

  return alertsList

}

export function AlertHistory(props) {

  return props.alerts.map((alert, keyValue) => {
    <div className="list-detail">
      <div className="call-status iBlock-wrap line-wrap">
          <div className="dot iBlock danger"></div>
          <div className="status iBlock list-header">{alert.type}&nbsp;&nbsp;&nbsp;|</div>
          <div className="time iBlock list-subheader">{alert.timestamp}</div>
      </div>
    </div>

  });
}

export function ResidentsOnMap(props) {

  let alerts = props.alerts.alerts;

  return alerts.map((alert, keyValue) => { 

    var divStyle = {
      color: 'white',
      top: (alert.location.xpercent)*4.2+'px',
      left: (alert.location.ypercent)*4.2+'px'
    };

    return(
      <img key={ keyValue } style={divStyle} className="person-on-map" src={ require("../../img/alertpositionpointer" + alert.priority + ".png") }/>
    )
  })
}

export  const OverlayAlerts = () => (
    <div className="heading-labels">
      <div className="alerts">
        <img src={require("../../img/alert2.png")} alt=""/>
        <div className="alert-number2 alert-number">02</div>
      </div>
      <div className="alerts">
        <img src={require("../../img/alert4.png")} alt=""/>
        <div className="alert-number4 alert-numbers">02</div>
      </div>
      <div className="alerts">
        <img src={require("../../img/alert1.png")} alt=""/>
        <div className="alert-number1 alert-numbers">03</div>
      </div>
      <div className="alerts">
        <img src={require("../../img/alert5.png")} alt=""/>
        <div className="alert-number5 alert-numbers">04</div>
      </div>
      <div className="alerts">
        <img src={require("../../img/alert3.png")} alt=""/>
        <div className="alert-number3 alert-numbers">01</div>
      </div>
      <div className="dropdown-overlay" id="show_alerts_drop_down">
        <img src={require("../../img/dropdowniconoverlay.png")} alt=""/>
      </div>
    </div>
);



export function Floors (props) {
    
  return props.floors.map((floor, keyValue) => { 
    if (floor.floor == props.defaultfloor) {
      return (
        <div className="page active">{props.defaultfloor}</div>
      );  
    }

    else {
        return(
        <div>
          <div className="page">{floor.floor}</div>
          
          
        </div>
      );
    }    
  })
    
}

export function GlobalAlertsData (props) {
  
  var num=0;

  console.log('GLOBALDATA:');
  console.log(props.alerts);


  const alert =  props.alerts.map((alert, keyValue) => { 

    num++;

    var divstyle = ("alert-number" + num + " alert-numbers");

    if (num==1) {divstyle = ("alert-number" + num + " alert-number");}
    
    return  (
        <div className="alerts">
          <img src={require("../../img/alert" + num + ".png")} alt=""/>
          <div className={divstyle}>{alert}</div>
        </div>
      );   
    }
  )
  return alert;
}

export class GlobalAlerts extends Component {

  constructor(props) {
    super(props);
    this.state = {
            isDialogOpen: false
        }
  }

  render() {
    return (
      <div>

    <div className="alert-popup-section">
      <div className="popup-card" id="alert_popups">
        <div className="map-point">
          <img src={require("../../img/locationoyellow.png")} className="avatar"/>
        </div>
        <div className="type-of-alert alert-number-different">WAKING UP ALERT</div>
        <div className="alert-content-section">
          <div className="alert-content">
            <div className="pt-log pt-detail">
              <img src={require("../../img/cardalert5.png")} className="avatar"/>
              <div className="side-text detail-1 side-text-padding">
                <div className="pt-name list-header">Richard Branson</div>
                <div className="pt-suite-no gray-text list-subheader mr-t-5">Suite #101</div>
              </div>
            </div>
          </div>

          <VideoControl/>
        </div>
        
      </div>
      <div className="popup-card">
        <div className="map-point">
          <img src={require("../../img/locationblue.png")} className="avatar"/>
        </div>
        <div className="type-of-alert alert-number4">MISSING</div>
        <div className="alert-content-section">
          <div className="alert-content">
            <div className="pt-log pt-detail">
              <img src={require("../../img/cardalert4.png")} className="avatar"/>
              <div className="side-text detail-1 side-text-padding">
                <div className="pt-name list-header">Scott Barnes</div>
                <div className="pt-suite-no gray-text list-subheader mr-t-5">Suite #201</div>
              </div>
            </div>
           </div>

           <AudioControl/>
          
        </div>
        
      </div>
      <div className="popup-card">
        <div className="map-point">
          <img src={require("../../img/locationblue.png")} className="avatar"/>
        </div>
        <div className="type-of-alert alert-number4">MISSING</div>
        <div className="alert-content-section">
          <div className="alert-content">
            <div className="pt-log pt-detail">
              <img src={require("../../img/cardalert4.png")} className="avatar"/>
              <div className="side-text detail-1 side-text-padding">
                <div className="pt-name list-header">Scott Barnes</div>
                <div className="pt-suite-no gray-text list-subheader mr-t-5">Suite #201</div>
              </div>
            </div>
          </div>

          <div>
              <img className="" src={require("../../img/audioblue.png")} />
          </div>
        </div>
        
      </div>
      <div className="popup-card">
        <div className="map-point">
          <img src={require("../../img/locationblue.png")} className="avatar"/>
        </div>
        <div className="type-of-alert alert-number4">MISSING</div>
        <div className="alert-content-section">
          <div className="alert-content">
            <div className="pt-log pt-detail">
              <img src={require("../../img/cardalert4.png")} className="avatar"/>
              <div className="side-text detail-1 side-text-padding">
                <div className="pt-name list-header">Scott Barnes</div>
                <div className="pt-suite-no gray-text list-subheader mr-t-5">Suite #201</div>
              </div>
            </div>
          </div>

          <div>
              <img className="" src={require("../../img/audioblue.png")} />
          </div>
        </div>
        
      </div>
    </div>
  </div>
    );
  }
}

export class SocialVideo extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <video controls autoPlay src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4' />
      </div>
    );
  }
}

export class SocialAudio extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <audio controls autoPlay src='http://www.nihilus.net/soundtracks/Static%20Memories.mp3' />
      </div>
    );
  }
}

export class AudioControl extends Component {
  state = {
    visible: false,
    width: 600,
    destroyOnClose: false,
    center: false,
    mousePosition: {},
  };

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
    // console.log(e);
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
        <div><SocialAudio/></div>
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
              <img className="" src={require("../../img/audioblue.png")} onClick={this.onClick}/>
        </div>
        {dialog}
      </div>
    );
  }
}

export class VideoControl extends Component {
  state = {
    visible: false,
    width: 600,
    destroyOnClose: false,
    center: false,
    mousePosition: {},
  };

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
    // console.log(e);
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
        <div><SocialVideo/></div>
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
              <img className="" src={require("../../img/videoyellow.png")} onClick={this.onClick}/>
        </div>
        {dialog}
      </div>
    );
  }
}