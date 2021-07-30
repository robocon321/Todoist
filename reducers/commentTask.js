import * as types from '../constants/actionType';
import * as db from '../database/labelDB';

let init = [];

const commentTaskReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_COMMENT_TASK:
      db.insert(action.data)
        .then(result => {
          if (result) console.log('Save success!');
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_COMMENT_TASK:
      db.update(action.data)
        .then(result => {
          if (result) {
            console.log(result);
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.DELETE_COMMENT_TASK:
      db.remove(action.id)
        .then(result => {
          if (result) {
            console.log(result);
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.QUERY_COMMENT_TASK:
      state = action.data;
      break;
    default:
      break;
  }

  return [...state];
};

export default commentTaskReducer;
