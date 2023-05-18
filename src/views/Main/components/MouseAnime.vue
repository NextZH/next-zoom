<template>
  <div class="circleBox" v-if="showCircle">
    <div class="circle" v-for="item in circleBox" :key="item.id"
      :style="{ backgroundColor: item.show ? `rgba(${item.red},${item.green},${item.blue},${item.alpha})` : 'rgba(0,0,0,0)', 'transition-duration': `${item.show ? 0 : 1}s`, 'transform': item.show ? 'rotate(1,1)' : 'rotate(0.5,0.5)' }"
      @mouseenter="move(item)" @mouseleave="moveLeave(item)"></div>
  </div>
</template>

<script setup lang="ts">
import { reactive } from 'vue';
/* 鼠标移动动画相关 */
const props=defineProps(['showCircle']);
// const showCircle = ref(false);
const format = (max: number, min: number = 0, num: number = 0) => Number((Math.random() * max + min).toFixed(num));
const color = reactive({
  red: format(255),
  blue: format(255),
  green: format(255),
})
const circleBox: any[] = reactive([]);
const init = () => {
  for (let i = 1; i <= 60; i++) {
    for (let j = 1; j <= 60; j++) {
      circleBox.push({
        id: i * j,
        alpha: 0.5,
        show: false,
        red: format(255),
        blue: format(255),
        green: format(255),
      })
    }
  }
}
const move = (item: any) => {
  item.show = true;
}
const moveLeave = (item: any) => {
  item.show = false;
}
//created生命周期
(() => {
  init();
})()
</script>

<style scoped lang="scss">
.circleBox {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  box-sizing: border-box;

  .circle {
    width: 1vw;
    height: 1vw;
    flex-grow: 0;
    flex-shrink: 0;
    border-radius: 50%;
    // transform: rotate(0,0);
  }
}
</style>