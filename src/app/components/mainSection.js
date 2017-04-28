import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';

import Header from './header';

class MainSection extends Component {
  componentDidUpdate() {
    ReactDOM.findDOMNode(this).scrollIntoView();
  }

  render() {
    return (
      <div>
        <Header/>
        <div className="container-fluid">
          {this.props.children}
        </div>
      </div>
    );
  }
}

MainSection.propTypes = {
  children: PropTypes.element.isRequired
};

export default connect()(MainSection);
