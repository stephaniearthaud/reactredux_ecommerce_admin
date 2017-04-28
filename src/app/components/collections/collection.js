import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';

import Loader from '../loader';
import Breadcrumbs from './breadcrumbs';
import DocumentList from './documentList';
import Document from './document';
import DocumentDeletion from './documentDeletion';
import DocumentHistory from './documentHistory';

class Collection extends Component {

  renderChildren() {
    const {location, collection, routes, params} = this.props;
    const children = {
      change:
        <Document document={collection.document} form={collection.form} params={params}/>,
      add:
        <Document form={collection.form} params={params} document={{}}/>,
      delete:
        <DocumentDeletion params={params} document={collection.document} names={collection.names}/>,
      history:
        <DocumentHistory/>,
      default:
        <DocumentList pathname={location.pathname} collection={collection}/>
    };
    const {path} = routes[routes.length - 1];
    return children[path] ? children[path] : children.default;
  }
  render() {
    const {location, names, collection, alerts} = this.props;
    if (!names.single) {
      return <Loader/>;
    }
    return (
      <div>
        <Breadcrumbs pathname={location.pathname} names={names} document={collection.document} alerts={alerts}/>
        {this.renderChildren()}
      </div>
    );
  }
}

Collection.propTypes = {
  params: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  routes: PropTypes.array.isRequired,
  names: PropTypes.object,
  alerts: PropTypes.object,
  collection: PropTypes.object,
  dispatch: PropTypes.func.isRequired

};

function mapStateToProps({collection, alerts}) {
  return {
    collection,
    alerts,
    names: collection.names
  };
}

export default connect(mapStateToProps)(Collection);
