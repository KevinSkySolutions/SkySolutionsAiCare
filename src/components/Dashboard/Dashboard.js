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
      <div className="dashbodyclass">
        <div className="content">
          <div className="nav-container">
            <ul>
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="/patients">Patients</a>
              </li>
              <li>
                <a href="/facilities">Facilities</a>
              </li>
              <li>
                <a href="/reports">Reports</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
            </ul>
          </div>

          <div className="col-1 left-section">
            <img src={require("../../img/bg4.png")} />
          </div>

          <div className="col-1 right-section">
            <h1>
              <span className="subheading">Alerts</span>
            </h1>
            <div className="scrollable-area">

              <div className="description-mod">
                <div className="pt-log pt-detail">
                  <img src={require("../../img/avatar.png")} />
                  <div className="side-text detail-1">
                    <div className="pt-name">Richard Branson</div>
                    <div className="pt-suite-no gray-text">Suite #101</div>
                  </div>
                </div>
                <div className="pt-log pt-loc">
                  <img src={require("../../img/sos.png")} />
                  <div className="side-text detail-2">
                    <div className="pt-condition">SOS</div>
                    <div className="curr-location gray-text">@Lounge</div>
                  </div>
                </div>
                <div className="pt-log pt-stat">
                  <div className="help-stat">Help active</div>
                  <div className="elapsed-time gray-text side-text">30 min ago</div>
                </div>
                <div className="drop-down" />
              </div>

              <div className="description-mod">
                <div className="pt-log pt-detail">
                  <img src={require("../../img/avatar.png")} />
                  <div className="side-text detail-1">
                    <div className="pt-name">Richard Branson</div>
                    <div className="pt-suite-no gray-text">Suite #101</div>
                  </div>
                </div>

                <div className="pt-log pt-loc">
                  <img src={require("../../img/sos.png")} />
                  <div className="side-text detail-2">
                    <div className="pt-condition">SOS</div>
                    <div className="curr-location gray-text">@Lounge</div>
                  </div>
                </div>
                <div className="pt-log pt-stat">
                  <div className="help-stat">Help active</div>
                  <div className="elapsed-time gray-text side-text">30 min ago</div>
                </div>
                <div className="drop-down" />
              </div>
              <div className="description-mod">
                <div className="pt-log pt-detail">
                  <img src={require("../../img/avatar.png")} />
                  <div className="side-text detail-1">
                    <div className="pt-name">Richard Branson</div>
                    <div className="pt-suite-no gray-text">Suite #101</div>
                  </div>
                </div>
                <div className="pt-log pt-loc">
                  <img src={require("../../img/sos.png")} />
                  <div className="side-text detail-2">
                    <div className="pt-condition">SOS</div>
                    <div className="curr-location gray-text">@Lounge</div>
                  </div>
                </div>
                <div className="pt-log pt-stat">
                  <div className="help-stat">Help active</div>
                  <div className="elapsed-time gray-text side-text">30 min ago</div>
                </div>
                <div className="drop-down" />
              </div>
              <div className="description-mod">
                <div className="pt-log pt-detail">
                  <img src={require("../../img/avatar.png")} />
                  <div className="side-text detail-1">
                    <div className="pt-name">Richard Branson</div>
                    <div className="pt-suite-no gray-text">Suite #101</div>
                  </div>
                </div>
                <div className="pt-log pt-loc">
                  <img src={require("../../img/sos.png")} />
                  <div className="side-text detail-2">
                    <div className="pt-condition">SOS</div>
                    <div className="curr-location gray-text">@Lounge</div>
                  </div>
                </div>
                <div className="pt-log pt-stat">
                  <div className="help-stat">Help active</div>
                  <div className="elapsed-time gray-text side-text">30 min ago</div>
                </div>
                <div className="drop-down" />
              </div>
              <div className="description-mod">
                <div className="pt-log pt-detail">
                  <img src={require("../../img/avatar.png")} />
                  <div className="side-text detail-1">
                    <div className="pt-name">Richard Branson</div>
                    <div className="pt-suite-no gray-text">Suite #101</div>
                  </div>
                </div>
                <div className="pt-log pt-loc">
                  <img src={require("../../img/sos.png")} />
                  <div className="side-text detail-2">
                    <div className="pt-condition">SOS</div>
                    <div className="curr-location gray-text">@Lounge</div>
                  </div>
                </div>
                <div className="pt-log pt-stat">
                  <div className="help-stat">Help active</div>
                  <div className="elapsed-time gray-text side-text">30 min ago</div>
                </div>
                <div className="drop-down" />
              </div>
              <div className="description-mod">
                <div className="pt-log pt-detail">
                  <img src={require("../../img/avatar.png")} />
                  <div className="side-text detail-1">
                    <div className="pt-name">Richard Branson</div>
                    <div className="pt-suite-no gray-text">Suite #101</div>
                  </div>
                </div>
                <div className="pt-log pt-loc">
                  <img src={require("../../img/sos.png")} />
                  <div className="side-text detail-2">
                    <div className="pt-condition">SOS</div>
                    <div className="curr-location gray-text">@Lounge</div>
                  </div>
                </div>
                <div className="pt-log pt-stat">
                  <div className="help-stat">Help active</div>
                  <div className="elapsed-time gray-text side-text">30 min ago</div>
                </div>
                <div className="drop-down" />
              </div>
            </div>
          </div>
        </div>
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
