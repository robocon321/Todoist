import * as types from '../constants/actionType';
import * as db from '../database/projectDB';

var init = [];

const projectReducer = (state = init, action) => {
  switch (action.type) {
    case types.ADD_PROJECT:
      break;
    case types.DELETE_PROJECT:
      break;
    case types.UPDATE_PROJECT:
      break;
    case types.QUERY_PROJECT:
      break;
    default:
      break;
  }
  return state;
};

export default projectReducer;
