import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Loader from './loader';
import ModelList from './modelList';
import HistoryList from './historyList';

class Dashboard extends Component {
  render() {
    const {models, history} = this.props;
    if (!this.props.models.length) {
      return <Loader/>;
    }
    return (
      <div className="row mt-3">
        <div className="col-sm-7 col-md-6">
          <div className="row">
            <div className="col lead">
              Available Collections
            </div>
          </div>
          <ModelList models={models}/>
        </div>
        <div className="col-sm-5 offset-md-1 hidden-xs-down">
          <div className="row">
            <div className="col lead">
              Recent Actions
            </div>
          </div>
          <HistoryList history={history.history}/>
        </div>
      </div>
    );
  }
}

Dashboard.propTypes = {
  models: PropTypes.array,
  history: PropTypes.object
};

function mapStateToProps({models, history}) {
  return {models, history};
}

export default connect(mapStateToProps)(Dashboard);
