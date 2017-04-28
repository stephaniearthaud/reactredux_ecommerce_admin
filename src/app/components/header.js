import React, {Component} from 'react';
import {Link} from 'react-router';

export default class Header extends Component {

  render() {
    return (
      <nav className="navbar navbar-toggleable-md navbar-inverse bg-primary">
        <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navHeader">
          <span className="navbar-toggler-icon"></span>
        </button>
        <Link to="/admin" className="navbar-brand">Site Administration</Link>
        <div className="collapse navbar-collapse justify-content-end" id="navHeader">
          <div className="navbar-nav nav-fill">
            <Link to="/admin" className="nav-item nav-link disabled">View Site</Link>
            <Link to="/admin" className="nav-item nav-link disabled">Change Password</Link>
            <Link to="/signout" className="nav-item nav-link">Log Out</Link>
          </div>
        </div>
      </nav>
    );
  }
}
