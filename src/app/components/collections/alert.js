import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import classnames from 'classnames';

import {clearAlerts} from '../../actions';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: '',
      path: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // trying to make the alert like a flash message
    if (this.state.message !== nextProps.message) {
      this.setState({
        message: nextProps.message,
        path: nextProps.path
      });
    } else if (nextProps.path !== this.state.path) {
      this.setState({
        message: undefined,
        path: undefined
      });
      this.props.dispatch(clearAlerts());
    }
  }
  componentWillUnmount() {
    this.props.dispatch(clearAlerts());
    this.setState({
      message: undefined,
      path: undefined
    });
  }

  render() {
    return (
      <div className={classnames({'alert': true, 'alert-success': true, 'hidden-xs-up': !this.state.message, 'rounded-0': true})} role="alert">
        {this.state.message}
      </div>
    );
  }
}

Alert.propTypes = {
  message: PropTypes.string,
  status: PropTypes.number,
  path: PropTypes.string,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Alert);
