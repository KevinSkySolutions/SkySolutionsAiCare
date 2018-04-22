import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { MediaControl } from '../../Common';
import { overlaydataActions } from '../../../actions';

// Component for displaying all the alerts for the entire facility separately inside the overlay and also the relevant media
class OverlayAllAlerts extends Component {

    constructor(props) {
        super(props);

        this.state = {
            alerts: props.alerts // Making a copy of the alerts object for the entire facility for data manipulation
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            alerts: newProps.alerts
        });
    }

    onNavigate = (floornumber, alertid, allalerts) => { // For displaying the overlay
        
        this.props.navigateToAlert(floornumber, alertid, allalerts);
    }

    render() {
        return this.state.alerts.map((alert, keyValue) => {

            let divstyle = ("type-of-alert alert-number" + alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

            return (
                <div key={keyValue}>

                    <div className="popup-card" id="alert_popups" >
                        <div className="map-point" onClick={ () => this.onNavigate(alert.floor, alert.id, this.state.alerts) }>
                            <img src={require("../../../img/location" + alert.priority + ".png")} className="avatar" />
                        </div>
                        <div className={divstyle}>{alert.type}</div>
                        <div className="alert-content-section">
                            <div className="alert-content">
                                <div className="pt-log pt-detail">
                                    <img src={require("../../../img/cardalert" + alert.priority + ".png")} className="avatar" />
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
                                        : <MediaControl type={alert.priority} media="audio" source={alert.media.audio} />
                                    )
                                    : <MediaControl type={alert.priority} media="video" source={alert.media.audio} />
                            }

                        </div>

                    </div>


                </div>
            )
        });
    }
}

const mapStateToProps = (state) => {

    return {
        alerts: state.dashboard.alertsdata
    };
};

function mapDispatchToProps(dispatch) {

    let ac_navigateToAlert = overlaydataActions.navigateToAlertOnMap;
    return {
        ...bindActionCreators({
            navigateToAlert:    ac_navigateToAlert
        },
        dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(OverlayAllAlerts);