import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertsdataActions } from '../../actions';
import { bindActionCreators } from 'redux';

class FloorItem extends Component {

  constructor(props) {
    super(props);

    this.state = {
      alert: props.alert,
      isClicked: false,
      selection: props.selection,
      indexKey: props.keyCopy
    };
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      alert: newProps.alert,
      selection: newProps.selection,
      indexKey: newProps.keyCopy
    });
    this.forceUpdate();
  }

  onFocus = e => {  // Function for changing the state and expanding or collapsing the Alert

      if (this.state.isClicked === false) {  // If the Alert is collapsed then expand
          this.props.setAlertExpansion(this.state.indexKey);
      }

      else { // If the Alert is expanded then collapse
          this.props.resetAlertExpansion();
      }
      
  }

  render() {
    let alert = this.state.alert; // Making a copy of the alerts object for the relevant floor for data manipulation
   

      // Variable to decide which style to assign the alert based on the priority of the alert being passed
      let divStyle = {
        color: 'white',
        top: (alert.location.xpercent) * 4.2 + 'px',
        left: (alert.location.ypercent) * 4.2 + 'px'
      };

      return (
        <div onClick={this.onFocus}>
          
          {
           	(this.state.selection == this.state.indexKey)
              ?
              (alert.isnew!=undefined && alert.isnew!=false)
                ? 
                  <div>
                    <img style={divStyle} className={ "person-on-map-selected" } src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
                    <img style={divStyle} className={ "person-on-map-selected person-on-map-blink" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
                :
                  <div>
                    
                    <img style={divStyle} className={ "person-on-map-selected" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
              :
              (alert.isnew!=undefined && alert.isnew!=false)
                ?
                  <div>
                    <img style={divStyle} className={ "person-on-map" } src={require("../../img/alertpositionpointer" + alert.priority + ".png")} />
                    <img style={divStyle} className={ "person-on-map person-on-map-blink" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
                :
                  <div>
                    
                    <img style={divStyle} className={ "person-on-map" } src={require("../../img/cardalert" + alert.priority + ".png")} />
                  </div>
                
          }
          
        </div>
      );
      
  };

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
export default connect(null, mapDispatchToProps)(FloorItem);