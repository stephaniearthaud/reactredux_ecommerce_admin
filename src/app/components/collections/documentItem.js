import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';

import {getOneDocument} from '../../actions';

class DocumentItem extends Component {
  render() {
    const {document, dispatch} = this.props;
    return (
      <tr>
        <td className="text-capitalize">
          <Link
            to={`${this.props.pathname}/${document._id}/change`}
            onClick={function () {
              dispatch(getOneDocument(document));
            }}
            >
            {document.name}
          </Link>
        </td>
      </tr>
    );
  }
}

DocumentItem.propTypes = {
  dispatch: PropTypes.func.isRequired,
  document: PropTypes.object,
  name: PropTypes.string,
  pathname: PropTypes.string.isRequired
};

export default connect()(DocumentItem);
