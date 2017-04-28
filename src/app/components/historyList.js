import React, {Component, PropTypes} from 'react';

import HistoryItem from './historyItem';

class HistoryList extends Component {
  renderHistoryItem(history) {
    return history.map(action => {
      return <HistoryItem key={action._id} {...action}/>;
    });
  }

  render() {
    const {history} = this.props;
    if (!history.length) {
      return <h3>No actions. Do stuff!</h3>;
    }
    return (
      <table className="table">
        <tbody>
          {this.renderHistoryItem(history)}
        </tbody>
      </table>
    );
  }
}

HistoryList.propTypes = {
  history: PropTypes.array
};

export default HistoryList;
