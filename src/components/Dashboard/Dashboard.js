import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { Link } from 'react-router';
import Meta from 'react-helmet';

import { find } from 'lodash';
import Header from '../Common/Header/Header';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Dashboard.css'); // eslint-disable-line global-require
}

export class Dashboard extends Component {
  static propTypes = {
    dispatch: PropTypes.func.isRequired
  }
  static getMeta(id) {
    return {
      title: `Post Detail Page - Post ${id}`,
      link: [
        {
          rel: 'canonical',
          href: `http://localhost:3000/post/${id}`
        }
      ],
      meta: [
        {
          charset: 'utf-8'
        },
        {
          name: 'description', content: 'Put the description here!'
        }
      ]
    };
  }

  componentDidMount() {
    // TODO initialization 
  }

  render() {
    // for use inside render
    const head = Dashboard.getMeta();

    return (
      <div className="placeHolderClass"> 
        This is the dashboard page.
      </div> 
    );
  }
}

const mapStateToProps = (state) => {
  // 
  return {
  };
};

export default connect(mapStateToProps)(Dashboard);
