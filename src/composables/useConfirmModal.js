import { ref } from 'vue';
import mitt from 'mitt';

const confirmEvents = mitt();

const showModal = ref(false);
const handleSuccess = () => {
  confirmEvents.emit('success');
};
const handleCancel = () => {
  confirmEvents.emit('cancel');
};

// eslint-disable-next-line import/prefer-default-export
export function useConfirmModal() {
  return { showModal, handleSuccess, handleCancel };
}

export function useConfirm() {
  showModal.value = true;
  return new Promise((resolve) => {
    confirmEvents.on('success', () => {
      resolve(true);
    });
    confirmEvents.on('cancel', () => {
      resolve(false);
    });
  });
}
