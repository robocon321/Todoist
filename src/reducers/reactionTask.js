import * as types from '../constants/actionType';
import * as db from '../database/reactionTaskDB';

var init = [];

const reactionTaskReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_REACTION_TASK:
      db.insert(action.data)
        .then(result => {
          if (result) console.log('Save success!');
        })
        .catch(err => console.log(err));
      break;
    case types.DELETE_REACTION_TASK:
      db.remove(action.id)
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log(err));
      break;
    case types.UPDATE_REACTION_TASK:
      db.update(action.date)
        .then(result => {
          console.log(result);
        })
        .catch(err => console.log(err));
      break;
    case types.QUERY_REACTION_TASK:
      state = action.data;
      break;
    default:
      break;
  }
  return [...state];
};

export default reactionTaskReducer;
