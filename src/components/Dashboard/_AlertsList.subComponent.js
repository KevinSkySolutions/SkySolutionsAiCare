import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MediaControl } from '../Common';
import { alertsdataActions } from '../../actions';
import { bindActionCreators } from 'redux';

// Component for the right hand side section of the Dashbord for displaying the relevant floor alerts
export class AlertsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts:             props.alerts,           // Making a copy of the alerts object for the entire facility for data manipulation
            currentfloor:       props.currentfloor,     // global indicator for current floor being viewed
            currentselection:   props.currentselection  // global indicator for current alert being viewed
        }
    }

    componentWillReceiveProps(newProps) {  // Updating the state on receiving the new props after selecting a different floor

        this.setState({
            alerts:             newProps.alerts, 
            currentfloor:       newProps.currentfloor,
            currentselection:   newProps.currentselection
        });
    }

    render() {
        return this.state.alerts.map((alert, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
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
        alerts:             state.floorsdata.selection.alerts,
        currentfloor:       state.floorsdata.selection.floor,
        currentselection:   state.floorsdata.selection.selectedalert
    };
};
export default connect(mapStateToProps)(AlertsList);

//Component for isolating each element of the Alerts List
class AlertItem extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alert:          props.alert,        // Making a copy of the alerts object for the entire facility for data manipulation
            indexKey:       props.keyCopy,
            style:          "description-mod", // Variable for Setting the style onClick so that it expands and collapses
            isClicked:      false          // Variable for keeping tracking whether an item has been clicked or not
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            alert:          newProps.alert
        });
    }

    onClick = e => {  // Function for changing the state and expanding or collapsing the Alert

        this.props.dispatch(alertsdataActions.viewAlertDetails());

        if (this.state.isClicked === false) {  // If the Alert is expanded then contract
            this.setState({
                style: "description-mod-active",
                isClicked: true
            });
        }

        else { // If the Alert is collapsed then expand
            this.setState({
                style: "description-mod",
                isClicked: false
            });
        }
    }

    render() {

        let boxStyle = this.state.style;  // Variable for deciding the style of the expanded or collapsed Alert
        let divstyle = ("type-of-alert alert-number" + this.state.alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

        return (
            <div className={boxStyle} onClick={this.onClick}>
                <div className={divstyle}>{this.state.alert.type}</div>
                <div className="alert-content-section">
                    <div className="alert-content">
                        <div className="pt-log pt-detail">
                            <img src={require("../../img/cardalert" + this.state.alert.priority + ".png")} className="avatar" />
                            <div className="side-text detail-1 side-text-padding">
                                <div className="pt-name list-header">{this.state.alert.resident}</div>
                                <div className="pt-suite-no gray-text list-subheader mr-t-5">{this.state.alert.currentlocation}</div>
                            </div>
                        </div>

                        <div className="pt-log pt-stat pt-stat-text">
                            <div>
                                <div className="help-stat list-header">
                                    {this.state.alert.description}
                                </div>
                                <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{this.state.alert.time} min ago</div>
                            </div>
                        </div>
                    </div>
                    <div className="alert-media">
                        {
                            (this.state.alert.media.video === "alert.mp4")   // Conditional logic for selecting whether the alert has attached video or audio
                                ? <MediaControl type={this.state.alert.priority} media="video" />
                                : <MediaControl type={this.state.alert.priority} media="audio" />
                        }
                    </div>
                </div>

                <AlertHistory alerts={this.state.alert.history} />
            </div>
        )
    }
}

connect()(AlertItem);


// Function for adding the history of alerts of a patient to the AlertsList Section
function AlertHistory(props) {

    return props.alerts.map((alert, keyValue) => {
  
      let divstyle = "dot iBlock type" + alert.priority; // Variable to decide which style to assign the alert based on the priority of the alert being passed
  
      return (
        <div className="list-detail" key={keyValue}>
          <div className="call-status iBlock-wrap line-wrap">
            <div className={divstyle}></div>
            <div className="status iBlock list-header">{alert.type}&nbsp;&nbsp;&nbsp;|</div>
            <div className="time iBlock list-subheader">{alert.timestamp}</div>
          </div>
        </div>
        )
    });
  }