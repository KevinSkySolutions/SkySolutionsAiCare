import React from 'react';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

// stateless functional component for use by Dashboard
export function AlertsList(props) {

  const alertsList = props.alerts.map((alert, keyValue) => { 

  	return(
    
	    <div className="description-mod " key={ keyValue }>
	      <div className="pt-log pt-detail">
	        <img src={ require("../../img/" + alert.icon + "_" + alert.color + ".png") } className="avatar" />
	        <div className="side-text detail-1">
	          <div className="pt-name list-header">{ alert.resident }</div>
	          <div className="pt-suite-no gray-text list-subheader mr-t-5">{ alert.currentlocation }</div>
	        </div>
	      </div>
	      <div className="pt-log pt-loc">
	        <div className="side-text detail-2">
            <div className="pt-condition list-header">{ alert.type }</div>
            <div className="curr-location gray-text list-subheader mr-t-5">@{ alert.location.room }</div>
          </div>
	    </div>
	    
        <div className="pt-log pt-stat">
          <div>
            <div className="help-stat list-header">
              { alert.status }
            </div>
            <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{ alert.time } min ago</div>
          </div>
          <div className="drop-down down">
            <div className="dropdown-arrow-dwn" ></div>
          </div>
          <div className="drop-down up">
            <div className="dropdown-arrow-up"></div>
          </div>
        </div>
        <div className="list-detail">
          <div className="call-status iBlock-wrap line-wrap">
            <div className="dot iBlock red"></div>
            <div className="status iBlock list-header">SOS&nbsp;&nbsp;&nbsp;|</div>
            <div className="time iBlock list-subheader">03/19/2018 11:30 AM</div>
          </div>
          <div className="help-status iBlock-wrap line-wrap">
            <div className="dot iBlock green"></div>
            <div className="status iBlock list-header">Help Dispatched&nbsp;&nbsp;&nbsp;|</div>
            <div className="time iBlock list-subheader">03/19/2018 11:30 AM</div>
          </div>
          <div className="help-status iBlock-wrap line-wrap">
            <div className="dot iBlock orange"></div>
            <div className="status iBlock list-header">Help Active&nbsp;&nbsp;&nbsp;|</div>
            <div className="time iBlock list-subheader">03/19/2018 11:30 AM</div>
          </div>
        </div>
	    </div>
  )});

  return alertsList

}

export function ResidentsOnMap(props) {
  console.log("Props of ResidentsOnMap:");
  console.log(props);

  return props.alerts.map((alert, keyValue) => { 

    var divStyle = {
      color: 'white',
      top: (alert.location.xpercent)*4.2+'px',
      left: (alert.location.ypercent)*4.2+'px'
    };

    return(
      <img key={ keyValue } style={divStyle} className="person-on-map" src={ require("../../img/" + alert.icon + "_" + alert.color + ".png") }/>
    )
  })

}

