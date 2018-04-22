import React, { Component } from 'react';

export default class FloorMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alerts: props.alerts
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      alerts: newProps.alerts
    });
  }

  render() {
    let alerts = this.state.alerts.alerts; // Making a copy of the alerts object for the relevant floor for data manipulation
    let selection = this.state.alerts.selectedalert;
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
              (alert.isnew!=undefined)
                ? 
                  <div>
                    <img style={divStyle} className={ "person-on-map-selected" } src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
                    <img style={divStyle} className={ "person-on-map-selected person-on-map-blink" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
                :
                  <div>
                    <img style={divStyle} className={ "person-on-map-selected" } src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
                    <img style={divStyle} className={ "person-on-map-selected" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
              :
              (alert.isnew!=undefined)
                ?
                  <div>
                    <img style={divStyle} className={ "person-on-map" } src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
                    <img style={divStyle} className={ "person-on-map person-on-map-blink" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
                :
                  <div>
                    <img style={divStyle} className={ "person-on-map" } src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
                    <img style={divStyle} className={ "person-on-map" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
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
}