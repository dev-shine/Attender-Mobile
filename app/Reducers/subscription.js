const InitialState = {
  loading: false,
  isSubscribed: false,
  subscription: {},
  staffSubscription: [],
};

const Subscription = (state = InitialState, action = {}) => {
  switch (action.type) {
    case 'CHECK_SUBSCRIPTION':
      return {
        ...state,
        isSubscribed: action.payload,
      };
    case 'LOADING_SUBSCRIPTION':
      return {
        ...state,
        loading: action.payload,
      }
    case 'SET_SUBSCRIPTION':
      return {
        ...state,
        subscription: action.payload,
      }
     case 'SET_STAFF_SUBSCRIPTION':
      return {
        ...state,
        staffSubscription: action.payload,
      }
    default:
      return state;
  }
};

export default Subscription;
