<template>
  <div class="common-layout">
    <div class="circleBox" v-if="showCircle">
      <div class="circle" v-for="item in circleBox" :key="item.id"
        :style="{ backgroundColor: item.show ? `rgba(${item.red},${item.green},${item.blue},${item.alpha})` : 'rgba(0,0,0,0)', 'transition-duration': `${item.show ? 0 : 1}s`,'transform':item.show ?'rotate(1,1)':'rotate(0.5,0.5)' }"
        @mouseenter="move(item)" @mouseleave="moveLeave(item)"></div>
    </div>
    <el-container class="container">
      <el-header>
        <HeaderPage v-model:isCollapse="isCollapse" v-model:showCircle="showCircle"></HeaderPage>
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
  </div>
</template>

<script setup lang="ts">
import NavPage from './views/NavPage.vue';
import HeaderPage from './views/HeaderPage.vue';
import { ref, reactive } from 'vue';
import _ from 'lodash';


const showCircle = ref(false);
const isCollapse = ref(false)
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
init();
const move = (item: any) => {
  item.show = true;
}
const moveLeave = (item: any) => {
  item.show = false;
}

</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
  position: relative;
  overflow: hidden;
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
    height: calc(100% - 60px);
  }
}

.el-main {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.el-header {
  background-color: skyblue;
  display: flex;
  align-items: center;
  z-index: 1;
}

.el-aside {
  width: auto;
  background-color: skyblue;
}
</style>
