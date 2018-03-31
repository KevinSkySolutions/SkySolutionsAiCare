import React from 'react';
import { Link } from 'react-router';

// Import can't be in conditional so use require.
if (process.env.WEBPACK) {
  require('./Header.css');
   // eslint-disable-line global-require
}

const Header = () => (
  <div className="Header">
    <body>
    <div class="navbar-container">
        <nav>
            <ul>
                <li><a href="/Dashboard">Dashboard</a></li>
                <li><a href="#">Patients</a></li>
                <li><a href="#">Facilities</a></li>
                <li><a href="#">Reports</a></li>
                <li><a href="#">Help</a></li>
            </ul>
        </nav>
    </div>
    </body>
  </div>
    
  

);

export default Header;
