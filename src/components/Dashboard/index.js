import React, { Component } from 'react';
import Dialog from 'rc-dialog';

// Component for the Media Dialog
export class MediaControl extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            width: 600,
            destroyOnClose: true,
            center: false,
            mousePosition: {},
            type: this.props.type,   // Variable for deciding the type of alert being passed to the Component for dynamic styling
            media: this.props.media  // Variable for deciding whether the props being passed is of type audio or video
        };
    }

    componentWillReceiveProps(newProps) {  // Updating the state on receiving the new props after selecting a different floor
        this.setState({
            type: newProps.type,   // Variable for deciding the type of alert being passed to the Component for dynamic styling
            media: newProps.media  // Variable for deciding whether the props being passed is of type audio or video
        });
    }

    onClick = e => {
        this.setState({
            mousePosition: {
                x: e.pageX,
                y: e.pageY,
            },
            visible: true,
        });
    }

    onClose = e => {
        this.setState({
            visible: false,
        });
    }

    onDestroyOnCloseChange = e => {
        this.setState({
            destroyOnClose: e.target.checked,
        });
    }

    center = e => {
        this.setState({
            center: e.target.checked,
        });
    }

    render() {
        const style = {
            width: this.state.width,
        };

        let alertType = this.state.type; // Variable to decide which style to assign the alert based on the priority of the alert being passed

        let mediaType = this.state.media; // Variable to decide which style to assign the alert based on the type of media attached to the alert being passed

        let wrapClassName = '';
        if (this.state.center) {
            wrapClassName = 'center';
        }
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
                        ? <div><MediaPlayer media="video" /></div>
                        : <div><MediaPlayer media="audio" /></div>
                }

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
                    ? <video controls autoPlay src='https://s3.amazonaws.com/codecademy-content/courses/React/react_video-fast.mp4' />
                    : <audio controls autoPlay src='http://www.nihilus.net/soundtracks/Static%20Memories.mp3' />
            }
        </div>

    );
}