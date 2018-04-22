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
            clicked:    props.clicked,
            summary:    props.summary,
            highlights: props.highlights
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            clicked:    newProps.clicked,
            summary:    newProps.summary,
            highlights: newProps.highlights
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
                                <OverlaySummary alerts={this.state.summary} highlights={this.state.highlights} overlay="open" />
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
                                    <OverlaySummary alerts={this.state.summary} overlay="open" />
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
        clicked:    state.overlaydata.isExpanded,
        summary:    state.overlaydata.summary,
        highlights: state.overlaydata.highlightsummary
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

        let index = 0; // Variable for iterating through the styles of priorities for different types of alerts
        const returnSummary = this.props.alerts.map((alert, keyValue) => {

            index++; // Incrementing the variable since the priority levels start at 1
            let divstyle = ("alert-number" + index + " alert-numbers"); // Variable to decide which style to assign the alert based on the priority of the alert being passed
            let animstyle = "";
            if (this.props.highlights[index-1] > 0) {
                animstyle += "newalert-summary-animation";
            }

            return (
                <div className="alerts" key={keyValue}>
                    <img className={animstyle} src={require("../../../img/alert" + index + ".png")} alt="" />
                    <div className={divstyle}>{alert}</div>
                </div>
            );
        });
        return returnSummary;
    }
}