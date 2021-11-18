<template>
  <div class="about">
    <!-- <Modal /> -->
    <h1>This is an about page</h1>
    <div id="box" ref="box" class="relative overflow-hidden"
      @mouseenter.prevent.stop="hoverDir"
      @mouseleave.prevent.stop="hoverDir">
      <div class="test w-full h-full absolute border-yellow-400 border-2
        bg-gray-500 bg-opacity-40 p-5 -top-full" ref="bg">123</div>
    </div>
  </div>
  <div>
    <button class="bg-gray-500" @click.prevent="del">刪除</button>
    <ul>
      <li v-for="test in testt.song" :key="test">
        {{ test.a }}--{{ test.b }}
      </li>
    </ul>
  </div>
</template>

<script>
import { ref, reactive } from 'vue';
// import Modal from '@/components/Modal.vue';

const testt = reactive({
  song: [
    { id: 1, a: '123', b: 'xyz' },
    { id: 2, a: '456', b: 'abc' },
    { id: 3, a: '789', b: 'ijk' },
    { id: 4, a: '159', b: 'def' },
    { id: 5, a: '357', b: 'zzz' },
  ],
});

export default {
  name: 'About',
  components: {
    // Modal,
  },
  setup() {
    const del = () => {
      for (let i = 0; i < testt.song.length; i += 1) {
        if (testt.song[i].id === 5) {
          delete testt.song[i];
        }
      }
    };
    const bg = ref(null);
    const box = ref(null);
    const hoverDir = (e) => {
      const w = box.value.offsetWidth;
      const h = box.value.offsetHeight;
      const x = (e.clientX - box.value.offsetLeft - (w / 2)) * (w > h ? (h / w) : 1);
      const y = (e.clientY - box.value.offsetTop - (h / 2)) * (h > w ? (w / h) : 1);
      // 上(0) 右(1) 下(2) 左(3)
      const direction = Math.round((((Math.atan2(y, x) * (180 / Math.PI)) + 180) / 90) + 3) % 4;
      if (e.type === 'mouseover' || e.type === 'mouseenter') {
        switch (direction) {
          case 0:
            bg.value.classList.add('dirTop');
            bg.value.classList.add('dir');
            break;
          case 1:
            bg.value.classList.add('dirRight');
            bg.value.classList.add('dir');
            break;
          case 2:
            bg.value.classList.add('dirBottom');
            bg.value.classList.add('dir');
            break;
          case 3:
            bg.value.classList.add('dirLeft');
            bg.value.classList.add('dir');
            break;
          default:
            break;
        }
      } else {
        switch (direction) {
          case 0:
            bg.value.classList.remove('dirBottom');
            bg.value.classList.remove('dirLeft');
            bg.value.classList.remove('dirRight');
            bg.value.classList.remove('dir');
            bg.value.classList.add('dirTop');
            break;
          case 1:
            bg.value.classList.remove('dirBottom');
            bg.value.classList.remove('dirLeft');
            bg.value.classList.remove('dirTop');
            bg.value.classList.remove('dir');
            bg.value.classList.add('dirRight');
            break;
          case 2:
            bg.value.classList.remove('dirLeft');
            bg.value.classList.remove('dirRight');
            bg.value.classList.remove('dirTop');
            bg.value.classList.remove('dir');
            bg.value.classList.add('dirBottom');
            break;
          case 3:
            bg.value.classList.remove('dirBottom');
            bg.value.classList.remove('dirRight');
            bg.value.classList.remove('dirTop');
            bg.value.classList.remove('dir');
            bg.value.classList.add('dirLeft');
            break;
          default:
            break;
        }
      }
    };
    return {
      box, bg, hoverDir, testt, del,
    };
  },
};
</script>

<style scoped lang="scss">
#box {
  width: 300px;
  height: 300px;
  margin: 80px auto 80px;
  border: 1px solid red;
}
.test {
  transition: all .5s;
}
.dirTop {
  left: 0;
  top: -100%;
}
.dirBottom {
  left: 0;
  top: 100%;
}
.dirLeft {
  top: 0;
  left: -100%;
}
.dirRight {
  top: 0;
  left: 100%;
}
.dir {
  top: 0;
  left: 0;
}
</style>
