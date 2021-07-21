import {combineReducers} from 'redux';
import labelReducer from './label';
import projectReducer from './project';

export default combineReducers({
  labels: labelReducer,
  projects: projectReducer,
});
