import * as types from '../constants/actionType';
import * as db from '../database/projectDB';

export const insert = data => {
  return {
    type: types.ADD_PROJECT,
    data,
  };
};

export const update = data => {
  return {
    type: types.UPDATE_PROJECT,
    data,
  };
};

export const remove = id => {
  return {
    type: types.DELETE_PROJECT,
    id,
  };
};

export const queryAll = dispatch => {
  return async () => {
    await db
      .queryAll()
      .then(result => {
        return dispatch({
          type: types.QUERY_PROJECT,
          data: result,
        });
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: types.QUERY_PROJECT,
          data: [],
        });
      });
  };
}