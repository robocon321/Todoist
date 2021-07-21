import * as types from '../constants/actionType';
import * as db from '../database/labelDB';


export const insert = data => {
  return {
    type: types.ADD_LABEL,
    data,
  };
};

export const update = data => {
  return {
    type: types.UPDATE_LABEL,
    data,
  };
};

export const remove = id => {
  return {
    type: types.DELETE_LABEL,
    id,
  };
};

export const queryAll = dispatch => {
  return {
    type: types.QUERY_LABEL,
    data: async () => {
      await db
        .queryAll()
        .then(result => {
          return dispatch({
            data: result,
          });
        })
        .catch(err => {
          console.log(err);
          return dispatch({
            data: [],
          });
        });
    },
  };
};
