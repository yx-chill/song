import axios from 'axios';
import storage from '@/models/storage';

const refreshToken = () => axios({
  method: 'post',
  url: 'https://api.sally-handmade.com/music/v1/admin/refresh',
  data: { refresh_token: storage.get('adminRefresh') },
});

const instance = axios.create({
  baseURL: 'https://api.sally-handmade.com/music/',
  headers: { Authorization: `Bearer ${storage.get('adminToken')}` },
  timeout: 10000,
});

instance.interceptors.response.use(
  (res) => res,
  (err) => {
    const { config } = err;
    if (!err.response) return Promise.reject(err);
    if (err.response.status === 401) {
      return new Promise((resolve) => {
        refreshToken().then((res) => {
          storage.set('adminToken', res.data.access_token);
          storage.set('adminRefresh', res.data.refresh_token);
          config.headers.Authorization = `Bearer ${res.data.access_token}`;
          instance(config).then((response) => resolve(response));
        }).catch(() => {
          alert('因長時間未上線，請重新登入');
        });
      });
    }
    return Promise.reject(err);
  },
);

export const get = (url, params = {}) => instance.get(url, { params });

export const post = (url, data = {}, config) => instance.post(url, data, config);

export const del = (url, params = {}) => instance.delete(url, { params });
