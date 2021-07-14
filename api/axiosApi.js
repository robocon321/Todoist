const axios = require('axios');
require('dotenv').config();

const url = process.env.API_URL;
const secret = process.env.SECRET;

export const getData = async (collection, data = {}) => {
  await axios
    .get(`${url}/${collection}?secret=${secret}&action=get`, {
      params: {id: 2, type: 1, name: 'Name', avatar: 'png'},
    })
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log('Error: ', error);
      return null;
    });
};

export const insertData = async (collection, data = {}) => {
  await axios
    .get(`${url}/${collection}?secret=${secret}&action=insert`, {params: data})
    .then(function (response) {
      return response.data;
    })
    .catch(function (error) {
      console.log('Error: ', error);
      return false;
    });
};
