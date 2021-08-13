/* eslint-disable no-fallthrough */
import * as types from '../constants/actionType';
import * as db from '../database/taskDB';

let init = [];

const taskReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      db.insert(action.data)
        .then(result => {
          if (result) console.log('Save success!');
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_TASK:
      db.update(action.data)
        .then(result => {
          if (result) {
            console.log('Update success!');
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_STATUS_TASK:
      db.updateStatusTask(action.id, action.status)
        .then(result => {
          if (result) {
            console.log('Update success!');
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_TIME_TASK:
      db.updateTimeTask(action.id, action.time)
        .then(result => {
          if (result) {
            console.log('Update success!');
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.DELETE_TASK:
      db.remove(action.id)
        .then(result => {
          if (result) {
            console.log('Delete success!');
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.QUERY_TASK:
      state = action.data;
      break;
    default:
      break;
  }

  return [...state];
};

export default taskReducer;
