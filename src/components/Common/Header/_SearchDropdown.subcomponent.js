import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { overlaydataActions } from '../../../actions';

export class SearchDropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results:    props.results,
            alertsdata: props.alertsdata,
            showSearch: props.showSearch
        }
    }

    componentDidMount() {
        const { dispatch } = this.props;
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            results:    newProps.results,
            alertsdata: newProps.alertsdata
        });
    }

    onResultClicked(key) {
        console.log(key);
        this.props.dispatch(overlaydataActions.navigateToAlertOnMap(
            this.state.results[key].floor,
            this.state.results[key].id,
            this.state.alertsdata
        ));
        this.state.showSearch();
    }

    render() {


        let searchResults = this.props.results.map((result, keyValue) => {
            return (
                <li onClick={e => this.onResultClicked(keyValue)} key={keyValue}>{result.resident} @ { result.location.room } | @ Floor { result.floor}</li>
            )
        });

        return (
            <div className="search-dropdown show">
                <ul>
                    { this.props.results.length > 0? searchResults: "No Search Results" }
                </ul>
            </div>
        )
    }

}

export default connect(null, null)(SearchDropdown);

