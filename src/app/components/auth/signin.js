import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {reduxForm, Field} from 'redux-form';
import * as actions from '../../actions/auth_actions';
import {hashHistory} from 'react-router';

import Auth from './auth';

const renderInput = field => {
  return (
    <input {...field.input} type={field.type} className="form-control"/>
  );
};

class Signin extends Component {
  constructor(props) {
    super(props);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }
  componentWillMount() {
    if (this.props.authenticated) {
      hashHistory.push('/admin');
    }
  }
  componentWillReceiveProps(nextProps) {
    if (nextProps.authenticated) {
      hashHistory.push('/admin');
    }
  }
  handleFormSubmit({email, password}) {
    this.props.signInUser({email, password});
  }

  renderAlert() {
    if (this.props.errorMessage) {
      return (
        <div className="alert alert-danger">
          {this.props.errorMessage}
        </div>
      );
    }
  }

  render() {
    const {handleSubmit} = this.props;
    return (
      <Auth>
        <header className="navbar bg-primary rounded-top">
          <span className="navbar-text lead text-white">
						Website Administration
          </span>
        </header>
        <form onSubmit={handleSubmit(this.handleFormSubmit)} className="p-3 border-1 border-top-0">
          {this.renderAlert()}
          <fieldset className="form-group">
            <label htmlFor="email">Email: <small>(try admin@admin.com or user@test.com)</small></label>
            <Field name="email" type="text" component={renderInput}/>
          </fieldset>
          <fieldset className="form-group">
            <label htmlFor="password">Password: <small>(password is password)</small></label>
            <Field name="password" type="password" component={renderInput}/>
          </fieldset>
          <div className="text-right">
            <button action="submit" className="btn btn-primary">Sign in</button>
          </div>
        </form>
      </Auth>
    );
  }
}

Signin.propTypes = {
  handleSubmit: PropTypes.func,
  fields: PropTypes.array,
  errorMessage: PropTypes.string,
  signInUser: PropTypes.func,
  authenticated: PropTypes.bool
};

function mapStateToProps(state) {
  return {errorMessage: state.auth.error, authenticated: state.auth.authenticated};
}

export default reduxForm({
  form: 'signin'
})(connect(mapStateToProps, actions)(Signin));
