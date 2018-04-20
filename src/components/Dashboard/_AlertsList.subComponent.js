import React, { Component } from 'react';
import { connect } from 'react-redux';
import { MediaControl } from '../Common';

// Component for the right hand side section of the Dashbord for displaying the relevant floor alerts
export class AlertsList extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts: props.alerts, // Making a copy of the alerts object for the entire facility for data manipulation
        }
    }

    componentWillReceiveProps(newProps) {  // Updating the state on receiving the new props after selecting a different floor
        
        console.log("AlertsList inside componentWillReceiveProps");
        console.log(newProps);

        this.setState({
            alerts: newProps.alerts
        });
    }

    render() {
        return this.state.alerts.map((alert, keyValue) => {  // Mapping all the relevant floor alerts on the right section of the page
            return (
                <div key={keyValue}>
                    <AlertItem2 alert={alert} />
                </div>
            )
        })
    }
}
const mapStateToProps = (state) => {

    return {
        alerts:     state.floorsdata.selection.alerts
    };
};
export default connect(mapStateToProps)(AlertsList);

function AlertItem2(props) {

    // TODO, conditional styling boxStyle based on reducer
    let boxStyle = 'description-mod';  // Variable for deciding the style of the expanded or collapsed Alert
    let divstyle = ("type-of-alert alert-number" + props.alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

    let onClick = () => {
        console.log("clicked");
    };

    return (
        <div className={boxStyle} onClick={onClick}>
            <div className={divstyle}>{props.alert.type}</div>
            <div className="alert-content-section">
                <div className="alert-content">
                    <div className="pt-log pt-detail">
                        <img src={require("../../img/cardalert" + props.alert.priority + ".png")} className="avatar" />
                        <div className="side-text detail-1 side-text-padding">
                            <div className="pt-name list-header">{props.alert.resident}</div>
                            <div className="pt-suite-no gray-text list-subheader mr-t-5">{props.alert.currentlocation}</div>
                        </div>
                    </div>

                    <div className="pt-log pt-stat pt-stat-text">
                        <div>
                            <div className="help-stat list-header">
                                {props.alert.description}
                            </div>
                            <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{props.alert.time} min ago</div>
                        </div>
                    </div>
                </div>
                <div className="alert-media">
                    {
                        (props.alert.media.video === "alert.mp4")   // Conditional logic for selecting whether the alert has attached video or audio
                            ? <MediaControl type={props.alert.priority} media="video" />
                            : <MediaControl type={props.alert.priority} media="audio" />
                    }
                </div>
            </div>

            <AlertHistory alerts={props.alert.history} />
        </div>
    )
}

// Component for isolating each element of the Alerts List
// class AlertItem extends Component {

//     constructor(props) {
//         super(props);
//         this.state = {
//             alert: this.props.alert,  // Making a copy of the alerts object for the entire facility for data manipulation
//             style: "description-mod", // Variable for Setting the style onClick so that it expands and collapses
//             isClicked: false          // Variable for keeping tracking whether an item has been clicked or not
//         }
//     }

//     componentWillReceiveProps() {  // Updating the state on receiving the new props after selecting a different floor
//         this.setState({
//             alert: this.props.alert
//         });
//     }

//     onClick = e => {  // Function for changing the state and expanding or collapsing the Alert
//         if (this.state.isClicked === false) {  // If the Alert is expanded then contract
//             this.setState({
//                 style: "description-mod",
//                 isClicked: true
//             });
//         }

//         else if (this.state.isClicked === true) { // If the Alert is collapsed then expand
//             this.setState({
//                 style: "description-mod-active",
//                 isClicked: false
//             });
//         }
//     }

//     render() {

//         let boxStyle = this.state.style;  // Variable for deciding the style of the expanded or collapsed Alert

//         let divstyle = ("type-of-alert alert-number" + this.state.alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

//         return (
//             <div className={boxStyle} onClick={this.onClick}>
//                 <div className={divstyle}>{this.state.alert.type}</div>
//                 <div className="alert-content-section">
//                     <div className="alert-content">
//                         <div className="pt-log pt-detail">
//                             <img src={require("../../img/cardalert" + this.state.alert.priority + ".png")} className="avatar" />
//                             <div className="side-text detail-1 side-text-padding">
//                                 <div className="pt-name list-header">{this.state.alert.resident}</div>
//                                 <div className="pt-suite-no gray-text list-subheader mr-t-5">{this.state.alert.currentlocation}</div>
//                             </div>
//                         </div>

//                         <div className="pt-log pt-stat pt-stat-text">
//                             <div>
//                                 <div className="help-stat list-header">
//                                     {this.state.alert.description}
//                                 </div>
//                                 <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{this.state.alert.time} min ago</div>
//                             </div>
//                         </div>
//                     </div>
//                     <div className="alert-media">
//                         {
//                             (this.state.alert.media.video === "alert.mp4")   // Conditional logic for selecting whether the alert has attached video or audio
//                                 ? <MediaControl type={this.state.alert.priority} media="video" />
//                                 : <MediaControl type={this.state.alert.priority} media="audio" />
//                         }
//                     </div>
//                 </div>

//                 <AlertHistory alerts={this.state.alert.history} />
//             </div>
//         )
//     }
// }


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