import * as types from '../constants/actionType';
import * as db from '../database/accountDB';

export const insert = data => {
  return {
    type: types.ADD_ACCOUNT,
    data,
  };
};

export const update = data => {
  return {
    type: types.UPDATE_ACCOUNT,
    data,
  };
};

export const remove = id => {
  return {
    type: types.DELETE_ACCOUNT,
    id,
  };
};

export const queryAll = dispatch => {
  return async () => {
    await db
      .queryAll()
      .then(result => {
        return dispatch({
          type: types.QUERY_ACCOUNT,
          data: result,
        });
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: types.QUERY_ACCOUNT,
          data: [],
        });
      });
  };
};
