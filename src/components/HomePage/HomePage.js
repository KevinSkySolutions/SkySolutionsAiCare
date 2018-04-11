import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';
import { browserHistory } from 'react-router';

// import (  ) from '../../reducers';

import Patients from '../Patients/Patients';
import Header from '../Common/Header/Header';

import { homepageActions } from '../../actions';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./HomePage.css'); // eslint-disable-line global-require
}

/*
  This is the main login/landing page. 
*/
export class HomePage extends Component {

  constructor(props) {
    super(props);
  }

  // typechecking on the props for this component
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  // defaultProps, props to load before first API call is made
  static defaultProps = {
    isLoggingIn: false
  }

  // lifecycle method
  componentDidMount() {
    const { dispatch } = this.props;
  }

  // the render method
  render() {

    return (
      <div className="bodyclass">
      <div className="content">
        <div className="ai-care-watermark-logo" >
             
        </div>
        <div className="login-credentials-field-box">
            <img className="bg-container" src={require("../../img/logo.png")} />
            <form className ="logindetails">
                <div className ="information" >
                    <img className ="login-field-icon" src={require("../../img/email-icon.png")} />
                    <input className ="login-input-field" type="text" placeholder="Email ID" />
                </div>
                <div className ="information">
                    <img className ="login-field-icon" src={require("../../img/password-icon.png")} />
                    <input className ="login-input-field" type="password" placeholder="Password" />
                </div>
                <div className ="forgot">
                    <a href="#">Forgot Password?</a>
                </div>
                <div className ="signin">
                    <input type="button" value="Sign In" onClick = { this.doLogin } />
                </div>
            </form>
        </div>
    </div>
    </div>
    );
  }

  doLogin = (event) => {

    // TODO: remove line below and redirect on state change in Redux
    browserHistory.push('/dashboard');

    // this.props.dispatch_createaction_doLogin("u", "p");
    this.props.dispatch(homepageActions.login("username", "password"));
  }

}

// changes in state are copied onto props here
const mapStateToProps = (state) => {
  
  // loading default props
  const { isLoggingIn } = state;

  return {
    isLoggingIn
  };
}

export default connect(mapStateToProps)(HomePage);

