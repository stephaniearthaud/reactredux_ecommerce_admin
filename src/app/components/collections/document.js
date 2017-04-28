import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import DocumentForm from './documentForm';

class Document extends Component {

  render() {
    const {document} = this.props;
    const {form, params} = this.props;
    return (
      <div className="row">
        <div className="col">
          <DocumentForm document={document} form={form} params={params}/>
        </div>
      </div>
    );
  }
}

Document.propTypes = {
  params: PropTypes.object.isRequired,
  document: PropTypes.object,
  form: PropTypes.array
};

export default connect()(Document);
