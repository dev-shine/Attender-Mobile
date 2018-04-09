import { combineReducers } from 'redux';
import Auth from './auth';
import Subscription from './subscription';

const Reducer = combineReducers({
  Auth,
  Subscription,
});

export default Reducer;
