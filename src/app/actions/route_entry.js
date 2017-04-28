import * as actions from './index';
import {store} from '../../index';

export function onAdminEnter() {
  store.dispatch(actions.getModels());
}

export function onCollectionEnter({params}) {
  store.dispatch(actions.getOneModel(params));
}

export function onCollectionLeave() {
  store.dispatch(actions.clearCollection());
}

export function onDocumentChange(prevState, nextState) {
  // need to make sure data is fetched accordingly if routes are manually typed in
  if (!prevState.params._id || !nextState.params._id) {
    return null;
  }
  const idChanged = prevState.params._id !== nextState.params._id;
  if (idChanged) {
    store.dispatch(actions.getOneModel(nextState.params));
  }
}

export function onHistoryEnter({params}) {
  store.dispatch(actions.getDocumentHistory(params));
}

export function onHistoryLeave() {
  store.dispatch(actions.clearDocumentHistory());
}

export function onDeleteEnter({params}) {
  store.dispatch(actions.getRelatedModels(params));
}
