import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';

class FormInput extends Component {

  shouldComponentUpdate(nextProps) {
    // don't re-render when other form fields change.
    const oldValue = this.props.value;
    const newValue = nextProps.value;
    if (newValue === oldValue && nextProps.formErrors === this.props.formErrors) {
      return false;
    }
    return true;
  }

  renderFieldDetails(field, document, position) {
    const {widget} = field;
    const {detail} = widget;
    const value = document[field.name];

    const details = {
      url:
        !value || position === 'after' ?
         null :
          <a target="_blank" href={`${value}`} className="input-group-addon"><small>View Url</small></a>,
      currency:
        position === 'before' ?
          <span className="input-group-addon">$</span> : <span className="input-group-addon">.00</span>
    };

    return details[detail] ? details[detail] : null;
  }
  renderInput(field, widget) {
    if (widget.type === 'checkbox') {
      return (
        <input
          type={widget.type}
          step={widget.step}
          className="form-control-lg"
          name={field.name}
          checked={this.props.value}
          onChange={this.props.onChange}
          />
      );
    }
    if (widget.el === 'textarea') {
      return (
        <textarea
          className="form-control"
          name={field.name}
          value={this.props.value}
          onChange={this.props.onChange}
          ></textarea>
      );
    }
    return (
      <input
        type={widget.type}
        step={widget.step}
        className="form-control"
        name={field.name}
        value={this.props.value}
        onChange={this.props.onChange}
        />
    );
  }
  render() {
    if (!this.props.field) {
      return null;
    }
    const {field} = this.props;
    const {widget} = field;
    return (
      <div className={classnames({'form-group': true, 'row': true, 'has-danger': this.props.formErrors, 'pb-4': true})}>
        <span className="col-10 offset-sm-2 text-danger text-capitalize">{this.props.formErrors}</span>
        <label htmlFor={field.name} className="text-capitalize col-sm-2 col-form-label">{field.name.split('_').join(' ')}:</label>
        <div className={classnames({'col-sm-10': true, 'input-group': widget.detail})}>
          {this.renderFieldDetails(field, this.props.document, 'before')}
          {this.renderInput(field, widget)}
          {this.renderFieldDetails(field, this.props.document, 'after')}
        </div>
        <small className="col offset-sm-2 form-text text-muted">{field.helpText}</small>
      </div>
    );
  }
}

FormInput.propTypes = {
  field: PropTypes.object,
  formErrors: PropTypes.string,
  formData: PropTypes.object,
  document: PropTypes.object,
  value: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.object,
    PropTypes.number,
    PropTypes.bool
  ]),
  onChange: PropTypes.func
};

export default FormInput;
