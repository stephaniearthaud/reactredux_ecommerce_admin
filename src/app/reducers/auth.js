import {AUTH_USER, UNAUTH_USER} from '../actions/actionTypes';

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_USER:
      return Object.assign({}, state, {error: '', authenticated: true});
    case UNAUTH_USER:
      return Object.assign({}, state, {error: action.payload, authenticated: false});
    default:
      return state;
  }
}
