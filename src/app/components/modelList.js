import React, {Component, PropTypes} from 'react';

import ModelItem from './modelItem';

class ModelList extends Component {
  renderModelItem(models) {
    return models.map(model => {
      return <ModelItem key={model.name} {...model}/>;
    });
  }

  render() {
    const {models} = this.props;
    return (
      <table className="table table-hover">
        <tbody>
          {this.renderModelItem(models)}
        </tbody>
      </table>
    );
  }
}

ModelList.propTypes = {
  models: PropTypes.array
};

export default ModelList;
