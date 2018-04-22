import React from 'react';

// Function for adding the alerts to the left hand section of the Dashboard i.e adding alert icons to the floormap
export default function FloorMap(props) {

  let alerts = props.alerts.alerts; // Making a copy of the alerts object for the relevant floor for data manipulation
  let selection = props.alerts.selectedalert;
  let items = alerts.map((alert, keyValue) => {

    // Variable to decide which style to assign the alert based on the priority of the alert being passed
    let divStyle = {
      color: 'white',
      top: (alert.location.xpercent) * 4.2 + 'px',
      left: (alert.location.ypercent) * 4.2 + 'px'
    };

    return (
      <div key={keyValue} >
        {
          (selection == keyValue)
          ?
          <img style={divStyle} className="person-on-map-selected" src={require("../../img/cardalert" + alert.priority + ".png")} />
          :
          <img style={divStyle} className="person-on-map" src={require("../../img/cardalert" + alert.priority + ".png")} />
        }        
      </div>
    )
  });

  return (
    <div className="floor-image">
      <img src={require("../../img/floorplan" + ((alerts.floor == undefined) ? "1" : alerts.floor) + ".png")} alt="" className="floor-map" />
      {items}
    </div>);

}