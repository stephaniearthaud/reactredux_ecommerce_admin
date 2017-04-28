import * as types from './actionTypes';
import * as api from '../api/AdminApi';
import {hashHistory} from 'react-router';

export function getModels() {
  return dispatch => {
    api.getModels()
    .then(response => {
      dispatch({
        type: types.GET_MODELS,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch(handleErrors(err));
    });
  };
}

export function getOneModel({collection, _id}) {
  return dispatch => {
    api.getOneModel(collection)
    .then(response => {
      dispatch({
        type: types.GET_COLLECTION,
        payload: response.data
      });
      if (_id) {
        const foundDoc = response.data.documents.find(doc => doc._id === _id);
        if (foundDoc) {
          dispatch(getOneDocument(foundDoc));
        } else {
          return Promise.reject();
        }
      }
    })
    .catch(() => {
      // document or collection does not exist
      hashHistory.push(`/admin/404`);
    });
  };
}

export function clearCollection() {
  return {
    type: types.CLEAR_COLLECTION
  };
}

export function getOneDocument(foundDoc) {
  return {
    type: types.GET_DOCUMENT,
    payload: foundDoc
  };
}

export function getDocumentHistory(params) {
  return dispatch => {
    api.getDocumentHistory(params)
    .then(response => {
      dispatch({
        type: types.GET_HISTORY,
        payload: response.data
      });
    }).catch(err => {
      if (err.response.status === 404) {
        // document does not exist
        hashHistory.push(`/admin/404`);
      } else {
        dispatch(handleErrors(err));
      }
    });
  };
}

export function clearDocumentHistory() {
  return {
    type: types.CLEAR_DOC_HISTORY
  };
}

export function updateDocument(params, body, nextRoute, {single}) {
  return dispatch => {
    api.updateDocument(params, body)
    .then(response => {
      dispatch({
        type: types.UPDATE_DOCUMENT,
        payload: response.data
      });
      switch (nextRoute) {
        case 'form-save-edit':
          dispatch(getOneDocument(response.data.document));
          hashHistory.push(`/admin/${params.collection}/${response.data.document._id}/change`);
          dispatch({
            type: types.NEW_ALERT,
            payload: {message: `The ${single} "${response.data.document.name}" was changed successfully. You may edit it again below.`}
          });
          break;
        case 'form-save-add':
          dispatch(clearForm());
          hashHistory.push(`/admin/${params.collection}/add`);
          dispatch({
            type: types.NEW_ALERT,
            payload: {message: `The ${single} "${response.data.document.name}" was changed successfully. You may add another ${single} below.`}
          });
          break;
        default:
          hashHistory.push(`/admin/${params.collection}`);
          dispatch({
            type: types.NEW_ALERT,
            payload: {message: `The ${single} "${response.data.document.name}" was changed successfully.`}
          });
      }
    })
    .catch(err => {
      dispatch(handleErrors(err));
      dispatch(clearAlerts());
    });
  };
}

export function holdFormData(body) {
  return {
    type: types.HOLD_DATA,
    payload: body
  };
}

export function addDocument(params, body, nextRoute, {single}) {
  return dispatch => {
    api.addDocument(params, body)
    .then(response => {
      dispatch({
        type: types.ADD_DOCUMENT,
        payload: response.data
      });
      switch (nextRoute) {
        case 'form-save-edit':
          dispatch(getOneDocument(response.data.document));
          hashHistory.push(`/admin/${params.collection}/${response.data.document._id}/change`);
          dispatch({
            type: types.NEW_ALERT,
            payload: {message: `The ${single} "${response.data.document.name}" was added successfully. You may edit it again below.`}
          });
          break;
        case 'form-save-add':

          dispatch(clearForm());
          hashHistory.push(`/admin/${params.collection}/add`);
          dispatch({
            type: types.NEW_ALERT,
            payload: {message: `The ${single} "${response.data.document.name}" was added successfully. You may add another ${single} below.`}
          });
          break;
        default:
          hashHistory.push(`/admin/${params.collection}`);
          dispatch({
            type: types.NEW_ALERT,
            payload: {message: `The ${single} "${response.data.document.name}" was added successfully.`}
          });
      }
    })
    .catch(err => {
      dispatch(handleErrors(err));
      dispatch(clearAlerts());
    });
  };
}

export function getRelatedModels(params) {
  return dispatch => {
    api.getRelatedModels(params)
    .then(response => {
      dispatch({
        type: types.GET_RELATED,
        payload: response.data
      });
    })
    .catch(err => {
      dispatch(handleErrors(err));
    });
  };
}

export function deleteDocument(params, {single}) {
  return dispatch => {
    api.deleteDocument(params).then(response => {
      dispatch(clearForm());
      dispatch(clearRelated());
      dispatch({
        type: types.DELETE_DOCUMENT,
        payload: response.data
      });
      hashHistory.push(`/admin/${params.collection}`);
      dispatch({
        type: types.NEW_ALERT,
        payload: {message: `The ${single} "${response.data.name}" was deleted successfully.`}
      });
    })
    .catch(err => {
      dispatch(handleErrors(err));
      dispatch(clearAlerts());
    });
  };
}

export function handleErrors({response}) {
  if (response.status === 401) {
    return {
      type: types.UNAUTH_USER,
      payload: response.data.access_error
    };
  }
  return {
    type: types.HANDLE_ERRORS,
    payload: response.data.errors
  };
}

export function clearFormErrors() {
  return {
    type: types.HANDLE_ERRORS,
    payload: {}
  };
}

export function clearForm() {
  return {
    type: types.CLEAR_FORM,
    playload: {}
  };
}

export function clearRelated() {
  return {
    type: types.CLEAR_RELATED,
    payload: {}
  };
}

export function clearAlerts() {
  return {
    type: types.CLEAR_ALERTS,
    payload: {}
  };
}
