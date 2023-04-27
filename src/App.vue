<template>
  <div class="common-layout">
    <canvas id="canvas"></canvas>
    <div class="circleBox" v-if="showCircle">
      <div class="circle" v-for="item in circleBox" :key="item.id"
        :style="{ backgroundColor: item.show ? `rgba(${item.red},${item.green},${item.blue},${item.alpha})` : 'rgba(0,0,0,0)', 'transition-duration': `${item.show ? 0 : 1}s`, 'transform': item.show ? 'rotate(1,1)' : 'rotate(0.5,0.5)' }"
        @mouseenter="move(item)" @mouseleave="moveLeave(item)"></div>
    </div>
    <el-container class="container">
      <el-header>
        <HeaderPage v-model:isCollapse="isCollapse" v-model:showCircle="showCircle" v-model:showClick="showClick"
          @changeSetShowClickFlag="changeSetShowClickFlag"></HeaderPage>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收缩</el-radio-button>
        </el-radio-group> -->
      </el-header>
      <el-container class="container-2">
        <el-aside>
          <NavPage :isCollapse="isCollapse"></NavPage>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
    <Drawer ref="mydrawer" :closeByModal="false" class="mydrawer">
      <template #header>
        点击动画设置
      </template>
      <template #content>
        <div class="title">粒子半径范围:</div>
        <el-slider v-model="particle.radius" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
          @change="chnageParticleObj" />
        <div class="title">粒子数量范围:</div>
        <el-slider v-model="particle.number" range :min="0" :max="30" :step="0.1" show-input :marks="marks" @change="chnageParticleObj" />
        <div class="title">粒子爆炸速度范围:</div>
        <el-slider v-model="particle.speed" range :min="0" :max="30" :step="0.1" show-input :marks="marks" @change="chnageParticleObj" />
        <div class="title">水波纹圈半径范围:</div>
        <el-slider v-model="particle.waterRadius" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
          @change="chnageParticleObj" />
        <div class="title">水波纹圈完整度:</div>
        <el-slider v-model="particle.integrity" range :min="0" :max="1" :step="0.01" show-input :marks="marks2" 
          @change="chnageParticleObj" />
      </template>
    </Drawer>
    
  </div>
</template>

<script setup lang="ts">
import NavPage from './views/NavPage.vue';
import HeaderPage from './views/HeaderPage.vue';
import { ref, reactive, watch,onMounted } from 'vue';
import _ from 'lodash';
import { triggerAnime, setAnimeData,particleObj } from './animation/js/click1.js';
import { initBackground } from './animation/js/background.js';
import Drawer from './components/Drawer.vue';
onMounted(()=>{
  // initBackground();
})

const isCollapse = ref(false);

/* 鼠标点击动画相关 */
const showClick = ref(false);
watch(showClick, (value) => {
  // console.log(value);
  triggerAnime(value);
})
const mydrawer = ref(null);
const changeSetShowClickFlag = () => {
  (mydrawer.value as any).changeVisible();
}
const particle = reactive(particleObj);
const marks = reactive({
  0: '0',
  30: '30',
})
const marks2 = reactive({
  0: '0',
  1: '1',
})
const formatTooltip=(value:any)=>{
  return value/10;
}
const chnageParticleObj = () => {
  setAnimeData(particle)
}
/* 鼠标移动动画相关 */
const showCircle = ref(false);
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
  console.log(`
  |‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾|
  |   |‾|     |‾|   |‾|          |‾‾‾‾‾‾‾‾‾‾‾|   |‾‾‾‾‾‾‾‾‾\\      /‾‾‾‾‾‾\\      |
  |   | |     | |   | |           ‾‾‾‾| |‾‾‾‾    | |‾‾‾‾‾‾| |    / /‾‾‾‾\\ \\     |
  |   | |     | |   | |               | |        |  ‾‾‾‾‾‾ /    | |      | |    |
  |   \\ \\     / /   | |               | |        | |‾‾‾‾‾\\ \\    |  ‾‾‾‾‾‾  |    |
  |    \\ ‾‾‾‾‾ /    | ‾‾‾‾‾‾‾|        | |        | |      \\ \\   | |‾‾‾‾‾‾| |    |
  |     ‾‾‾‾‾‾‾      ‾‾‾‾‾‾‾‾          ‾          ‾        ‾‾    ‾        ‾     |
  |           |‾‾‾\\   |‾|   |‾‾‾‾‾‾‾‾|     \\‾\\   /‾/    |‾‾‾‾‾‾‾‾‾‾‾|           |
  |           | |\\ \\  | |   | |‾‾‾‾‾‾       \\ \\ / /      ‾‾‾‾| |‾‾‾‾            |
  |           | | \\ \\ | |   |  ‾‾‾‾‾‾|      /  ‾  \\          | |                |
  |           | |  \\ \\| |   | |‾‾‾‾‾‾      / /‾‾‾\\ \\         | |                |
  |           | |   \\   |   |  ‾‾‾‾‾‾|    / /     \\ \\        | |                |
  |            ‾     ‾‾‾     ‾‾‾‾‾‾‾‾     ‾‾       ‾‾         ‾                 |
   ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
                                ________________
              ヾ(≧▽≦*)o         made by Next         (o゜▽゜)o☆
                                ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  `);
})()
</script>

<style lang="scss" >
@import "./assets/mixins.scss";

.common-layout {
  height: 100%;
  position: relative;
  overflow: hidden;
  // background-color: black;
}

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

.container {
  height: 100%;
  box-sizing: border-box;
  z-index: 1;

  .container-2 {
    height: calc(100% - 100px);
    margin: 20px 100px;
  }
}

.el-main {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px #ccc;
  background-color: white;
  @include scrollBar();
}

.el-header {
  background-color: $themeColor;
  display: flex;
  align-items: center;
  z-index: 1;
}

.el-aside {
  width: auto;
  background-color: $themeColor;
  margin-right: 20px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 1px #ccc;
  @include scrollBar();
}

// v-deep.el-table {
//   @include scrollBar();
// }

.mydrawer{
  .content{
    .title{
      margin: 20px 0 10px;
    }
  }
}
</style>
