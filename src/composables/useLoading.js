import { ref } from 'vue';

const show = ref(false);
const msg = ref('');

// const showLoading = (message) => {
//   show.value = true;
//   msg.value = message;
// };
// const hideLoading = () => {
//   show.value = false;
//   msg.value = '';
// };
// eslint-disable-next-line import/prefer-default-export
export function useLoad() {
  return { show, msg };
}

export function showLoading(message = '') {
  show.value = true;
  msg.value = message;
}

export function hideLoading() {
  show.value = false;
  msg.value = '';
}
