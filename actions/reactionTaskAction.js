import * as types from '../constants/actionType';
import * as db from '../database/reactionTaskDB';

export const insert = data => {
  return {
    type: types.ADD_REACTION_TASK,
    data,
  };
};

export const update = data => {
  return {
    type: types.UPDATE_REACTION_TASK,
    data,
  };
};

export const remove = id => {
  return {
    type: types.DELETE_REACTION_TASK,
    id,
  };
};

export const queryAll = dispatch => {
  return async () => {
    await db
      .queryAll()
      .then(result => {
        return dispatch({
          type: types.QUERY_REACTION_TASK,
          data: result,
        });
      })
      .catch(err => {
        console.log('Query error', err);
        return dispatch({
          type: types.QUERY_REACTION_TASK,
          data: [],
        });
      });
  };
}