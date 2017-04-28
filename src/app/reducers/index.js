import {combineReducers} from 'redux';
import {modelsReducer, collectionsReducer, relatedModelReducer, alertsReducer, historyReducer} from './models';
import authReducer from './auth';
import {reducer as form} from 'redux-form';

const rootReducer = combineReducers({
  form,
  models: modelsReducer,
  history: historyReducer,
  collection: collectionsReducer,
  related: relatedModelReducer,
  alerts: alertsReducer,
  auth: authReducer
});

export default rootReducer;
