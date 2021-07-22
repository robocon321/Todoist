import * as types from '../constants/actionType';
import * as db from '../database/taskDB';

let init = [];

const taskReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_TASK:
      db.insert(action.data)
        .then(result => {
          if (result) alert('Save success!');
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_TASK:
      db.update(action.data)
        .then(result => {
          if (result) {
            alert('Update success!');
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
            alert('Delete success!');
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
