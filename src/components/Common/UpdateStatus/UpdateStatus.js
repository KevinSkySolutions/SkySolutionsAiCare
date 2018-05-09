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
        e.preventDefault();
        if (this.state.visible === false) {
          this.setState({
            visible: true
          })
        }

        else if (this.state.visible === true) {
          this.setState({
            visible: false
          })
        }
        e.stopPropagation();
    }

    onClose = e => {

        e.preventDefault();
        e.stopPropagation();
        
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log('Yo');
        e.stopPropagation();
    }

    render() {
        
        return (
            <div >
                <img src={require("../../../img/response1.png")} className="avatar2" onClick={this.onClick} />

            {
            (this.state.visible === false)   // Conditional logic for showing update menu
                ? (<div></div>)
                : (<UpdateMenu />)
            }
            </div>
        );
    }
}

class UpdateMenu extends Component {
  render() {
    return (
      <div className="update-menu-show">
        <ul>
          <li>
            <label>Assistance Required</label>
          </li>
          <li>
            <label>Help Dispatched</label>
          </li>
          <li >
            <label>Help Active</label>
          </li>
          <li >
            <label>Dismiss</label>
          </li>
        </ul>
      </div>
    );
  }
}