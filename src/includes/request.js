import axios from 'axios';
import storage from '@/models/storage';

const refreshToken = () => axios({
  method: 'post',
  url: 'https://api.sally-handmade.com/music/v1/refresh',
  data: { refresh_token: storage.get('userRefreshToken') },
});

const instance = axios.create({
  baseURL: 'https://api.sally-handmade.com/music/',
  headers: { Authorization: `Bearer ${storage.get('userToken')}` },
  timeout: 10000,
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const { config } = err;
    if (!err.response) return Promise.reject(err);
    if (err.response.status === 401) {
      console.log(401);
      return new Promise((resolve) => {
        refreshToken().then((res) => {
          storage.set('userToken', res.data.access_token);
          storage.set('userRefreshToken', res.data.refresh_token);
          config.headers.Authorization = `Bearer ${res.data.access_token}`;
          instance(config).then((response) => resolve(response));
        }).catch((error) => {
          console.log(error);
          alert('因長時間未上線，請重新登入');
        });
      });
    }
    if (!window.navigator.onLine) {
      alert('網路出了點問題，請重新連線後重整網頁');
    }
    return Promise.reject(err);
  },
);

export default (method, url, data = null, config) => {
  // eslint-disable-next-line no-param-reassign
  method = method.toLowerCase();
  switch (method) {
    case 'post':
      return instance.post(url, data, config);
    case 'get':
      return instance.get(url, { params: data });
    case 'delete':
      return instance.delete(url, { params: data });
    case 'put':
      return instance.put(url, data);
    case 'patch':
      return instance.patch(url, data);
    default:
      console.log(`未知的 method: ${method}`);
      return false;
  }
};
// export const get = (url, params = {}) => new Promise((resolve, reject) => {
//   instance.get(url, { params }).then((response) => {
//     resolve(response.data);
//   }, (err) => {
//     reject(err);
//   });
// });

// export const post = (url, data = {}) => new Promise((resolve, reject) => {
//   instance.post(url, data, {
//     headers: { Accept: 'application/json' },
//   }).then((response) => {
//     resolve(response.data);
//   }, (err) => {
//     reject(err);
//   });
// });
