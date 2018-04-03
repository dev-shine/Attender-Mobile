const InitialState = {
  token: '',
};

const Auth = (state = InitialState, action = {}) => {
  switch (action.type) {
    case 'GET_AUTH':
      return {
        ...state,
        token: action.payload,
      };
    default:
      return state;
  }
};

export default Auth;
