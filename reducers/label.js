import * as types from '../constants/actionType';
import * as db from '../database/labelDB';

var init = [];
const labelReducer = (state = init, action) => {
  const queryAll = () => {
    db.queryAll()
      .then(result => {
        state = result;
        return [...state];
      })
      .catch(err => {
        console.log('Error', err);
        return [...state];
      });
  };

  switch (action.type) {
    case types.ADD_LABEL:
      db.insert(action.data)
        .then(result => {
          if (result) {
            return queryAll();
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    case types.UPDATE_LABEL:
      db.update(action.data)
        .then(result => {
          if (result) {
            return queryAll();
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
            return queryAll();
          }
        })
        .catch(err => {
          console.log('Error', err);
        });
      break;
    default:
      break;
  }
  return state;
};

export default labelReducer;
