import * as types from '../constants/actionType';
import * as db from '../database/labelTaskDB';

let init = [];

const labelTaskReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_LABEL_TASK:
      db.insert(action.data)
        .then(result => {
          if (result) alert('Save success!');
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_LABEL_TASK:
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
    case types.DELETE_LABEL_TASK:
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
    case types.QUERY_LABEL_TASK:
      state = action.data;
      break;
    default:
      break;
  }

  return [...state];
};

export default labelTaskReducer;
