import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertsdataActions } from '../../actions';
import { bindActionCreators } from 'redux';
import FloorItem from './_FloorItem.subComponent'

class FloorMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alerts: props.alerts,
      isClicked: false,

    };
    console.log(this.state.alerts);
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      alerts: newProps.alerts
    });
  }

  render() {

  let items = this.state.alerts.alerts.map((alert, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
                
      return (
       <FloorItem key={keyValue} keyCopy={keyValue} alert={alert} selection={this.state.alerts.selectedalert}/>   
      )
    })


   return (

     <div className="floor-image">
        <img src={require("../../img/floorplan" + ((this.state.alerts.floor == undefined) ? "1" : this.state.alerts.floor) + ".jpg")} alt="" className="floor-map" />
          {items}    
      </div>
   );
    
      
  }
}

function mapDispatchToProps(dispatch) {

    let ac_setAlertExpansion = alertsdataActions.setAlertExpansion;
    let ac_resetAlertExpansion = alertsdataActions.resetAlertExpansion;
    return {
        ...bindActionCreators({
            setAlertExpansion:      ac_setAlertExpansion,
            resetAlertExpansion:    ac_resetAlertExpansion
        }, 
        dispatch)
    }
}
export default connect(null, mapDispatchToProps)(FloorMap);