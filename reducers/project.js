import * as types from '../constants/actionType';
import * as db from '../database/projectDB';

var init = [];

const projectReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_PROJECT:
      db.insert(action.data)
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log(err));
      break;
    case types.DELETE_PROJECT:
      db.remove(action.id)
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log(err));
      break;
    case types.UPDATE_PROJECT:
      db.update(action.date)
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log(err));
      break;
    default:
      break;
  }
  return [...state];
};

export default projectReducer;
