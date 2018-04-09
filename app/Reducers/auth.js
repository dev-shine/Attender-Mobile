const InitialState = {
  token: '',
  user: {},
};

const Auth = (state = InitialState, action = {}) => {
  switch (action.type) {
    case 'SET_AUTH':
      return {
        ...state,
        token: action.payload,
      };
      case 'SET_USER':
    return {
      ...state,
      user: action.payload,
    };
    default:
      return state;
  }
};

export default Auth;
