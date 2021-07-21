import * as types from '../constants/actionType';
import * as db from '../database/labelDB';

let init = [];

const labelReducer = (state = init, action) => {
  let isSuccess = false;

  switch (action.type) {
    case types.ADD_LABEL:
      db.insert(action.data)
        .then(result => {
          console.log(result);
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_LABEL:
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
    case types.DELETE_LABEL:
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
    case types.QUERY_LABEL:
      state = action.data;
      break;
    default:
      break;
  }

  return [...state];
};

export default labelReducer;
