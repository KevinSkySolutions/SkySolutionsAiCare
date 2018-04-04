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
      <img src={require("../../../img/logo.png")} alt="logo" className="logo-img" />
      <img className="logo-bg" src={require("../../../img/logo-background.png")} alt="" />
    </div>
    <div className="nav-container">
      <ul className="nav-list">
        <li>
          <a href="/dashboard">Dashboard</a>
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
        <div className="user-wrap">
          {/*
          <div className="profile-pic">
              <img src={require("../../../img/avatar.png")} alt="" />
          </div>
          */}
        </div>
      </ul>
    </div>
</header>
    
  

);

export default Header;
