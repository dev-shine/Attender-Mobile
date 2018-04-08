import TOKEN from 'API';

export function checkSubscription(callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    return apix.get('subscription/check')
      .then(data => {
        callback(data.data);
      })
      .catch(err => {
        callback({ status: false});
      });
  };
}

export function getStaffSubscriptions(callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    return apix.post('subscription/all', { subscriptionType: 'MANAGE_STAFF' })
      .then(data => {
        callback(data.data);
      })
      .catch(err => {
        callback({ status: false});
      });
  };
}

export function subscribePremium(callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    return apix.post('subscription/subscribe', { subscriptionType: 'ACCOUNT_PREMIUM' })
      .then(data => {
        callback(data);
      })
      .catch(err => {
        callback({ status: false });
      });
  };
}

export function cancelPremium(callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    return apix.post('subscription/cancel', { subscriptionType: 'ACCOUNT_PREMIUM' })
      .then(data => {
        callback(data);
      })
      .catch(err => {
        callback({ status: false });
      });
  };
}

export function cancelManage(staffId, callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    return apix.post('subscription/cancel', { subscriptionType: 'MANAGE_STAFF', staffId })
      .then(data => {
        callback(data);
      })
      .catch(err => {
        callback({ status: false });
      });
  };
}