import axios from 'axios';

const instance = axios.create({
  baseURL: 'https://api.sally-handmade.com/music',
  timeout: 10000,
});

instance.interceptors.response.use(
  (res) => res,
  async (e) => {
    // 每一次接收響應，都檢查 HTTP 狀態
    if (e?.response?.status === 401) {
      // 刷新Token
    }
    return Promise.reject(e);
  },
);

export const get = (url, params = {}) => new Promise((resolve, reject) => {
  instance.get(url, { params }).then((response) => {
    resolve(response.data);
  }, (err) => {
    reject(err);
  });
});

export const post = (url, data = {}) => new Promise((resolve, reject) => {
  instance.post(url, data, {
    headers: { Accept: 'application/json' },
  }).then((response) => {
    resolve(response.data);
  }, (err) => {
    reject(err);
  });
});
