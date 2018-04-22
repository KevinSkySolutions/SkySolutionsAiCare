import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { overlaydataActions } from '../../../actions';

import OverlayAllAlerts from './_OverlayAllAlerts.subComponent';

// Component for the expanding Overlay of the Dashboard Page and displaying the relevant information
export class Overlay extends Component {

    constructor(props) {
        super(props);

        this.state = {
            clicked: props.clicked,
            overlay: props.overlay
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            clicked: newProps.clicked,
            overlay: newProps.overlay
        });
    }

    onClick = e => { // For displaying the overlay
        this.props.setOverlayExpansion();
    }

    onClose = e => { // For closing the overlay
        this.props.resetOverlayExpansion();
    }

    render() {
        return <div>
            {
                // Conditional Logic for knowing whether the overlay i open or closed and consequently showing the relevant information
                (this.state.clicked === false)
                    ? (
                        <div className="main-heading-section common-margin" onClick={this.onClick} >
                            <div className="center-image" >
                                <img src={require("../../../img/centerimage.png")} alt="" />
                                <div className="heading-title">Epoch Elder Care</div>
                            </div>
                            <div className="heading-labels">
                                <OverlaySummary alerts={this.state.overlay} overlay="open" />
                                <div className="dropdown-overlay" id="show_alerts_drop_down">
                                </div>
                            </div>

                        </div>
                    )

                    : (
                        <div className="alerts-popup" id="alert_popups">
                            <div className="main-heading-section common-margin ">
                                <div className="center-image" >
                                    <img src={require("../../../img/centerimage.png")} alt="" />
                                    <div className="heading-title">Epoch Elder Care</div>
                                </div>
                                <div className="heading-labels">
                                    <OverlaySummary alerts={this.state.overlay} overlay="open" />
                                    <div className="dropdown-overlay" id="close-icon" onClick={this.onClose}>
                                        <img src={require("../../../img/dropdowniconoverlay.png")} alt="" className="rotated-arrow" />
                                    </div>
                                </div>

                            </div>
                            <div className="alert-popup-section">
                                <OverlayAllAlerts />
                            </div>
                        </div>
                    )
            }</div>
    };
};

const mapStateToProps = (state) => {

    return {
        clicked: state.overlaydata.isExpanded,
        overlay: state.overlaydata.summary
    };
};

function mapDispatchToProps(dispatch) {

    let ac_setOverlayExpansion      = overlaydataActions.setOverlayExpansion;
    let ac_resetOverlayExpansion    = overlaydataActions.resetOverlayExpansion;

    return {
        ...bindActionCreators({
            setOverlayExpansion:    ac_setOverlayExpansion,
            resetOverlayExpansion:  ac_resetOverlayExpansion
        },
            dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Overlay);

// for displaying the Global Alerts Data for the entire facility
class OverlaySummary extends Component {

    constructor(props) {
        super(props);
    }

    render() {

        let num = 0; // Variable for iterating through the styles of priorities for different types of alerts
        const alert = this.props.alerts.map((alert, keyValue) => {

            num++; // Incrementing the variable since the priority levels start at 1
            let divstyle = ("alert-number" + num + " alert-numbers"); // Variable to decide which style to assign the alert based on the priority of the alert being passed

            if (num == 1 && this.props.overlay == "closed") { 
                divstyle = ("alert-number" + num + " alert-numbers"); 
            } else if (num == 1 && this.props.overlay == "open") { 
                divstyle = ("alert-number" + num + " alert-number"); 
            }

            return (
                <div className="alerts" key={keyValue}>
                    <img src={require("../../../img/alert" + num + ".png")} alt="" />
                    <div className={divstyle}>{alert}</div>
                </div>
            );
        });
        return alert;
    }
}