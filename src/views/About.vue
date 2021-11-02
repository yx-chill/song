<template>
  <div class="about">
    <h1>This is an about page</h1>
    <div id="box" ref="box"></div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  name: 'About',
  setup() {
    const box = ref(null);
    onMounted(() => {
      const hoverDir = (e) => {
        const w = box.value.offsetWidth;
        const h = box.value.offsetHeight;
        const x = (e.clientX - box.value.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
        const y = (e.clientY - box.value.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
        // 上(0) 右(1) 下(2) 左(3)
        const direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
        const dirName = ['上方', '右侧', '下方', '左侧'];
        if (e.type === 'mouseover' || e.type === 'mouseenter') {
          box.value.innerHTML = `${dirName[direction]}进入`;
        } else {
          box.value.innerHTML = `${dirName[direction]}离开`;
        }
      };
      box.value.addEventListener('mouseover', hoverDir, false);
      box.value.addEventListener('mouseout', hoverDir, false);
    });
    return {
      box,
    };
  },
};
</script>

<style scoped>
#box {
  width: 300px;
  height: 300px;
  margin: 80px auto 80px;
  border: 1px solid red;
}
</style>
