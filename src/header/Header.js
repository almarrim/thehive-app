import React from 'react'
import { Link } from 'react-router-dom'

import './Header.scss'

const authenticatedOptions = (
  <React.Fragment>
    <div className="dropdown-content">
      <div>
        <Link to="/job-form/0" className="dropdown-item"> POST A JOB</Link>
        <Link to="/own-jobs" className="dropdown-item">My Jobs</Link>
        <Link to="/own-bids" className="dropdown-item">My Bids</Link>
      </div>
      <div id="user-tools">
        <Link to="/change-password" className="dropdown-item">Change Password</Link>
        <Link to="/sign-out" className="dropdown-item">Sign Out</Link>
      </div>
    </div>
  </React.Fragment>
)
const authenticatedOptions2 = (
  <React.Fragment>
    <Link to="/job-form/0" className="Link"> POST A JOB</Link>
    <Link to="/own-jobs" className="Link">My Jobs</Link>
    <Link to="/own-bids" className="Link">My Bids</Link>
  </React.Fragment>
)
const unauthenticatedOptions = (
  <React.Fragment>
    {/* <div className="dropdown">
      <button className="dropbtn" >
        <div className="burger" id="1"></div>
        <div className="burger" id="2"></div>
        <div className="burger" id="3"></div>
      </button> */}
    <div className="dropdown-content">
      <Link to="/sign-up" className="dropdown-item">Sign Up</Link>
      <Link to="/sign-in" className="dropdown-item">Sign In</Link>
    </div>
    {/* </div> */}
  </React.Fragment>
)

const alwaysOptions = (
  <React.Fragment>
    <Link to="/" className="Link underline hover">Home</Link>
  </React.Fragment>
)

const Header = ({ user }) => (
  <header className="main-header">
    <nav>
      <div className="dropdown">
        <button className="dropbtn" >
          <div id="burger1"></div>
          <div id="burger2"></div>
          <div id="burger3"></div>
        </button>
        {user ? authenticatedOptions : unauthenticatedOptions}
      </div>
      {alwaysOptions}
      {user && <span>Welcome, {user.name} {authenticatedOptions2}</span>}
    </nav>
    <h2>The Hive</h2>
  </header>
)

export default Header
