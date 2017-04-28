import React, {Component, PropTypes} from 'react';
import {Link} from 'react-router';
import {connect} from 'react-redux';
// import {notFoundError} from '../../actions';

import Alert from './alert';

class Breadcrumbs extends Component {
  renderDirections(paths, single, document) {
    const options = {
      add: (
        <div className="d-flex justify-content-start">
          <div className="p-3">
            <p className="lead">{`Add ${single}`}</p>
          </div>
        </div>

      ),
      history: (
        <div className="d-flex justify-content-start">
          <div className="p-3">
            <p className="lead text-capitalize">{`change history: ${document.name}`}</p>
          </div>
        </div>
      ),
      select: (
        <div className="d-flex justify-content-start">
          <div className="p-3">
            <p className="lead hidden-xs-down">{`Select ${single} to change`}</p>
          </div>
          <div className="ml-auto p-3">
            <Link to={`/admin/${paths[1]}/add`} className="btn btn-info btn-sm text-uppercase">{`ADD ${single}`} <i className="fa fa-plus"></i></Link>
          </div>
        </div>
      ),
      change: (
        <div className="d-flex justify-content-start">
          <div className="p-3">
            <p className="lead">{`Change ${single}`}</p>
          </div>
          <div className="ml-auto p-3">
            <Link to={`/admin/${paths[1]}/${document._id}/history`} className="btn btn-info btn-sm">History</Link>
          </div>
        </div>
      ),
      delete: (
        <div className="mt-3">
          <div className="col">
            <p className="lead">Are you sure?</p>
          </div>
          <div className="col">
            <p>
              {`Are you sure you want to delete the ${single} `}
              <span className="text-capitalize">"{`${document.name}`}"? </span>
              All of the following related items will be deleted:
            </p>
          </div>
        </div>
      )
    };

    const path = paths[paths.length - 1];
    return options[path] ? options[path] : options.select;
  }

  renderBreadcrumbs(paths, plural, single, document) {
    const breadcrumbs = paths.map((path, idx) => {
      const items = {
        0:
          () => {
            return <Link to="/admin" className="breadcrumb-item" key={idx}>Home</Link>;
          },
        1:
          () => {
            return paths.length === 2 ?
              <a className="breadcrumb-item disabled text-capitalize" key={idx}>{plural}</a> :
              <Link to={`/admin/${paths[1]}`} className="breadcrumb-item text-capitalize" key={idx}>{plural}</Link>;
          },
        2:
          () => {
            if (path === 'add') {
              return <a className="breadcrumb-item" key={idx}>{`Add ${single}`}</a>;
            }
            if (paths[idx + 1] === 'change') {
              return <a className="breadcrumb-item" key={idx}>{document.name}</a>;
            }
            return <Link to={`/admin/${paths[1]}/${paths[2]}`} className="breadcrumb-item" key={idx}>{document.name}</Link>;
          },
        3:
          () => {
            if (path === 'delete') {
              return <a className="breadcrumb-item disabled" key={idx}>Delete</a>;
            }
            if (path === 'history') {
              return <a className="breadcrumb-item disabled" key={idx}>History</a>;
            }
            return null;
          }
      };
      return items[idx] ? items[idx]() : null;
    });
    return breadcrumbs;
  }

  render() {
    if (!this.props.names) {
      return null;
    }
    const paths = this.props.pathname.split('/').splice(1);
    const {document, alerts} = this.props;
    const {plural, single} = this.props.names;
    return (
      <div>
        <nav className="breadcrumb mb-0 rounded-0 small">
          {this.renderBreadcrumbs(paths, plural, single, document)}
        </nav>
        <Alert {...alerts} path={this.props.pathname}/>
        <div className="row">
          <div className="col">
            {this.renderDirections(paths, single, document)}
          </div>
        </div>
      </div>
    );
  }
}

Breadcrumbs.propTypes = {
  paths: PropTypes.array,
  pathname: PropTypes.string,
  names: PropTypes.object,
  alerts: PropTypes.object,
  plural: PropTypes.string,
  single: PropTypes.string,
  document: PropTypes.object,
  dispatch: PropTypes.func.isRequired
};

export default connect()(Breadcrumbs);
