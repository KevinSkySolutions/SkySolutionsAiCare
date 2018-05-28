import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertsdataActions } from '../../actions';
import { bindActionCreators } from 'redux';
import FloorItem from './_FloorItem.subComponent'

class FloorMap extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alerts: props.flooralerts,
      isClicked: false,
      residents: props.residentsdata,
      floorplan: props.floorplan
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      alerts: newProps.flooralerts,
      residents: newProps.residentsdata,
      floorplan: newProps.floorplan
    });
    this.forceUpdate();
  }

  render() {

  let resident_object = { floor: undefined, residents: []}  

  resident_object.floor = this.state.alerts.floor;  
  resident_object.residents = []; // re initialize
  for (var i = 0; i < this.state.residents.length; i++) {
      if (this.state.residents[i].floor == resident_object.floor) {
          resident_object.residents.push(this.state.residents[i]);
      }
  };

  let floorplan_image ="";

  for (var i = 0; i < this.state.floorplan.length; i++) {
      if (this.state.floorplan[0].image.content !== undefined) {
          floorplan_image = "data:image/jpeg;base64," + this.state.floorplan[0].image.content;
      }
  };   

  let alertsCopy = this.state.alerts;
  
  let items = alertsCopy.alerts.map((alert, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
                
      return (
       <FloorItem key={keyValue} keyCopy={keyValue} alert={alert} selection={alertsCopy.selectedalert}/>   
      )
    })

  let residents = resident_object.residents.map((resident, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
                
      return (
       <ResidentItem key={keyValue} resident={resident}/>   
      )
    })

   return (

     <div className="floor-image">
        <img src={floorplan_image} alt="" className="floor-map" />
          {items}
          {residents}    
      </div>
   );
    
      
  }
}

const mapStateToProps = (state) => {

    return {
      flooralerts:  state.floorsdata.selection,        //Getting the count for the total alerts in the facility
      residentsdata: state.dashboard.residentsdata,
      floorplan: state.dashboard.floorAPIdata
    };
};

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
export default connect(mapStateToProps, mapDispatchToProps)(FloorMap);


class ResidentItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      resident: props.resident

    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      resident: newProps.resident
    });

    this.forceUpdate();
  }


  render() {
    let resident = this.state.resident; // Making a copy of the residents object for the relevant floor for data manipulation
   

      // Variable to decide which style to assign the resident based on the priority of the resident being passed
      let divStyle = {
        color: 'white',
        top: (resident.location.xpercent) * 4.2 + 'px',
        left: (resident.location.ypercent) * 4.2 + 'px'
      };

      let tipStyle = {
        top: (resident.location.xpercent) * 4.2 + 'px',
        left: (((resident.location.ypercent) * 4.2) - 100) + 'px'
      };

      return (
        <div className="tooltip1">
          <img style={divStyle} className={ "person-on-map" } src={require("../../img/person1.png")} />
          <span className="tooltiptext" style={tipStyle}>Resident:<br/><i>{resident.name}</i></span>
        </div>
      );
      
  };

}