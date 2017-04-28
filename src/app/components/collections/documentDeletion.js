import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router';

import {deleteDocument} from '../../actions';

class DocumentDeletion extends Component {
  constructor(props) {
    super(props);
    this.handleDelete = this.handleDelete.bind(this);
  }

  handleDelete() {
    const {params, dispatch, names} = this.props;
    dispatch(deleteDocument(params, names));
  }
  renderDeletionSummary(related) {
    const list = [];
    Object.keys(related).forEach(model => {
      const modelNames = related[model].names;
      const {documents} = related[model];
      list.push(
        <li key={`${model}_count`} className="text-capitalize">{`${modelNames.plural}: ${documents.length}`}</li>
      );
    });

    return list;
  }

  renderObjectSummary(related) {
    const list = [];
    Object.keys(related).forEach(model => {
      const modelNames = related[model].names;
      const {documents} = related[model];
      list.push(
        <ul key={`${model}_list`}>
          {this.renderObjectList(documents, modelNames)}
        </ul>
      );
    });

    return list;
  }

  renderObjectList(documents, modelNames) {
    return documents.map(doc => {
      return <li key={`${doc._id}`} className="text-capitalize">{`${modelNames.plural}: `}<Link to={`/admin/${modelNames.plural.split(' ').join('')}/${doc._id}`}>{doc.name}</Link></li>;
    });
  }

  render() {
    const {related, document, names, params} = this.props;
    if (!names) {
      return null;
    }
    return (
      <div>
        <div className="row">
          <div className="col-12">
            <p className="col lead"><strong>Summary</strong></p>
            <ul>
              <li className="text-capitalize">{`${names.plural}: 1`}</li>
              {this.renderDeletionSummary(related, document, names)}
            </ul>
          </div>
          <div className="col-12">
            <p className="col lead"><strong>Objects</strong></p>
            <ul>
              <li className="text-capitalize">{`${names.plural}: `}<Link to={`/admin/${names.plural.split(' ').join('')}/${document._id}`}>{document.name}</Link></li>
              {this.renderObjectSummary(related, document, names)}
            </ul>
          </div>
        </div>
        <div className="form-group col-12">
          <button className="btn btn-danger" onClick={this.handleDelete}>Yes, I'm sure</button>
          <Link to={`/admin/${params.collection}/${params._id}`} className="btn btn-secondary ml-3">No, take me back</Link>
        </div>
      </div>
    );
  }
}

DocumentDeletion.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.object.isRequired,
  related: PropTypes.object,
  document: PropTypes.object,
  names: PropTypes.object
};

function mapStateToProps({related}) {
  return {related};
}

export default connect(mapStateToProps)(DocumentDeletion);
