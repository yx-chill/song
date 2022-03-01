import axios from 'axios';
import storage from '@/includes/storage';

const refreshToken = () => axios({
  method: 'post',
  url: 'https://api.sally-handmade.com/music/v1/admin/refresh',
  data: { refresh_token: storage.get('adminRefresh') },
});

const instance = axios.create({
  baseURL: 'https://api.sally-handmade.com/music/',
  timeout: 10000,
});

instance.interceptors.request.use((config) => {
  // eslint-disable-next-line no-param-reassign
  config.headers.Authorization = `Bearer ${storage.get('adminToken')}`;
  return config;
},
(err) => {
  console.log(err);
});

let isRefreshing = false;
let requests = [];

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (!err.response) return Promise.reject(err);
    const { config } = err;
    if (err.response.status === 401) {
      if (!isRefreshing) {
        isRefreshing = true;
        refreshToken().then((res) => {
          storage.set('adminToken', res.data.access_token);
          storage.set('adminRefresh', res.data.refresh_token);
          config.headers.Authorization = `Bearer ${res.data.access_token}`;

          requests.forEach((item) => item(res.data.access_token));
          requests = [];
        }).catch(() => {
          alert('因長時間未上線，請重新登入');
          storage.remove('adminToken');
          storage.remove('adminRefresh');
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
    return Promise.reject(err);
  },
);

export const get = (url, params = {}) => instance.get(url, { params });

export const post = (url, data = {}, config) => instance.post(url, data, config);

export const del = (url, params = {}) => instance.delete(url, { params });
