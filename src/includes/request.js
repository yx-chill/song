import axios from 'axios';
import storage from '@/models/storage';

const refreshToken = () => axios({
  method: 'post',
  url: 'https://api.sally-handmade.com/music/v1/refresh',
  data: { refresh_token: storage.get('userRefreshToken') },
});

const instance = axios.create({
  baseURL: 'https://api.sally-handmade.com/music/',
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${storage.get('userToken')}`;
  return config;
});

let isRefreshing = false;
let requests = [];

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const { config } = err;
    if (err.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshToken().then((res) => {
          storage.set('userToken', res.data.access_token);
          storage.set('userRefreshToken', res.data.refresh_token);
          config.headers.Authorization = `Bearer ${res.data.access_token}`;

          requests.forEach((item) => item(res.data.access_token));
          requests = [];
        }).catch(() => {
          storage.remove('userToken');
          storage.remove('userRefreshToken');
          alert('因長時間未上線，請重新登入');
        }).finally(() => {
          isRefreshing = false;
        });
        return new Promise((resolve) => {
          instance(config).then((response) => resolve(response));
        });
      // eslint-disable-next-line no-else-return
      } else {
        return new Promise((resolve) => {
          requests.push((token) => {
            config.headers.Authorization = `Bearer ${token}`;
            instance(config).then((res) => resolve(res));
          });
        });
      }
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

export const get = (url, params = {}) => instance.get(url, { params });

export const post = (url, data = {}, config) => instance.post(url, data, config);
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
