import * as types from '../constants/actionType';
import * as db from '../database/accountDB';

let init = [];

const accountReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_ACCOUNT:
      db.insert(action.data)
        .then(result => {
          if (result) console.log('Save success!');
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_ACCOUNT:
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
    case types.DELETE_ACCOUNT:
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
    case types.QUERY_ACCOUNT:
      state = action.data;
      break;
    default:
      break;
  }

  return [...state];
};

export default accountReducer;
