import * as types from '../constants/actionType';
import * as db from '../database/taskDB';

export const insert = data => {
  return {
    type: types.ADD_TASK,
    data,
  };
};

export const update = data => {
  return {
    type: types.UPDATE_TASK,
    data,
  };
};

export const updateStatusTask = (id, status) => {
  return {
    type: types.UPDATE_STATUS_TASK,
    id,
    status,
  };
};

export const updateTimeTask = (id, time) => {
  return {
    type: types.UPDATE_TIME_TASK,
    id,
    time,
  };
};

export const remove = id => {
  return {
    type: types.DELETE_TASK,
    id,
  };
};

export const queryAll = dispatch => {
  return async () => {
    await db
      .queryAll()
      .then(result => {
        return dispatch({
          type: types.QUERY_TASK,
          data: result,
        });
      })
      .catch(err => {
        console.log(err);
        return dispatch({
          type: types.QUERY_TASK,
          data: [],
        });
      });
  };
};
