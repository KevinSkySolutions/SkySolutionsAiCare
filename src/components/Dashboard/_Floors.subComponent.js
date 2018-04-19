import React, { Component } from 'react';
import { connect } from 'react-redux';
import { floorsdataActions } from '../../actions';

// Component for displaying the floors on the right and highlighting the floor relevant to the current user
export class Floors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultfloor: props.defaultfloor,  // Current floor being viewed
            floors: props.floors // Floor data for displaying the different floors in the facility
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
    }

    onSelectFloor = (floorNumber) => { // Function for dispatching the action for changing the data and the active floor depending on which floor was clicked by the user
        this.props.dispatch(floorsdataActions.selectFloor(floorNumber));
        this.setState({
            defaultfloor: floorNumber
        });
    }

    render() {
        return this.state.floors.map((floor, keyValue) => { 

            if (floor.floor == this.state.defaultfloor) { // Conditional logic for deciding which floor is currently being viewed and showing the relevant data
                return (
                    <div className="page active" key={keyValue}>{this.state.defaultfloor}</div>
                );
            }

            else {
                return (
                    <div className="page" key={keyValue} onClick={() => this.onSelectFloor(floor.floor)} >{floor.floor}</div>
                );
            }
        })
    }
}
export default connect()(Floors);