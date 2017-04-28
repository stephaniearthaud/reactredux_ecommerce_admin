import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import configureStore from './app/store/configureStore';
import {Router, Route, IndexRedirect, IndexRoute, hashHistory} from 'react-router';

export const store = configureStore();

import Signin from './app/components/auth/signin';
import Signout from './app/components/auth/signout';

import requireAuth from './app/components/auth/require_auth';
import NotFound from './app/components/404';
import Dashboard from './app/components/dashboard';
import MainSection from './app/components/mainSection';
import Collection from './app/components/collections/collection';

import {AUTH_USER} from './app/actions/actionTypes';

import * as handleRouteEntry from './app/actions/route_entry';

import 'bootstrap/dist/js/bootstrap.min';
import "font-awesome/scss/font-awesome.scss";
import './index.scss';

const token = localStorage.getItem('token');

if (token) {
  store.dispatch({type: AUTH_USER});
}

ReactDOM.render(
  <Provider store={store}>
    <Router history={hashHistory}>
      <Route path="/">
        <Route path="signin" component={Signin}/>
        <Route path="signout" component={Signout}/>
        <Route path="admin" component={requireAuth(MainSection)}>
          <Route path="404" component={NotFound}/>
          <Route path=":collection" component={Collection} onEnter={handleRouteEntry.onCollectionEnter} onChange={handleRouteEntry.onDocumentChange} onLeave={handleRouteEntry.onCollectionLeave}>
            <Route path="add"/>
            <Route path=":_id">
              <IndexRedirect to="change"/>
              <Route path="change"/>
              <Route path="history" onEnter={handleRouteEntry.onHistoryEnter} onLeave={handleRouteEntry.onHistoryLeave}/>
              <Route path="delete" onEnter={handleRouteEntry.onDeleteEnter}/>
            </Route>
          </Route>
          <IndexRoute component={Dashboard} onEnter={handleRouteEntry.onAdminEnter}/>
        </Route>
        <Route path="*" component={NotFound}/>
        <IndexRedirect to="signin"/>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
);
