import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import ReactDOM from 'react-dom';
import {Link} from 'react-router';

import FormInput from './formFields/formInput';
import FormSelect from './formFields/formSelect';
import {updateDocument, addDocument, clearForm, holdFormData, clearFormErrors} from '../../actions';

class DocumentForm extends Component {
  constructor(props) {
    super(props);
    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  componentDidMount() {
    // on route change, form will not render without initializing state
    this.getInitialValues(this.props);
  }
  componentWillReceiveProps(newProps) {
    // make sure errors from a different form do not persist
    const collectionChanged = this.props.params.collection !== newProps.params.collection;
    const idChanged = this.props.params._id !== newProps.params._id;
    if (collectionChanged || idChanged) {
      this.props.dispatch(clearFormErrors());
    }
    // on refresh, form data will not populate without initializing state
    this.getInitialValues(newProps);
  }
  componentWillUnmount() {
    this.props.dispatch(clearForm());
  }

  getInitialValues(props) {
    const {document, formData, form} = props;
    form.forEach(field => {
      const {name} = field;
      let initialValue = '';
      if (formData[name] || document[name]) {
        initialValue = Object.keys(formData).length > 0 ? formData[name] : document[name];
      } else if (field.options) {
        initialValue = field.options[0];
      }
      this.setState({[name]: initialValue});
    });
  }

  handleInputChange(e) {
    const {name} = e.target;
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    this.setState({[name]: value});
  }
  handleFormSubmit(e) {
    e.preventDefault();
    const {dispatch, params, document, names} = this.props;
    dispatch(holdFormData(this.state));
    if (Object.keys(document).length > 0) {
      dispatch(updateDocument(params, this.state, e.target.id, names));
    } else {
      dispatch(addDocument(params, this.state, e.target.id, names));
    }
  }

  renderFormErrors(errors) {
    const hasErrors = Object.keys(errors).length > 0;

    if (hasErrors) {
      ReactDOM.findDOMNode(this).scrollIntoView();
      return (
        <div className="alert alert-danger" role="alert">
          Please correct the error(s) below
        </div>
      );
    }
    return null;
  }

  renderForm(document, form, formErrors) {
    const fields = form.map(field => {
      const {widget} = field;
      const elements = {
        select:
          <FormSelect
            key={`${field.name}_field`}
            field={field}
            formErrors={formErrors[field.name]}
            value={this.state[field.name]}
            onChange={this.handleInputChange}
            />,
        default:
          <FormInput
            key={`${field.name}_field`}
            field={field} formErrors={formErrors[field.name]}
            value={this.state[field.name]}
            onChange={this.handleInputChange}
            document={document}
            />
      };
      return elements[widget.el] ? elements[widget.el] : elements.default;
    });

    return fields;
  }

  renderDeleteButton(document, params) {
    if (Object.keys(document).length > 0) {
      return (
        <Link
          to={`/admin/${params.collection}/${params._id}/delete`}
          className="btn btn-danger"
          >Delete</Link>
      );
    }
    return null;
  }

  renderSaveButtons(formStatus) {
    if (formStatus !== 'submit') {
      return (
        <div>
          <div className="hidden-xs-down">
            <button className="btn btn-info mr-4 mb-3" id="form-save-add" onClick={this.handleFormSubmit}>Save and add another</button>
            <button className="btn btn-info mr-4 mb-3" id="form-save-edit" onClick={this.handleFormSubmit}>Save and continue editing</button>
            <button type="submit" form="model-form" className="btn btn-primary mb-3" id="form-save">SAVE</button>
          </div>
          <div className="hidden-sm-up dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="submitDropdown" data-toggle="dropdown">Submit options</button>
            <div className="dropdown-menu" aria-labelledby="submitDropdown">
              <button className="dropdown-item small" type="button" id="form-save-add" onClick={this.handleFormSubmit}>Save and add another</button>
              <button className="dropdown-item small" type="button" id="form-save-edit" onClick={this.handleFormSubmit}>Save and continue editing</button>
              <button type="submit" form="model-form" className="dropdown-item small" id="form-save">SAVE</button>
            </div>
          </div>
        </div>
      );
    }

    return (
      <h2><span className="fa fa-spinner fa-spin 2x"></span> Submitting data...</h2>
    );
  }

  render() {
    if (!this.state) {
      return null;
    }
    const {document, form, params, formErrors} = this.props;
    return (
      <div className="col">
        <form className="col" id="model-form" onSubmit={this.handleFormSubmit}>
          {this.renderFormErrors(formErrors)}
          {this.renderForm(document, form, formErrors)}
        </form>
        <div className="form-group d-flex justify-content-start">
          <div className="p-4">
            {this.renderDeleteButton(document, params)}
          </div>
          <div className="ml-auto p-4">
            {this.renderSaveButtons(this.props.formStatus)}
          </div>
        </div>
      </div>
    );
  }
}

DocumentForm.propTypes = {
  params: PropTypes.object.isRequired,
  document: PropTypes.object,
  form: PropTypes.array,
  formErrors: PropTypes.object,
  formData: PropTypes.object,
  formStatus: PropTypes.string,
  names: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const {formData, formErrors, names, formStatus} = state.collection;
  return {formErrors, formData, names, formStatus};
}

export default connect(mapStateToProps)(DocumentForm);
