import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MediaControl } from '../Common';
import { alertsdataActions } from '../../actions';
import { bindActionCreators } from 'redux';

//Component for isolating each element of the Alerts List
class AlertItem extends Component {

    constructor(props) {
        super(props);
        let styleToApply = props.isExpanded ? "description-mod-active" : "description-mod";
        if (props.alert.isnew) {
            styleToApply += " glowanimationstyle";
        }

        this.state = {
            alert:          props.alert,        // Making a copy of the alerts object for the entire facility for data manipulation
            indexKey:       props.keyCopy,
            isClicked:      props.isExpanded,   // Variable for keeping tracking whether an item has been clicked or not
            style:          styleToApply        // Variable for Setting the style onClick so that it expands and collapses
        }
    }

    componentWillReceiveProps(newProps) {

        let newStyleToApply = ((newProps.isExpanded==undefined)||(newProps.isExpanded==false)) ? "description-mod" : "description-mod-active";
        if (newProps.alert.isnew) {
            newStyleToApply += " glowanimationstyle";
        }
        this.setState({
            alert:          newProps.alert,
            indexKey:       (newProps.keyCopy==undefined? 0 : newProps.keyCopy),
            isClicked:      (newProps.isExpanded==undefined? false: newProps.isExpanded),
            style:          newStyleToApply
        });
    }

    onClick = e => {  // Function for changing the state and expanding or collapsing the Alert

        if (this.state.isClicked === false) {  // If the Alert is collapsed then expand
            this.props.setAlertExpansion(this.state.indexKey);
        }

        else { // If the Alert is expanded then collapse
            this.props.resetAlertExpansion();
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
                            (this.state.alert.media.video == undefined)   // Conditional logic for selecting whether the alert has attached video or audio
                                ? ((this.state.alert.media.audio == undefined)   // Conditional logic for selecting whether the alert has attached video or audio
                                    ? <div></div>
                                    : <MediaControl type={this.state.alert.priority} media="audio" source={ this.state.alert.media.audio } isnew={ this.state.alert.isnew==undefined? false: true } />
                                )
                                : <MediaControl type={this.state.alert.priority} media="video" source={ this.state.alert.media.video } isnew={ this.state.alert.isnew==undefined? false: true } />
                        }
                    </div>
                </div>

                <AlertHistory alerts={this.state.alert.history} />
            </div>
        )
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
export default connect(null, mapDispatchToProps)(AlertItem);


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