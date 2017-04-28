import * as types from '../actions/actionTypes';

export const modelsReducer = (state = [], action) => {
  switch (action.type) {
    case types.GET_MODELS:
      return action.payload.models;
    default:
      return state;
  }
};

const initColState = {
  form: [],
  documents: [],
  names: {},
  document: {}, // probably not the best naming choice
  formErrors: {},
  formData: {}
};
export const collectionsReducer = (state = initColState, action) => {
  switch (action.type) {
    case types.GET_COLLECTION:
      return {...state, ...action.payload};
    case types.CLEAR_COLLECTION:
      return initColState;
    case types.GET_DOCUMENT:
      return {
        ...state,
        document: action.payload
      };
    case types.ADD_DOCUMENT:
      return {
        ...state,
        documents: action.payload.documents,
        formErrors: {},
        formData: {},
        formStatus: 'none'
      };
    case types.DELETE_DOCUMENT:
      return {
        ...state,
        documents: state.documents.filter(doc => doc._id !== action.payload._id),
        deletedDoc: action.payload
      };
    case types.HOLD_DATA:
      return {
        ...state,
        formData: action.payload,
        formErrors: {},
        formStatus: 'submit'
      };
    case types.HANDLE_ERRORS:
      return {
        ...state,
        formStatus: 'none',
        formErrors: action.payload
      };
    case types.CLEAR_FORM:
      return {
        ...state,
        formErrors: {},
        formData: {},
        formStatus: 'none'
      };
    case types.UPDATE_DOCUMENT:
      return {
        ...state,
        document: {},
        formErrors: {},
        formStatus: 'none',
        documents: action.payload.documents
      };
    default:
      return state;
  }
};

const initHistState = {
  docHistory: [],
  history: []
};
export const historyReducer = (state = initHistState, action) => {
  switch (action.type) {
    case types.GET_MODELS:
      return {
        ...state,
        history: action.payload.history
      };
    case types.GET_HISTORY:
      return {
        ...state,
        docHistory: action.payload
      };
    case types.CLEAR_DOC_HISTORY:
      return {
        ...state,
        docHistory: []
      };
    default:
      return state;
  }
};

export const relatedModelReducer = (state = {}, action) => {
  switch (action.type) {
    case types.GET_RELATED:
      return action.payload;
    case types.CLEAR_RELATED:
      return action.payload;
    default:
      return state;
  }
};

export const alertsReducer = (state = {}, action) => {
  switch (action.type) {
    case types.NEW_ALERT:
      return action.payload;
    case types.CLEAR_ALERTS:
      return action.payload;
    default:
      return state;
  }
};
