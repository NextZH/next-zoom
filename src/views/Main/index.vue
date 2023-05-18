<template>
  <!-- <canvas id="canvas"></canvas> -->
  <MusicPage></MusicPage>
  <el-tooltip class="box-item" effect="dark" content="地图" placement="left">
    <div class="mapBtn" @click="triggerMapBox" :style="{ '--btnColor': buttonColor }">
      <el-icon>
        <LocationInformation />
      </el-icon>
    </div>
  </el-tooltip>
  <MouseAnimeVue :show-circle="showCircle" ></MouseAnimeVue>
  <el-container class="container">
    <el-header>
      <HeaderPage v-model:isCollapse="isCollapse" v-model:showCircle="showCircle" v-model:showClick="showClick"
        v-model:showBackground="showBackground" @changeSetShowClickFlag="changeSetShowClickFlag"></HeaderPage>
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
  <DrawerPage ref="mydrawer" ></DrawerPage>
  <el-backtop :right="50" :bottom="150" :visibility-height="100" target=".el-main" />
</template>

<script setup lang="ts">
import NavPage from '@/views/Main/components/NavPage.vue';
import HeaderPage from '@/views/Main/components/HeaderPage.vue';
import MusicPage from './components/MusicPage.vue';
import MouseAnimeVue from './components/MouseAnime.vue';
import DrawerPage from './components/DrawerPage.vue';
import { ref, watch, onMounted } from 'vue';
import _ from 'lodash';
import { triggerAnime } from '@/animation/js/click1.js';
import { initBackground, triggerBackground } from '@/animation/js/background.js';
import { LocationInformation } from '@element-plus/icons-vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/Theme';
import { useMusicStore } from '@/stores/Music';
import { useMapStore } from '@/stores/BaiduMap';
const mapStore = useMapStore();
const { setmapFlag } = mapStore;
const themeStore = useThemeStore();
const { buttonColor } = storeToRefs(themeStore);
const musicStore = useMusicStore();
const { getMusicAsync } = musicStore;
onMounted(() => {
  // initBackground();
  triggerBackground(false);
})
const showBackground = ref(false);
watch(showBackground, () => {
  triggerBackground(showBackground.value)
})
//打开地图插件
const triggerMapBox = () => {
  setmapFlag();
}
//菜单收缩
const isCollapse = ref(false);

/* 鼠标点击动画相关 */
const showClick = ref(false);
watch(showClick, (value) => {
  // console.log(value);
  triggerAnime(value);
})
const mydrawer = ref(null);
const changeSetShowClickFlag = () => {
  (mydrawer.value as any).changeSetShowClickFlag();
}

/* 鼠标移动动画相关 */
const showCircle = ref(false);


//created生命周期
(() => {
  getMusicAsync();
})()
</script>

<style lang="scss" scoped>
@import "@/assets/mixins.scss";

.mapBtn {
  $btnColor: var(--btnColor);
  font-size: 18px;
  font-weight: bold;
  position: fixed;
  z-index: 98;
  right: 50px;
  bottom: 250px;
  width: 40px;
  height: 40px;
  background-color: white;
  color: $btnColor;
  border-radius: 50%;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  @include f-c-c();

  &:hover {
    transition: 0.5s;
    background-color: $btnColor;
    color: white;
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
  // background-image: $backgroundColor;
  background-image: url(@/assets/webp/background2.webp);
  @include noScroll();
}

.el-header {
  background-color: $themeColor;
  background-image: linear-gradient(#fff0f0, #9198e584);
  // background-image: radial-gradient(farthest-side at 50% 100%,  white,$themeColor);
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


.mydrawer {
  .content {
    .title {
      margin: 20px 0 10px;
    }
  }
}
</style>
