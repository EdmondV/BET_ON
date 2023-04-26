import { store } from '../app';

export function promisedAction(action, data = {}) {
  return action(data, store.dispatch);
}
