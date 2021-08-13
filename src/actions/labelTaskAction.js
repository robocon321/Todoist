import * as types from '../constants/actionType';
import * as db from '../database/labelTaskDB';

export const insert = data => {
  return {
    type: types.ADD_LABEL_TASK,
    data,
  };
};

export const update = data => {
  return {
    type: types.UPDATE_LABEL_TASK,
    data,
  };
};

export const remove = id => {
  return {
    type: types.DELETE_LABEL_TASK,
    id,
  };
};

export const queryAll = dispatch => {
  return async () => {
    await db
      .queryAll()
      .then(result => {
        return dispatch({
          type: types.QUERY_LABEL_TASK,
          data: result,
        });
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: types.QUERY_LABEL_TASK,
          data: [],
        });
      });
  };
};
