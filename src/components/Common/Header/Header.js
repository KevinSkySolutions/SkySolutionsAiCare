import React from 'react';
import { Link } from 'react-router';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Header.css');
   // eslint-disable-line global-require
}

const Header = () => (

  <header>          
    <div className="logo">
            <img src={require("../../../img/logo.png")} alt=""/>
          </div>
          <div className="header-image">

          </div>

          <div className="nav-container">
            <ul className="nav-list">
              <li>
                <a href="#">Dashboard</a>
              </li>
              <li>
                <a href="#">Patients</a>
              </li>
              <li>
                <a href="#">Facilities</a>
              </li>
              <li>
                <a href="#">Reports</a>
              </li>
              <li>
                <a href="#">Help</a>
              </li>
              <div className="user-wrap">
                <div className="profile-pic"/>
              </div>
            </ul>
          </div>
</header>
    
  

);

export default Header;
