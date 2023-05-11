<template>
  <div class="common-layout">
    <!-- <canvas id="canvas"></canvas> -->
    <div class="musicDetail" :class="{ detailFade: !showDetail }">
      <div class="leaveBtn" @click="triggerDetail(false)">
        <el-icon>
          <ArrowDownBold />
        </el-icon>
      </div>
      <div class="content">
        <img :src="Imglist[musicIndex]" alt="">
        <div class="lyricList">
          <div class="title">
            <el-tooltip class="box-item" effect="dark" :content="music.list && music.list[musicIndex]?.name"
              placement="top">
              <div class="song">{{ music.list && music.list[musicIndex]?.name }}</div>
            </el-tooltip>
            <el-tooltip class="box-item" effect="dark"
              :content="music.list && music.list[musicIndex]?.artists.map((e: any) => e.name).join(',')" placement="top">
              <div class="artists">
                歌手：
                <span v-for="item in music.list && music.list[musicIndex]?.artists">{{ item.name }}</span>
              </div>
            </el-tooltip>
          </div>
          <el-scrollbar v-infinite-scroll="load" class="infinite-list" style="overflow: auto" ref="scrollbarRef" always
            @scroll="scroll">
            <div class="blankBox"></div>
            <template v-for="item, index in lyricList" :key="index">
              <el-tooltip class="box-item" effect="dark" :content="lyricListHasTime[index]" placement="top" :disabled="item == ''">
                <div class="infinite-list-item" :class="{ hightline: lyricIndex == index }">{{ item }}</div>
              </el-tooltip>
            </template>
            <div class="blankBox2"></div>
          </el-scrollbar>
          <!-- <el-scrollbar ref="scrollbarRef" height="400px" always @scroll="scroll">
            <div ref="innerRef">
              <p v-for="item in 20" :key="item" class="scrollbar-demo-item">
                {{ item }}
              </p>
            </div>
          </el-scrollbar> -->
        </div>
      </div>
      <div class="detailBackground" :style="{ backgroundImage: `url(${Imglist[musicIndex]})` }"></div>
    </div>
    <div class="music" :class="{ fade: !showMusic }">
      <div class="musicImg" @mouseenter="triggerHoverBtn(true)" @mouseleave="triggerHoverBtn(false)">
        <div class="hoverBtn" v-if="hoverBtn" @click="triggerDetail()">
          <el-icon>
            <Top v-if="!showDetail" />
            <Bottom v-else />
          </el-icon>
        </div>
        <img :src="Imglist[musicIndex]" alt="">
      </div>
      <div class="musicInfo">
        <el-tooltip class="box-item" effect="dark" :content="music.list && music.list[musicIndex]?.name" placement="top">
          <div class="song">{{ music.list && music.list[musicIndex]?.name }}</div>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark"
          :content="music.list && music.list[musicIndex]?.artists.map((e: any) => e.name).join(',')" placement="top">
          <div class="artists">
            歌手：
            <span v-for="item in music.list && music.list[musicIndex]?.artists">{{ item.name }}</span>
          </div>
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" :content="lyric" placement="top">
          <div class="lyric">
            {{ lyric }}
          </div>
        </el-tooltip>
      </div>
      <div class="audioBtn">
        <el-tooltip class="box-item" effect="dark" content="上一首" placement="top">
          <el-button type="primary" size="large" :icon="DArrowLeft" circle @click="turnMusic(false)" />
        </el-tooltip>
        <el-tooltip class="box-item" effect="dark" content="下一首" placement="top">
          <el-button type="primary" size="large" :icon="DArrowRight" circle @click="turnMusic(true)" />
        </el-tooltip>
      </div>
      <audio ref="musicAudio" :src="music.currentMusic.url" controls style="width: 100%;" :autoplay="autoplay"
        @play="audioPlay" @pause="audioPause" @ended="audioEnded" @seeked="autoSeeked" @loadstart="loadstart"
        @loadedmetadata="loadedmetadata"></audio>
    </div>
    <el-tooltip class="box-item" effect="dark" content="音乐" placement="left">
      <div class="musicBtn" @click="triggerMusicBox">
        <!-- 打开 -->
        <el-icon>
          <Headset />
        </el-icon>
      </div>
    </el-tooltip>

    <div class="circleBox" v-if="showCircle">
      <div class="circle" v-for="item in circleBox" :key="item.id"
        :style="{ backgroundColor: item.show ? `rgba(${item.red},${item.green},${item.blue},${item.alpha})` : 'rgba(0,0,0,0)', 'transition-duration': `${item.show ? 0 : 1}s`, 'transform': item.show ? 'rotate(1,1)' : 'rotate(0.5,0.5)' }"
        @mouseenter="move(item)" @mouseleave="moveLeave(item)"></div>
    </div>
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
    <Drawer ref="mydrawer" :closeByModal="false" class="mydrawer">
      <template #header>
        点击动画设置
      </template>
      <template #content>
        <div class="title">粒子半径范围:</div>
        <el-slider v-model="particle.radius" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
          @change="chnageParticleObj" />
        <div class="title">粒子数量范围:</div>
        <el-slider v-model="particle.number" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
          @change="chnageParticleObj" />
        <div class="title">粒子爆炸速度范围:</div>
        <el-slider v-model="particle.speed" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
          @change="chnageParticleObj" />
        <div class="title">水波纹圈半径范围:</div>
        <el-slider v-model="particle.waterRadius" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
          @change="chnageParticleObj" />
        <div class="title">水波纹圈完整度:</div>
        <el-slider v-model="particle.integrity" range :min="0" :max="1" :step="0.01" show-input :marks="marks2"
          @change="chnageParticleObj" />
      </template>
    </Drawer>
    <el-backtop :right="50" :bottom="150" :visibility-height="100" target=".el-main" />
  </div>
