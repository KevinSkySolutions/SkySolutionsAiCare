import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import Meta from 'react-helmet';

import { fetchAlertsIfNeeded } from '../../actions';
import Posts from '../Patients/Patients';
import Header from '../Common/Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./HomePage.css'); // eslint-disable-line global-require
}

/*
  This is the main login/landing page. 
*/
export class HomePage extends Component {

  // typechecking on the props for this component
  static propTypes = {
    isLoggingIn: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired
  }

  // defaultProps, props to load before first API call is made
  static defaultProps = {
    isLoggingIn: false
  }

  // metadata for html
  static getMeta() {
    return {
      title: 'AiCare Monitoring Portal',
      link: [
        {
          rel: 'canonical',
          href: 'http://localhost:3000'
        }
      ],
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description', 
          content: 'This is the monitoring portal for Ashby Ponds by AiCare'
        }
      ]
    };
  }

  // lifecycle method
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchAlertsIfNeeded());
  }

  // the render method
  render() {    

    // for use inside render
    const head = HomePage.getMeta();

    return (
      <div className="bodyclass"> 
        <div className="content">
          <form className="logindetails">
            <div className="information">
              <input type="text" placeholder="Email ID"/>
            </div>
            <div className="information">
              <input type="text" placeholder="Password"/>
            </div>
            <div className="forgot"><a href="#">Forgot Password?</a></div>
            <div className="signin">
              <input type="button" value="Sign In" />
            </div>
          </form>
        </div>
      </div> 
    );
  }
}

// changes in state are copied onto props here
const mapStateToProps = (state) => {

  // loading default props
  const { isLoggingIn } = state;
  return {
    isLoggingIn
  };
};



export default connect(mapStateToProps)(HomePage);
