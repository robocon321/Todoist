import {API_URL, SECRET} from '../constants/others';
import {EJSON} from 'bson';
const axios = require('axios');

export const getData = async (callback, collection, data = {}) => {
  await axios
    .get(`${API_URL}/${collection}?secret=${SECRET}&action=get`, {
      params: {
        data: EJSON.stringify(data, {relaxed: false}),
      },
    })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(null);
    });
};

export const insertData = async (callback, collection, data = {}) => {
  await axios
    .get(`${API_URL}/${collection}?secret=${SECRET}&action=insert`, {
      params: {
        data: EJSON.stringify(data, {relaxed: false}),
      },
    })
    .then(function (response) {
      callback(response.data);
    })
    .catch(function (error) {
      callback(null);
    });
};