</template>

<script setup lang="ts">
import NavPage from './views/NavPage.vue';
import HeaderPage from './views/HeaderPage.vue';
import { ref, reactive, watch, onMounted } from 'vue';
import _ from 'lodash';
import { triggerAnime, setAnimeData, particleObj } from './animation/js/click1.js';
import { initBackground, triggerBackground } from './animation/js/background.js';
import Drawer from './components/Drawer.vue';
import { Headset, DArrowRight, DArrowLeft, Top, Bottom, ArrowDownBold } from '@element-plus/icons-vue'
import { useMusicStore } from '@/stores/Music';
import { storeToRefs } from 'pinia';
const musicStore = useMusicStore();
const { audioPlay, audioPause, audioEnded, autoSeeked, loadstart, getMusicAsync, musicChange, loadedmetadata } = musicStore;
const { music, autoplay, musicIndex, lyric, Imglist, musicAudio, audioCurrentTime, lyricList, lyricIndex, lyricListHasTime } = storeToRefs(musicStore);
onMounted(() => {
  // initBackground();
  triggerBackground(false);
})
const showBackground = ref(false);
watch(showBackground, () => {
  triggerBackground(showBackground.value)
})
//音乐主控制台实例
// const musicAudio:any=ref(null);
//展示音乐主控制台标志
const showMusic = ref(false);
//打开音乐主控制台
const triggerMusicBox = () => {
  showMusic.value = !showMusic.value;
}
//切歌
const turnMusic = (flag: boolean) => {
  if (flag) {
    if (musicIndex.value == Imglist.value.length - 1) {
      musicIndex.value = 0;
    } else {
      musicIndex.value++;
    }
    musicChange(musicIndex.value);
  } else {
    if (musicIndex.value == 0) {
      musicIndex.value = Imglist.value.length - 1;
    } else {
      musicIndex.value--;
    }

    musicChange(musicIndex.value);
  }
}
const hoverBtn = ref(false);
const triggerHoverBtn = (flag: boolean) => {
  hoverBtn.value = flag;
}
//展示歌词详情
const showDetail = ref(false);
const triggerDetail = (flag?: boolean) => {
  if (flag) {
    showDetail.value = flag;
  } else {
    showDetail.value = !showDetail.value;
  }
}
const scrollbarRef: any = ref(null);
//歌词滚轮事件
const scroll = ({ scrollTop }: any) => {
  // console.log(scrollTop);
  // scrollbarRef.value!.setScrollTop(value)
}
watch(lyricIndex, (value: any) => {
  scrollbarRef.value!.setScrollTop(value * 70);
})

const count = ref(0)
const load = () => {
  count.value += 2
}

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
const formatTooltip = (value: any) => {
  return value / 10;
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
  getMusicAsync();
})()
</script>

<style lang="scss" scoped>
@import "./assets/mixins.scss";

.common-layout {
  height: 100%;
  position: relative;
  overflow: hidden;
  // background-color: black;
}

