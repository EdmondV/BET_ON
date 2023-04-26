const identity = (i) => i;
const PROMISE = '@@redux-form-saga/PROMISE';
const status = ['REQUEST', 'SUCCESS', 'FAILURE'];

export default function createAction(requestAction, useAnalytics = true, category = 'general') {
  const actionMethods = {};
  const formAction = (payload) => ({
    type: PROMISE,
    payload,
  });

  if (typeof requestAction === 'string') {
    requestAction = status.map((s) => { // eslint-disable-line
      const a = `${requestAction}_${s}`;
      const subAction = (payload) => ({
        type: a,
        meta: useAnalytics ? {
          analytics: {
            type: a,
            payload: {
              category,
            },
          },
        } : null,
        payload: identity(payload),
      });

      actionMethods[s] = a;
      actionMethods[s.toLowerCase()] = subAction;

      return subAction;
    })[0];
  }

  return Object.assign((data, dispatch) => new Promise((resolve, reject) => {
    dispatch(formAction({
      request: requestAction(data),
      defer: { resolve, reject },
      types: [actionMethods.SUCCESS, actionMethods.FAILURE],
    }));
  }), actionMethods);
}
