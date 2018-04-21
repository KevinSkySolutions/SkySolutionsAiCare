import React, { Component } from 'react';
import { MediaControl } from '../Common';
import { connect } from 'react-redux';

// Component for the expanding Overlay of the Dashboard Page and displaying the relevant information
export class Overlay extends Component {

    constructor(props) {
        super(props);

        console.log("Overlay constructor. Props below");
        console.log(props);

        this.state = {
            clicked:        false,
            overlay:       props.overlay,
            globalalerts:  props.globalalerts
        }
    }

    onClick = e => { // For displaying the overlay
        this.setState({
            clicked: true
        });
    }

    onClose = e => { // For closing the overlay
        this.setState({
            clicked: false
        });
    }

    render() {
        return <div>
            {
                // Conditional Logic for knowing whether the overlay i open or closed and consequently showing the relevant information
                (this.state.clicked === false)
                    ? (
                        <div className="main-heading-section common-margin" onClick={this.onClick} >
                            <div className="center-image" >
                                <img src={require("../../img/centerimage.png")} alt="" />
                                <div className="heading-title">Epoch Elder Care</div>
                            </div>
                            <div className="heading-labels">
                                <GlobalAlertsData alerts={this.state.overlay} overlay="open" />
                                <div className="dropdown-overlay" id="show_alerts_drop_down">
                                </div>
                            </div>

                        </div>
                    )

                    : (
                        <div className="alerts-popup" id="alert_popups">
                            <div className="main-heading-section common-margin ">
                                <div className="center-image" >
                                    <img src={require("../../img/centerimage.png")} alt="" />
                                    <div className="heading-title">Epoch Elder Care</div>
                                </div>
                                <div className="heading-labels">
                                    <GlobalAlertsData alerts={this.state.overlay} overlay="open" />
                                    <div className="dropdown-overlay" id="close-icon" onClick={this.onClose}>
                                        <img src={require("../../img/dropdowniconoverlay.png")} alt="" className="rotated-arrow" />
                                    </div>
                                </div>

                            </div>
                            <div className="alert-popup-section">
                                <GlobalAlerts alerts={this.state.globalalerts} />
                            </div>
                        </div>
                    )
            }</div>
    };
};

const mapStateToProps = (state) => {

    return {
        overlay:        state.overlaydata.summary,
        globalalerts:   state.dashboard.alertsdata
    };
};
export default connect(mapStateToProps)(Overlay);

// Function for displaying the Global Alerts Data for the entire facility
function GlobalAlertsData(props) {

    let num = 0; // Variable for iterating through the styles of priorities for different types of alerts

    const alert = props.alerts.map((alert, keyValue) => {

        num++; // Incrementing the variable since the priority levels start at 1

        let divstyle = ("alert-number" + num + " alert-numbers"); // Variable to decide which style to assign the alert based on the priority of the alert being passed

        if (num == 1 && props.overlay == "closed") { divstyle = ("alert-number" + num + " alert-numbers"); }

        else if (num == 1 && props.overlay == "open") { divstyle = ("alert-number" + num + " alert-number"); }

        return (
            <div className="alerts" key={keyValue}>
                <img src={require("../../img/alert" + num + ".png")} alt="" />
                <div className={divstyle}>{alert}</div>
            </div>
        );
    }
    )
    return alert;
}

// Component for displaying all the alerts for the entire facility separately inside the overlay and also the relevant media
class GlobalAlerts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            alerts: this.props.alerts // Making a copy of the alerts object for the entire facility for data manipulation
        }
    }

    render() {
        return this.state.alerts.map((alert, keyValue) => {

            let divstyle = ("type-of-alert alert-number" + alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

            return (
                <div key={keyValue}>

                    <div className="popup-card" id="alert_popups" >
                        <div className="map-point">
                            <img src={require("../../img/location" + alert.priority + ".png")} className="avatar" />
                        </div>
                        <div className={divstyle}>{alert.type}</div>
                        <div className="alert-content-section">
                            <div className="alert-content">
                                <div className="pt-log pt-detail">
                                    <img src={require("../../img/cardalert" + alert.priority + ".png")} className="avatar" />
                                    <div className="side-text detail-1 side-text-padding">
                                        <div className="pt-name list-header">{alert.resident}</div>
                                        <div className="pt-suite-no gray-text list-subheader mr-t-5">{alert.currentlocation}</div>
                                    </div>
                                </div>
                            </div>
                            {
                                (alert.media.video == undefined)   // Conditional logic for selecting whether the alert has attached video or audio
                                    ? ((alert.media.audio == undefined)   // Conditional logic for selecting whether the alert has attached video or audio
                                        ? <div></div>
                                        : <MediaControl type={alert.priority} media="audio" source={ alert.media.audio } />
                                    )
                                    : <MediaControl type={alert.priority} media="video" source={ alert.media.audio } />
                            }

                        </div>

                    </div>


                </div>
            )
        });
    }
}