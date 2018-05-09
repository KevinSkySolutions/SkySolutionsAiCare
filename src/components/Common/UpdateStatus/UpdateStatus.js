import React, { Component } from 'react';
import Dialog from 'rc-dialog';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertsdataActions } from '../../../actions';

// Component for the Media Dialog
class UpdateStatus extends Component {
    constructor(props) {
        super(props);

        this.state = {
            visible: false,
            width: 400,
            destroyOnClose: true,
            center: false,
            mousePosition: {},
            alert: props.alert,
            status: ""
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
        e.stopPropagation();
        if (this.state.status.length > 0) {
            this.props.dispatchaction_updateAlertData(this.state.alert.id, this.state.status);
        }
        this.onClose(e);
    }

    handleCheck = e => {
        e.stopPropagation();
        this.setState({
            status: e.target.value
        });
    }

    stopEventPropagation = e => {
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
            <div onClick={this.stopEventPropagation}>
                <h1 className="rc-dialog-header">{this.state.alert.resident}</h1>
                <h2 className="rc-dialog-title"><span>Current&nbsp;Status:&nbsp;&nbsp;</span>{this.state.alert.description}</h2><br />
                <form ref="form" >
                    <div className="textaligner" >
                        <input type="radio" name="status" value="Assistance Required" onClick={this.handleCheck}/><label htmlFor="Assistance Required">&nbsp;Assistance Required&nbsp;</label><br /><br />
                        <input type="radio" name="status" value="Help Dispatched" onClick={this.handleCheck}/><label htmlFor="Help Dispatched">&nbsp;Help Dispatched&nbsp;</label><br /><br />
                        <input type="radio" name="status" value="Help Active" onClick={this.handleCheck}/><label htmlFor="Help Active">&nbsp;Help Active&nbsp;</label><br /><br />
                        <input type="radio" name="status" value="Dismiss" onClick={this.handleCheck}/><label htmlFor="Dismiss">&nbsp;Dismiss&nbsp;</label><br /><br /><hr />
                    </div>
                    <div className="textaligner2"><button type="submit" onClick={this.handleSubmit}>Update Status</button></div>
                </form>
            </div>
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

function mapDispatchToProps(dispatch) {

    let ac_updateAlertData = alertsdataActions.updateAlertData;

    return {
        ...bindActionCreators({
            dispatchaction_updateAlertData: ac_updateAlertData
        },
            dispatch)
    }
}

export default connect(null, mapDispatchToProps)(UpdateStatus);