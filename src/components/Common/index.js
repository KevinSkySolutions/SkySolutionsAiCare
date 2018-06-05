import React, { Component } from 'react';
import Dialog from 'rc-dialog';

// Component for the Media Dialog
export class MediaControl extends Component {
    constructor(props) {
        super(props);
        
        let visibility = ((props.alert.alertStatus  != "INIT") ? false : true);

        this.state = {
            visible:        visibility,
            width:          400,
            destroyOnClose: true,
            center:         false,
            mousePosition:  {},
            alert:          props.alert,    // Variable for deciding the type of alert being passed to the Component for dynamic styling
            src:            props.alert.media.audio   // Variable for choosing the multimedia web url
        };
    }

    onClick = e => {

        this.setState({
            mousePosition: {
                x: e.pageX,
                y: e.pageY,
            },
            visible: true,
        });
        e.stopPropagation();
    }

    onClose = e => {
        this.setState({
            visible: false,
        });
        e.stopPropagation();
    }

    onDestroyOnCloseChange = e => {
        this.setState({
            destroyOnClose: e.target.checked,
        });
        e.stopPropagation();
    }

    center = e => {
        this.setState({
            center: e.target.checked,
        });
        e.stopPropagation();
    }

    render() {
        const style = {
            width: this.state.width,
        };

        let alertType = this.state.alert.priority; // Variable to decide which style to assign the alert based on the priority of the alert being passed

        let mediaType = "audio"; // Variable to decide which style to assign the alert based on the type of media attached to the alert being passed

        let wrapClassName = '';
        if (this.state.center) {
            wrapClassName = 'center';
        }

        let divstyle = ("type-of-alert aligner alert-number" + this.state.alert.priority); // Variable to decide which style to assign the alert based on the priority of the alert being passed

        const dialog = (  //Contents of the dialog being displayed
            <Dialog
                visible={this.state.visible}
                wrapClassName={wrapClassName}
                animation="zoom"
                maskAnimation="fade"
                onClose={this.onClose}
                style={style}
                mousePosition={this.state.mousePosition}
                destroyOnClose={this.state.destroyOnClose}
            > 
              

                {
                    (mediaType === "video")   // Conditional logic for selecting whether the alert has attached video or audio
                        ? <div><MediaPlayer media="video" source={this.state.src} /></div>
                        : <div><MediaPlayer media="audio" source={this.state.src} /></div>
                }
                <hr/>
                <div className="dialogtext">   
              <div className="description-mod">   
                <div className="alert-content-section">
                    <div className="alert-content">
                        <div className="pt-log pt-detail">
                            <img src={require("../../img/cardalert" + this.state.alert.priority + ".png")} className="avatar" />
                            <div className="side-text detail-1 side-text-padding">
                                <div className={divstyle}>{this.state.alert.type}</div>
                                <div className="pt-name list-header">{this.state.alert.resident}</div>
                                <div className="pt-suite-no gray-text list-subheader mr-t-5">{this.state.alert.currentlocation}</div>
                            </div>
                        </div>

                        <div className="pt-log pt-stat pt-stat-text textaligner">
                            <div>
                                <div className="help-stat list-header">
                                    {this.state.alert.description}
                                </div>
                                <div className="elapsed-time gray-text side-text list-subheader mr-t-5">{this.state.alert.time} min ago</div>
                            </div>
                        </div>
                    </div>
                    </div>
                  </div>
                </div>

            </Dialog>
        );
        return (
            <div style={{ width: '90%', margin: '0 auto' }}>
                <style>
                    {`
                    .center {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                    }
                    `}
                </style>
                <div className="dialogbutton">
                    <img className="" src={require("../../img/" + mediaType + alertType + ".png")} onClick={this.onClick} />
                </div>
                {dialog}
            </div>
        );
    }
}

// Component for Playing Media
function MediaPlayer(props) {

    return (
        <div>
            {
                (props.media === "video")   // Conditional logic for selecting whether the alert has attached video or audio
                    ? <video controls controlsList="nodownload" autoPlay src={props.source} />
                    : <audio controls controlsList="nodownload" autoPlay src={props.source} />
            }
        </div>

    );
}