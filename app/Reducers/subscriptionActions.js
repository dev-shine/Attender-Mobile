import TOKEN from 'API';

export function checkSubscription(subscriptionType, callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    
    return apix.get('subscription/check', { subscriptionType })
      .then(data => {
        callback(data.data);
      })
      .catch(err => {
        callback({ status: false});
      });
  };
}

export function checkStaffSubscription(subscriptionType, staffId, callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    
    return apix.get('subscription/checkStaff', { subscriptionType, staffId })
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
    return apix.get('subscription/all', { subscriptionType: 'MANAGE_STAFF' })
      .then(data => {
        console.log(data);
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

export function subscribeManage(staffId, callback) {
  return (dispatch, getState, { api }) => {
    const apix = api(TOKEN.REQUEST_TOKEN);
    return apix.post('subscription/subscribe', { subscriptionType: 'MANAGE_STAFF', staffId })
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