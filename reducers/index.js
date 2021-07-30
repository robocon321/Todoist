import {combineReducers} from 'redux';
import labelReducer from './label';
import projectReducer from './project';
import taskReducer from './task';
import labelTaskReducer from './labelTask';
import commentTaskReducer from './commentTask';

export default combineReducers({
  labels: labelReducer,
  projects: projectReducer,
  tasks: taskReducer,
  labelTasks: labelTaskReducer,
  commentTask: commentTaskReducer,
});
