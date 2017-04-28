import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import moment from 'moment';

class DocumentHistory extends Component {

  renderChangeList(fields) {
    const length = fields.length;
    if (!length) {
      return 'No fields changed';
    }
    const options = {
      1: `Changed ${fields[0]}`,
      2: `Changed ${fields.join(' and ')}`,
      default: `Changed ${fields.slice(0, -1).join(', ')}, and ${fields[length - 1]}`
    };
    return options[length] ? options[length] : options.default;
  }

  renderActions() {
    const {docHistory} = this.props;
    if (!docHistory.length) {
      return <tr><td>Loading...</td></tr>;
    }
    const options = {
      changed: action => {
        return (
          <tr key={action._id}>
            <td>{moment(action.createdAt).format('MMM. D, YYYY, h:mm a')}</td>
            <td>{action.user.email}</td>
            <td>{this.renderChangeList(action.fields)}.</td>
          </tr>
        );
      },
      default: action => {
        return (
          <tr key={action._id}>
            <td>{moment(action.createdAt).format('MMM. D, YYYY, h:mm a')}</td>
            <td>{action.user.email}</td>
            <td>Added.</td>
          </tr>
        );
      }
    };
    return docHistory.map(action => {
      const verb = action.action;
      return options[verb] ? options[verb](action) : options.default(action);
    });
  }

  render() {
    return (
      <div className="row">
        <div className="col mx-3">
          <table className="table">
            <thead>
              <tr className="text-uppercase">
                <th>Date/Time</th>
                <th>User</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {this.renderActions()}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

DocumentHistory.propTypes = {
  docHistory: PropTypes.array
};

function mapStateToProps({history}) {
  return {docHistory: history.docHistory};
}

export default connect(mapStateToProps)(DocumentHistory);
