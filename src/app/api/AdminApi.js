import axios from 'axios';

import {config, API_URL} from './config';

export const getModels = () => {
  return axios.get(`${API_URL}/admin`, config());
};

export const getOneModel = collection => {
  return axios.get(`${API_URL}/admin/${collection}`, config());
};

export const getDocumentHistory = params => {
  return axios.get(`${API_URL}/admin/${params.collection}/${params._id}`, config());
};

export const updateDocument = (params, body) => {
  return axios.put(`${API_URL}/admin/${params.collection}/${params._id}`, body, config());
};

export const addDocument = (params, body) => {
  return axios.post(`${API_URL}/admin/${params.collection}`, body, config());
};

export const getRelatedModels = params => {
  return axios.get(`${API_URL}/admin/${params.collection}/${params._id}/delete`, config());
};

export const deleteDocument = params => {
  return axios.delete(`${API_URL}/admin/${params.collection}/${params._id}`, config());
};
