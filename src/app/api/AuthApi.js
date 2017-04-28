import axios from 'axios';

import {config, API_URL} from './config';

export function signInUser(email, password) {
  return axios.post(`${API_URL}/auth/signin`, {email, password});
}

// not being used
export function verifyJwt(token) {
  return axios.get(`${API_URL}/auth/signin`, {headers: {'x-auth': token}});
}

export function signOutUser() {
  return axios.delete(`${API_URL}/auth/signout`, config());
}
