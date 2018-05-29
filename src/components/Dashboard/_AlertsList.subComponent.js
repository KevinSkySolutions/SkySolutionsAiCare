import React, { Component } from 'react';
import { connect } from 'react-redux';
import { alertsdataActions } from '../../actions';
import { bindActionCreators } from 'redux';
import AlertItem from './_AlertItem.subComponent';

// Component for the right hand side section of the Dashbord for displaying the relevant floor alerts
export class AlertsList extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alerts:             props.alerts,           // Making a copy of the alerts object for the entire facility for data manipulation
            currentfloor:       props.currentfloor,     // global indicator for current floor being viewed
            currentalert:       props.currentalert,     // global indicator for current key being expanded
            currentselection:   props.currentselection,  // global indicator for current alert being viewed
            sensoralerts:       props.sensoralerts
        }
    }

    componentWillReceiveProps(newProps) {  // Updating the state on receiving the new props after selecting a different floor

        this.setState({
            alerts:             newProps.alerts, 
            currentfloor:       newProps.currentfloor,
            currentalert:       newProps.currentalert,
            currentselection:   newProps.currentselection,
            sensoralerts:       newProps.sensoralerts
        });
        this.forceUpdate();
    }

    render() {

        return this.state.sensoralerts.map((alert, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
            return (
                <AlertItem 
                key={keyValue} keyCopy={keyValue} alert={alert} 
                isExpanded={this.state.currentselection==keyValue} />
            )
        })
    }
}
const mapStateToProps = (state) => {

    let expansionStatus = false;


    return {
        alerts:             state.dashboard.selection.alerts,
        currentfloor:       state.dashboard.selection.floor,
        currentalert:       state.dashboard.selection.selectedalert,
        currentselection:   state.dashboard.selection.selectedalert,
        sensoralerts:    state.dashboard.sensoralertdata
    };
};
export default connect(mapStateToProps)(AlertsList);