.musicDetail {
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  background-color: white;
  transition: 0.5s;

  .leaveBtn {
    position: absolute;
    // width: 60px;
    // height: 60px;
    // background-color: pink;
    left: 40px;
    top: 30px;
    z-index: 2;
    color: white;
    text-shadow: 0px 0px 5px black;
    font-size: 40px;
    cursor: pointer;
    transition: 0.3s;

    &:hover {
      color: #409EFF;
    }
  }

  .content {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 50px 300px;
    background-color: rgba(0, 0, 0, 0.5);
    @include f-c-c;

    img {
      flex: 1 0;
      border-radius: 5px;
      height: 300px;
      width: 300px;
      box-shadow: 0px 0px 5px 1px black;
    }

    .lyricList {
      flex: 4 0;
      color: white;
      text-shadow: 0px 0px 5px black;

      .title {
        font-weight: bold;
        margin-bottom: 50px;
        @include f-c-c;

        .song {
          margin-right: 20px;
          font-size: 30px;
          text-align: right;
        }

        .song,
        .artists {
          flex: 1 0;
          margin: 5px 10px;
          /* 多余文本用...代替 */
          /* 溢出隐藏 */
          overflow: hidden;
          /* 设置伸缩盒子 */
          display: -webkit-box;
          /* 设置子元素的对齐方式 */
          -webkit-box-orient: vertical;
          /* 设置显示想行数 */
          -webkit-line-clamp: 1;
        }
      }

      .infinite-list {
        $height: 500px;
        height: $height;
        padding: 0;
        margin: 0;
        margin-bottom: 50px;
        list-style: none;

        .blankBox {
          height: calc($height / 3);
        }

        .blankBox2 {
          height: calc($height / 3 + 70px);
        }

        &::-webkit-scrollBar {
          display: none;
        }

        :deep() .el-scrollbar__bar {
          display: none;
        }

        // @include scrollBar;

        .infinite-list-item {
          display: flex;
          align-items: center;
          justify-content: center;
          text-align: center;
          height: 40px;
          margin: 30px 60px;
          padding: 0 20px;
          box-sizing: border-box;
          /* 多余文本用...代替 */
          /* 溢出隐藏 */
          overflow: hidden;
          /* 设置伸缩盒子 */
          display: -webkit-box;
          /* 设置子元素的对齐方式 */
          -webkit-box-orient: vertical;
          /* 设置显示想行数 */
          -webkit-line-clamp: 1;
        }

        .infinite-list-item+.list-item {
          margin-top: 10px;
        }

        .hightline {
          transition: 0.2s;
          font-size: 30px;
          color: #409EFF;
          // font-weight: bold;
          // text-shadow: 0px 0px 20px white;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0), rgba(255, 255, 255, 0.5), rgba(0, 0, 0, 0));
        }
      }
    }
  }

  .detailBackground {
    transition: 0.5s;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    position: absolute;
    z-index: -1;
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;
    // -webkit-filter: blur(5px);
    // -moz-filter: blur(5px);
    // -o-filter: blur(5px);
    filter: blur(50px);
  }

}

.music {
  position: fixed;
  z-index: 100;
  height: 100px;
  width: 100%;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-sizing: border-box;
  padding: 10px 20px;
  box-shadow: 0px -1px 10px 1px black;
  transition: 0.5s;
  display: flex;
  align-items: center;
  color: #409EFF;
  font-size: 14px;

  .song {
    font-size: 20px;
  }

  // .lyric{
  //   height: 20px;
  // }
  // audio {
  //   margin-top: 20px;
  // }

  .song,
  .lyric,
  .artists {
    margin: 5px 10px;
    /* 多余文本用...代替 */
    /* 溢出隐藏 */
    overflow: hidden;
    /* 设置伸缩盒子 */
    display: -webkit-box;
    /* 设置子元素的对齐方式 */
    -webkit-box-orient: vertical;
    /* 设置显示想行数 */
    -webkit-line-clamp: 1;
  }

  .musicImg {
    position: relative;
    border-radius: 5px;
    // overflow: hidden;
    height: 80px;
    width: 80px;

    .hoverBtn {
      border-radius: 5px;
      width: 100%;
      height: 100%;
      position: absolute;
      cursor: pointer;
      z-index: 2;
      color: white;
      font-size: 40px;
      font-weight: bold;
      // opacity: 0.5;
      @include f-c-c();
      background-color: rgba(0, 0, 0, 0.5);
    }

    img {
      border-radius: 5px;
      height: 80px;
      width: 80px;
    }
  }

  .musicInfo {
    width: 400px;
  }

  .audioBtn {
    width: 200px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.fade {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transform: translateY(100px);
}

.detailFade {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transform: translateY(100vh);

  .detailBackground {
    filter: blur(0px);
  }
}

.musicBtn {
  font-size: 14px;
  font-weight: bold;
  position: fixed;
  z-index: 98;
  right: 50px;
  bottom: 200px;
  width: 40px;
  height: 40px;
  background-color: white;
  color: #409EFF;
  border-radius: 50%;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, 0.12);
  cursor: pointer;
  @include f-c-c();

  &:hover {
    transition: 0.5s;
    background-color: #409EFF;
    color: white;
  }
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
  // background-image: $backgroundColor;
  background-image: url(./assets/webp/background2.webp);
  @include scrollBar();
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

// v-deep.el-table {
//   @include scrollBar();
// }

.mydrawer {
  .content {
    .title {
      margin: 20px 0 10px;
    }
  }
}
</style>
