import React, { Component } from 'react';
import { connect } from 'react-redux';
import { floorsdataActions } from '../../actions';

//Function for displaying the floors on the right and highlighting the floor relevant to the current user
export class Floors extends Component {

    constructor(props) {
        super(props);
        this.state = {
            defaultfloor: props.defaultfloor,
            floors: props.floors
        };
    }

    componentDidMount() {
        const { dispatch } = this.props;
    }

    onSelectFloor = (floorNumber) => {
        this.props.dispatch(floorsdataActions.selectFloor(floorNumber));
        this.setState({
            defaultfloor: floorNumber
        });
    }

    render() {
        return this.state.floors.map((floor, keyValue) => {

            if (floor.floor == this.state.defaultfloor) {
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