import React, { Component } from 'react';
import Dialog from 'rc-dialog';

// Component for the Media Dialog
export class UpdateStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            width: 400,
            destroyOnClose: true,
            center: false,
            mousePosition: {},
            alert: props.alert
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

    handleSubmit = e => {
        e.preventDefault();
        console.log('Yo');
        e.stopPropagation();
    }

    render() {
        const style = {
            width: this.state.width,
        };

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
                <h1 className="rc-dialog-header">{this.state.alert.resident}</h1>
                <h2 className="rc-dialog-title"><span>Current&nbsp;Status:&nbsp;&nbsp;</span>{this.state.alert.description}</h2><br />
                <form ref="form">
                    <div className="textaligner">
                        <input type="radio" name="status" value="Assistance Required" checked /><label htmlFor="Assistance Required">&nbsp;Assistance Required&nbsp;</label><br /><br />
                        <input type="radio" name="status" value="Help Dispatched" /><label htmlFor="Help Dispatched">&nbsp;Help Dispatched&nbsp;</label><br /><br />
                        <input type="radio" name="status" value="Help Active" /><label htmlFor="Help Active">&nbsp;Help Active&nbsp;</label><br /><br />
                        <input type="radio" name="status" value="Dismiss" /><label htmlFor="Dismiss">&nbsp;Dismiss&nbsp;</label><br /><br /><hr />
                    </div>
                    <div className="textaligner2"><button type="submit" onClick={this.handleSubmit}>Update Status</button></div>
                </form>
            </Dialog>
        );
        return (
            <div >
                <img src={require("../../../img/response1.png")} className="avatar2" onClick={this.onClick} />
                {dialog}
            </div>
        );
    }
}