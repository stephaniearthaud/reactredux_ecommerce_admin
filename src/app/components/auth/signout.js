import React, {Component, PropTypes} from 'react';
import {hashHistory} from 'react-router';
import {connect} from 'react-redux';
import * as actions from '../../actions/auth_actions';

class Signout extends Component {
  componentWillMount() {
    this.props.signOutUser();
    setTimeout(() => {
      hashHistory.push('/signin');
    }, 3000);
  }

  render() {
    return <div>You have logged out.  Have a nice day!</div>;
  }
}

Signout.propTypes = {
  signOutUser: PropTypes.func
};

export default connect(null, actions)(Signout);
