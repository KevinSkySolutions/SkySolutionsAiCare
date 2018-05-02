import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertsdataActions } from '../../../actions';

export class Search extends Component {
    constructor(props) {
        super(props);

        this.state = {
            showSearch: props.showSearch,
            showSearching: false,
            inputValue: '',
            results: props.results
        }
    }

    componentWillReceiveProps(newProps) {
        this.setState({
            results: newProps.results
        });
    }

    handleSubmit = e => {
        e.preventDefault();
    }

    clearField = e => {
        this.refs.form.reset();
        this.setState({
            inputValue: ''
        });
    }

    updateInputValue = e => {

        if (e.target.value.length > 2) {
            this.props.dispatchaction_requestSearch(e.target.value);

            this.setState({
                inputValue: e.target.value
            });
        } else {
            this.setState({
                inputValue: ""
            });
        }
        
    }

    showSearchDropdown = e => {
        if (this.state.showSearching === false) {
            e.preventDefault();
            this.setState({
                showSearching: true
            })
        }

        else if (this.state.showSearching === true) {
            this.setState({
                showSearching: false
            })
        }
    }

    render() {
        return (
            <div className="search-popup restrict-width" id="search-popups">
                <header className="search-header">
                    <div className="search-container">
                        <form action="#" className="search-form" onSubmit={this.handleSubmit} ref="form">
                            <div className="form-group">
                                <div className="search-bar">
                                    <img src={require("../../../img/search.png")} alt="" />
                                </div>
                                <input type="text" className="search-input" placeholder="Search here..." onChange={this.updateInputValue} />
                                <div className="input-close clear-search-input">
                                    <img src={require("../../../img/input-close.png")} alt="" onClick={this.clearField.bind(this)} />
                                </div>
                            </div>
                        </form>
                        <div className="search-close close-search-icon">
                            <img src={require("../../../img/search-close.png")} alt="" onClick={this.state.showSearch} />
                        </div>
                    </div>
                </header>


                {
                    (this.state.inputValue.length > 2)
                        ? (<SearchDropdown results={ this.state.results } />)
                        : (<div className="empty"></div>)
                }


                <div className="search-content-body">
                    <div className="search-item-hdr">James John Suite#103 | @ Floor 1</div>
                    <div className="content-section">
                        <div className="left-section">
                            <div className="floor-image">
                                <img src={require("../../../img/floorplan1.jpg")} alt="" className="floor-map" />

                                <div className="alertposition2">
                                    <img className="" src="../../../img/alertpositionpointer2.png" />
                                </div>
                            </div>
                        </div>
                        <div className="col-1 right-section">
                            <div className="right-section-content">
                                <div className="description-mod">

                                    <div className="alert-content-section">
                                        <div className="alert-content">
                                            <div className="desktop-pt-detail">
                                                <img src={require("../../../img/cardalert2.png")} className="avatar" />
                                                <div className="side-text detail-1">
                                                    <div className="pt-name list-header">James John</div>
                                                    <div className="type-of-alert alert-number3">ASSISTANCE REQUIRED</div>
                                                </div>
                                                <span className="pt-suite-no gray-text list-subheader mr-t-5">Suite#103 | @ Floor 1</span>
                                                <span className="help-stat list-header">Help active</span>
                                                <span className="elapsed-time side-text list-header">05 mins ago</span>
                                            </div>
                                            <div className="pt-log pt-detail tablet-hide">
                                                <img src={require("../../../img/cardalert2.png")} className="avatar" />
                                                <div className="side-text detail-1 side-text-padding">
                                                    <div className="pt-name list-header">James John</div>
                                                    <div className="type-of-alert alert-number3">ASSISTANCE REQUIRED</div>
                                                </div>
                                            </div>
                                            <div className="pt-log pt-stat pt-stat-text tablet-hide">
                                                <div className="pt-suite-no gray-text list-subheader mr-t-5">Suite#103 | @ Floor 1</div>
                                                <div className="help-block">
                                                    <div className="help-stat list-header">
                                                        Help active
                                                  </div>
                                                    <div className="elapsed-time side-text list-header">05 mins ago</div>
                                                </div>
                                            </div>

                                            <div className="card-details-block">
                                                <div className="card-details red">
                                                    <div className="card-text1">
                                                        SOS High Noice Alert
                                                  </div>
                                                    <div className="card-text2">
                                                        13/19/2018 11:30AM
                                                  </div>
                                                </div>
                                                <div className="card-details green">
                                                    <div className="card-text1">
                                                        Help Dispatched
                                                  </div>
                                                    <div className="card-text2">
                                                        13/19/2018 11:40AM
                                                  </div>
                                                </div>
                                                <div className="card-details green">
                                                    <div className="card-text1">
                                                        Help Active
                                                  </div>
                                                    <div className="card-text2">
                                                        13/19/2018 11:50AM
                                                  </div>
                                                </div>
                                            </div>

                                        </div>

                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>


        );
    }

}

const mapStateToProps = (state) => {

    return {
        results: state.dashboard.searchresults
    };
};
function mapDispatchToProps(dispatch) {

    let ac_requestSearch = alertsdataActions.requestSearch

    return {
        ...bindActionCreators({
            dispatchaction_requestSearch: ac_requestSearch
        },
            dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Search);

class SearchDropdown extends Component {
    constructor(props) {
        super(props)

        this.state = {
            results: props.results
        }
    }

    render() {


        let searchResults = this.props.results.map((result, keyValue) => {
            return (
                <li key={keyValue}>{result.resident} @ { result.location.room } | @ Floor { result.floor}</li>
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