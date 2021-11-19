<template>
  <div class="absolute inset-0 flex justify-center items-center">
    <div class="w-full max-w-md p-6 overflow-hidden text-left bg-white
      align-middle transition-all transform shadow-xl rounded-2xl"
      enter="duration-300 ease-out"
      enter-from="opacity-0 scale-95"
      enter-to="opacity-100 scale-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100 scale-100"
      leave-to="opacity-0 scale-95">
      <div class="mt-2">
        <p class="text-sm text-gray-500">確定要刪除嗎?</p>
      </div>
      <div class="mt-4">
        <button type="button" class="inline-flex justify-center px-4 py-2 text-sm
          font-medium text-green-900 bg-green-100 border border-transparent rounded-md
          hover:bg-green-200 focus:outline-none focus-visible:ring-2 mr-3
          focus-visible:ring-offset-2 focus-visible:ring-blue-500"
          @click.prevent="deleteData">確定</button>
        <button type="button" class="inline-flex justify-center px-4 py-2 text-sm font-medium
          text-red-900 bg-red-100 border border-transparent rounded-md hover:bg-red-200
            focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2
            focus-visible:ring-blue-500" @click.prevent="cancel">取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Modal',
  props: [],
  emits: ['deleteData', 'cancel'],
  setup(props, { emit }) {
    const deleteData = () => {
      emit('deleteData');
    };
    const cancel = () => {
      emit('cancel');
    };
    return { deleteData, cancel };
  },
};
</script>
