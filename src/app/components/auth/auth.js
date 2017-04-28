import React, {Component, PropTypes} from 'react';

class Auth extends Component {

  render() {
    return (
      <div className="container" style={{height: '600px'}}>
        <div className="row h-75 align-items-center">
          <div className="mx-auto" style={{width: '392px'}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
}

Auth.propTypes = {
  children: PropTypes.array.isRequired
};

export default Auth;
