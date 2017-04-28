import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import {Link} from 'react-router';

class FormSelect extends Component {
  getId(value) {
    return value._id || value;
  }
  shouldComponentUpdate(nextProps) {
    let oldValue = this.props.value;
    let newValue = nextProps.value;
    if (typeof oldValue === 'object') {
      oldValue = oldValue._id;
    }
    if (typeof newValue === 'object') {
      newValue = newValue._id;
    }
    if (newValue === oldValue && nextProps.formErrors === this.props.formErrors) {
      return false;
    }
    return true;
  }
  renderSelectOptions(options) {
    return options.map(choice => {
      return <option key={choice._id} value={choice._id}>{choice.name}</option>;
    });
  }
  render() {
    if (!this.props.field) {
      return null;
    }
    const {field} = this.props;
    const value = this.props.value || {};
    return (
      <div className={classnames({'form-group': true, 'row': true, 'has-danger': this.props.formErrors})} >
        <label htmlFor={field.name} className="text-capitalize col-sm-2 col-form-label">{field.name}:</label>
        <div className="col-9">
          <select
            className="form-control text-capitalize"
            name={field.name}
            value={value._id}
            onChange={this.props.onChange}
            >
            {this.renderSelectOptions(field.options)}
          </select>
        </div>
        <span className="col-1 align-self-center">
          <Link to={`/admin/${field.ref}/add`}><i className="fa fa-plus mr-3 text-success"></i></Link>
          <Link to={`/admin/${field.ref}/${this.getId(value)}/change`} className={classnames({'hidden-xs-up': !Object.keys(value).length})}><i className="fa fa-pencil text-warning"></i></Link>
        </span>
        <span className="col-12 offset-sm-2 text-danger text-capitalize">{this.props.formErrors}</span>
      </div>
    );
  }
}

FormSelect.propTypes = {
  field: PropTypes.object,
  formErrors: PropTypes.string,
  formData: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
    PropTypes.object
  ]),
  onChange: PropTypes.func
};

export default FormSelect;
