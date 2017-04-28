import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
// import classnames from 'classnames';

class HistoryItem extends Component {
  renderActionDetails() {
    const {doc} = this.props;
    const icons = {
      added: (
        <p className="mb-0">
          <span className="fa fa-plus text-success"></span>
          <Link to={`/admin/${doc.kind}/${doc.data._id}/change`}>{doc.data.name}</Link>
        </p>
      ),
      changed: (
        <p className="mb-0">
          <span className="fa fa-pencil text-warning"></span>
          <Link to={`/admin/${doc.kind}/${doc.data._id}/change`}>{doc.data.name}</Link>
        </p>
      ),
      deleted: (
        <p className="mb-0">
          <span className="fa fa-times text-danger"></span>
          {doc.data.name}
        </p>
      )
    };
    return (
      <td className="text-capitalize py-0">
        {icons[this.props.action]}
        <small className="text-muted ml-3">{doc.kind.includes('_') ? doc.kind.split('_').join(' ') : doc.kind}</small>
      </td>
    );
  }
  render() {
    return (
      <tr>
        {this.renderActionDetails()}
      </tr>
    );
  }
}

HistoryItem.propTypes = {
  doc: PropTypes.object.isRequired,
  action: PropTypes.string.isRequired
};

export default HistoryItem;
