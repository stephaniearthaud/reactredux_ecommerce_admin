import * as types from './actionTypes';
import * as api from '../api/AuthApi';
import {hashHistory} from 'react-router';

export function signInUser({email, password}) {
  return dispatch => {
    api.signInUser(email, password)
    .then(response => {
      const token = response.headers['x-auth'];
      localStorage.setItem('token', token);
      dispatch({
        type: types.AUTH_USER
      });
      hashHistory.push('/admin');
    })
    .catch(() => {
      dispatch(authError('Bad Login Info'));
    });
  };
}

// currently not using this action
export function verifyJwt(token) {
  return dispatch => {
    api.verifyJwt(token)
    .then(() => {
      dispatch({
        type: types.AUTH_USER
      });
    })
    .catch(() => {
      localStorage.removeItem('token');
      dispatch({
        type: types.UNAUTH_USER
      });
    });
  };
}

export function signUpUser({email, password}) {
  return dispatch => {
    api.signUpUser(email, password)
    .then(response => {
      dispatch({
        type: types.AUTH_USER
      });
      localStorage.setItem('token', response.data.token);
      hashHistory.push('/admin');
    })
    .catch(({response}) => {
      dispatch(authError(response.data.error));
    });
  };
}

export function signOutUser() {
  return dispatch => {
    // without 2nd then, 1st then and catch would have duplicate code
    api.signOutUser()
    .then(() => {})
    .catch(() => {})
    .then(() => {
      localStorage.removeItem('token');
      dispatch({
        type: types.UNAUTH_USER
      });
    });
  };
}

export function authError(error) {
  return {
    type: types.UNAUTH_USER,
    payload: error
  };
}
