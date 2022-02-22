<template>
  <div v-show="modelValue" class="absolute inset-0 flex justify-center items-center">
    <div class="w-full max-w-md p-6 overflow-hidden text-center bg-white
      align-middle transition-all transform shadow-xl rounded-2xl"
      enter="duration-300 ease-out"
      enter-from="opacity-0 scale-95"
      enter-to="opacity-100 scale-100"
      leave="duration-200 ease-in"
      leave-from="opacity-100 scale-100"
      leave-to="opacity-0 scale-95">
      <div class="mt-2">
        <i class="fa-solid fa-triangle-exclamation text-red-600 text-5xl mb-4"></i>
        <slot name="title">
          <p class="text-xl text-red-600 font-bold">確定要刪除嗎?</p>
        </slot>
      </div>
      <div class="mt-10">
        <div class="grid grid-cols-2 gap-4">
          <button type="button" class="inline-flex justify-center px-4 py-2 text-lg font-bold
            border border-gray-200 rounded-md hover:bg-gray-50 focus:outline-none
            focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            @click.prevent="cancel">取消</button>
          <button type="button" class="inline-flex justify-center px-4 py-2 text-lg font-bold
            text-red-900 bg-red-100 border border-gray-200 rounded-md
            hover:bg-red-200 focus:outline-none focus-visible:ring-2 mr-3
            focus-visible:ring-offset-2 focus-visible:ring-blue-500"
            @click.prevent="deleteData">確定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Modal',
  props: {
    modelValue: Boolean,
  },
  emits: ['deleteData', 'cancel', 'update:modelValue'],
  setup(props, { emit }) {
    const deleteData = () => {
      emit('update:modelValue', true);
    };
    const cancel = () => {
      emit('update:modelValue', false);
    };
    return { deleteData, cancel };
  },
};
</script>
