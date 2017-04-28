import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import DocumentItem from './documentItem';

class DocumentList extends Component {

  renderDocumentItem({documents}) {
    return documents.map(document => {
      return <DocumentItem key={document._id} document={document} pathname={this.props.pathname}/>;
    });
  }

  render() {
    const {collection} = this.props;
    if (!collection.names) {
      return null;
    }
    return (
      <div className="row col">
        <div className="col">
          <table className="table table-hover">
            <thead>
              <tr>
                <th className="text-uppercase">{`${collection.names.single}`}</th>
              </tr>
            </thead>
            <tbody>
              {this.renderDocumentItem(collection)}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

DocumentList.propTypes = {
  documents: PropTypes.array,
  collection: PropTypes.object,
  pathname: PropTypes.string.isRequired
};

export default connect()(DocumentList);
