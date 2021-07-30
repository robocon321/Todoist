import * as types from '../constants/actionType';
import * as db from '../database/labelDB';

export const insert = data => {
  return {
    type: types.ADD_COMMENT_TASK,
    data,
  };
};

export const update = data => {
  return {
    type: types.UPDATE_COMMENT_TASK,
    data,
  };
};

export const remove = id => {
  return {
    type: types.DELETE_COMMENT_TASK,
    id,
  };
};

export const queryAll = dispatch => {
  return async () => {
    await db
      .queryAll()
      .then(result => {
        return dispatch({
          type: types.QUERY_COMMENT_TASK,
          data: result,
        });
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: types.QUERY_COMMENT_TASK,
          data: [],
        });
      });
  };
};
