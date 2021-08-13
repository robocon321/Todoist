import * as api from './axiosApi';
import {ACCOUNT} from '../constants/others';

export const insert = (callback, data) => {
  api.insertData(callback, ACCOUNT, data);
};

export const get = (callback, data) => {
  api.getData(callback, ACCOUNT, data);
};
