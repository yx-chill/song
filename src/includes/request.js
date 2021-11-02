import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.sally-handmade.com/music',
  timeout: 10000,
});

export const get = (url, params = {}) => new Promise((resolve, reject) => {
  instance.get(url, { params }).then((response) => {
    resolve(response.data);
  }, (err) => {
    reject(err);
  });
});

export const post = (url, data = {}) => new Promise((resolve, reject) => {
  instance.post(url, data, {
    headers: { Accept: 'multipart/form-data' },
  }).then((response) => {
    resolve(response.data);
  }, (err) => {
    reject(err);
  });
});
