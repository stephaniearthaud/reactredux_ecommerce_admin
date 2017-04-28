import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';

class ModelItem extends Component {

  render() {
    const {name, route} = this.props;
    return (
      <tr>
        <td>
          <Link to={`/admin/${route}`} className="text-capitalize">{name}</Link>
        </td>
        <td className="text-right">
          <Link to={`/admin/${route}/add`} className="mr-4"><i className="fa fa-plus text-success"></i> Add</Link>
          <Link to={`/admin/${route}`}><i className="text-warning fa fa-pencil"></i> Edit</Link>
        </td>
      </tr>
    );
  }
}

ModelItem.propTypes = {
  name: PropTypes.string.isRequired,
  route: PropTypes.string.isRequired
};

export default ModelItem;
