import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { alertsdataActions } from '../../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Header.css');
  // eslint-disable-line global-require
}

class Header extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clicked: false,
      menuClick: false
    }
  }

  originaldata = () => {
    this.props.dispatchaction_getdata();
  }

  mock1 = () => {
    this.props.dispatchaction_mock1();
  };

  mock2 = () => {
    this.props.dispatchaction_mock2();
  };

  showSearch = e => {
    if (this.state.clicked === true ) {
      this.setState({
        clicked: false
      })
    }

    else if (this.state.clicked === false ) {
      this.setState({
        clicked: true
      })
    }
  }

  showBurger = e => {
    if (this.state.menuClick === false ) {
      this.setState({
        menuClick: true
      })
    }

    else if (this.state.menuClick === true ) {
      this.setState({
        menuClick: false
      })
    }
  }

  render() {

    return (

      <div>
        <header>
            <div className="header-wrapper">
                <a href="#" className="logo">
                    <img src={require("../../../img/logo.png")} alt="" />
                </a>

                <div className="nav-container">

                    
                    <div className="hamburger-menu" >
                        <img src={require("../../../img/hamburger.png")} alt="" onClick={this.showBurger}/>
                      <div className="search-bar" id="show-search-drop-down" onClick={this.showSearch}>
                        <img src={require("../../../img/search.png")} alt="" />
                      </div>
                    </div>

                    {
                      (this.state.menuClick === true)
                      ? (<BurgerMenu/>)
                      :(<div className="empty"></div>)
                    }

                    

                    <ul className="nav-list display">
                        <div className="search-bar" id="show-search-drop-down" onClick={this.showSearch}>
                          <img src={require("../../../img/search.png")} alt="" />
                        </div>
                        <li>
                            <a href="#">Dashboard</a>
                        </li>
                        <li>
                            <a href="#">Residents</a>
                        </li>
                        <li onClick={ this.originaldata }>
                          <a href="#">Facilities</a>
                        </li>
                        <li onClick={ this.mock1 }>
                          <a href="#">Reports</a>
                        </li>
                        <li onClick={ this.mock2 }>
                          <a href="#">Help</a>
                        </li>
                        <div className="user-wrap">
                        </div>
                    </ul>
                </div>
            </div>
        </header>
        {
          (this.state.clicked === true)
          ? (<Search showSearch={this.showSearch}/>)
          :(<div className="empty"></div>)
        }
      
      </div>

      
    );
  }
}

class BurgerMenu extends Component {
  render() {
    return (
      <div className="burger-menu-show">
        <ul>
           <li>
              <a href="#">Dashboard</a>
          </li>
          <li>
              <a href="#">Residents</a>
          </li>
          <li >
            <a href="#">Facilities</a>
          </li>
          <li >
            <a href="#">Reports</a>
          </li>
          <li >
            <a href="#">Help</a>
          </li>
        </ul>
      </div>
    );
  }
}

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: props.showSearch
    }
  }
  
  render() {
    return (
      <div className="search-popup restrict-width" id="search-popups">
            <header className="search-header">
                <div className="search-container">
                    <form action="#" className="search-form">
                        <div className="form-group">
                            <div className="search-bar">
                                <img src={require("../../../img/search.png")} alt="" />
                            </div>
                            <input type="text" className="search-input" placeholder="Search here..." />
                            <div className="input-close clear-search-input">
                                <img src={require("../../../img/input-close.png")} alt="" />
                            </div>
                        </div>
                    </form>
                    <div className="search-close close-search-icon">
                        <img src={require("../../../img/search-close.png")} alt="" onClick={this.state.showSearch}/>
                    </div>
                </div>
            </header>


            <div className="search-dropdown">
                <ul>
                    <li>James John Suite#103 | @ Floor 1</li>
                    <li>James Johnathan emergency</li>
                    <li>Joe cameroon Assistence Required</li>
                    <li>jane shimmer impact Alert</li>
                </ul>
            </div>

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

function mapDispatchToProps(dispatch) {

  let ac_requestAlertsDataMock1 = alertsdataActions.requestAlertsDataMock1;
  let ac_requestAlertsDataMock2 = alertsdataActions.requestAlertsDataMock2;
  let ac_requestAlerts          = alertsdataActions.requestAlertsData;

  return {
      ...bindActionCreators({
          dispatchaction_mock1:   ac_requestAlertsDataMock1,
          dispatchaction_mock2:   ac_requestAlertsDataMock2,
          dispatchaction_getdata: ac_requestAlerts
      },
      dispatch)
  }
}

export default connect(null, mapDispatchToProps)(Header);