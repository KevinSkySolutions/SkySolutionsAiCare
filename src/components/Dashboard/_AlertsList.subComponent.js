import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AlertHistory } from './_SubComponents';

// Component for the right hand side section of the Dashbord for displaying the relevant floor alerts
export class AlertsList extends Component {

    constructor(props) {
      super(props);
      this.state = {
        alerts: this.props.alerts.alerts
      }
    }
  
    render() {
      return this.state.alerts.map((alert, keyValue) => {
  
        let divstyle = ("type-of-alert alert-number" + alert.priority);
  
        return (
  
          <div className="description-mod" key={keyValue}>
  
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
  
                <div className="pt-log pt-stat pt-stat-text">
                  <div>
                    <div className="help-stat list-header">
                      {alert.description}
                    </div>
                    <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{alert.time} min ago</div>
                  </div>
  
                </div>
              </div>
  
              <div>
                <img className="" src={require("../../img/dropdownoncard.png")} />
              </div>
              <AlertHistory alerts={alert.history} />
            </div>
          </div>
  
        )
      });
    }
  }

export default connect()(AlertsList);