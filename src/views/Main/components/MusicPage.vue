<template>
  <div class="musicDetail" :class="{ detailFade: !showDetail }"
    :style="{ '--fontColor': fontColor, '--buttonColor': buttonColor, }">
    <div class="topBar">
      <el-icon @click="triggerDetail(false)">
        <ArrowDownBold />
      </el-icon>
      <div class="title">
        <div class="song">
          <el-tooltip class="box-item" effect="dark" :content="music.list && music.list[musicIndex]?.name"
            placement="top">
            {{ music.list && music.list[musicIndex]?.name }}
          </el-tooltip>
        </div>
        <div class="artists">
          <el-tooltip class="box-item" effect="dark"
            :content="music.list && music.list[musicIndex]?.artists.map((e: any) => e.name).join(',')" placement="top">
            <span>
              歌手：
              <span v-for="item in music.list && music.list[musicIndex]?.artists">{{ item.name }}</span>
            </span>
          </el-tooltip>
        </div>
      </div>
    </div>
    <div class="content">
      <img :src="music.musicImg[musicIndex]" alt="">
      <div class="lyricList">

        <el-scrollbar v-infinite-scroll="load" class="infinite-list" style="overflow: auto" ref="scrollbarRef" always>
          <div class="blankBox"></div>
          <template v-for="item, index in lyricList" :key="index">
            <el-tooltip class="box-item" effect="dark" :content="lyricListHasTime[index]" placement="top"
              :disabled="item == ''">
              <div class="infinite-list-item" :class="{ hightline: lyricIndex == index }">{{ item }}</div>
            </el-tooltip>
          </template>
          <div class="blankBox2"></div>
        </el-scrollbar>
      </div>
    </div>
    <div class="detailBackground" :style="{ backgroundImage: `url(${music.musicImg[musicIndex]})` }"></div>
  </div>
  <div class="music" :class="{ fade: !showMusic }" :style="{ '--fontColor': fontColor, '--buttonColor': buttonColor, }">
    <div class="musicImg" @mouseenter="triggerHoverBtn(true)" @mouseleave="triggerHoverBtn(false)">
      <div class="hoverBtn" v-if="hoverBtn" @click="triggerDetail()">
        <el-icon>
          <Top v-if="!showDetail" />
          <Bottom v-else />
        </el-icon>
      </div>
      <img :src="music.musicImg[musicIndex]" alt="">
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
    <div class="musicController">
      <div class="audioBtn">
        <el-tooltip class="box-item" effect="dark" content="上一首" placement="top">
          <el-button :type="buttonType" :icon="DArrowLeft" circle @click="turnMusic(false)" />
        </el-tooltip>
        <el-button :type="buttonType" size="large" circle @click="playMusic">
          <el-icon :size="40">
            <VideoPause v-if="playFlag" />
            <VideoPlay v-else />
          </el-icon>
        </el-button>
        <el-tooltip class="box-item" effect="dark" content="下一首" placement="top">
          <el-button :type="buttonType" :icon="DArrowRight" circle @click="turnMusic(true)" />
        </el-tooltip>
      </div>
      <audio ref="musicAudio" :src="music.currentMusic.url" controls style="width: 100%;" :autoplay="autoplay"
        @play="audioPlay" @pause="audioPause" @ended="audioEnded" @seeked="autoSeeked" @loadstart="loadstart"
        @loadedmetadata="loadedmetadata"></audio>
    </div>
  </div>
  <el-tooltip class="box-item" effect="dark" content="音乐" placement="left">
    <div class="musicBtn" @click="triggerMusicBox" :style="{ '--btnColor': buttonColor }">
      <el-icon>
        <Headset />
      </el-icon>
    </div>
  </el-tooltip>
</template>

<script setup lang="ts">
import { ref, reactive, watch, onMounted } from 'vue';
import { Headset, DArrowRight, DArrowLeft, Top, Bottom, ArrowDownBold, LocationInformation, VideoPause, VideoPlay } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/Theme';
import { useMusicStore } from '@/stores/Music';
const themeStore = useThemeStore();
const { buttonType, buttonColor, fontColor } = storeToRefs(themeStore);
const musicStore = useMusicStore();
const { audioPlay, audioPause, audioEnded, autoSeeked, loadstart, getMusicAsync, musicChange, loadedmetadata } = musicStore;
const { music, autoplay, musicIndex, lyric, Imglist, musicAudio, audioCurrentTime, lyricList, lyricIndex, lyricListHasTime, musicPlugin, playFlag } = storeToRefs(musicStore);
//音乐主控制台实例
// const musicAudio:any=ref(null);
//展示音乐主控制台标志
const showMusic = ref(false);
//打开音乐主控制台
const triggerMusicBox = () => {
  if (musicPlugin.value) {
    showMusic.value = !showMusic.value;
  } else {
    ElMessage({
      message: '当前音乐插件未启动，请联系后端启动插件',
      type: 'success',
    })
  }
}
//播放暂停音乐
const playMusic = () => {
  playFlag.value = !playFlag.value;
  if (playFlag.value) {
    (musicAudio.value as any).play();
  } else {
    (musicAudio.value as any).pause();
  }
}

//切歌
const turnMusic = (flag: boolean) => {
  if (flag) {
    if (musicIndex.value == music.value.list.length - 1) {
      musicIndex.value = 0;
    } else {
      musicIndex.value++;
    }
    musicChange(musicIndex.value);
  } else {
    if (musicIndex.value == 0) {
      musicIndex.value = music.value.list.length - 1;
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
watch(lyricIndex, (value: any) => {
  scrollbarRef.value!.setScrollTop(value * 70);
})

const count = ref(0)
const load = () => {
  count.value += 2
}
</script>

<style scoped lang="scss">
@import "@/assets/mixins.scss";
.musicDetail {
  $fontColor: var(--fontColor);
  $buttonColor: var(--buttonColor);
  position: fixed;
  z-index: 99;
  bottom: 0;
  left: 0;
  right: 0;
  height: 100vh;
  width: 100%;
  background-color: white;
  transition: 0.5s;

  .topBar {
    position: absolute;
    width: 100%;
    // height: 60px;
    // background-color: pink;
    left: 40px;
    top: 30px;
    z-index: 2;
    color: white;
    text-shadow: 0px 0px 5px black;
    font-size: 40px;

    transition: 0.3s;
    display: flex;
    justify-content: space-between;

    .el-icon {
      cursor: pointer;

      &:hover {
        color: $buttonColor;
      }
    }

    .title {
      width: 100%;
      flex: 4 0;
      font-weight: bold;
      // margin-bottom: 50px;
      display: flex;
      justify-content: center;
      align-items: center;
      @include f-c-c;

      .song {
        margin-right: 20px;
        min-width: 300px;
        font-size: 30px;
        text-align: right;
      }

      .artists {
        font-size: 16px;
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
      padding-top: 100px;
      .infinite-list {
        $height: 500px;
        min-width: 500px;
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
          color: $fontColor;
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
  $fontColor: var(--fontColor);
  $buttonColor: var(--buttonColor);
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
  color: $fontColor;
  font-size: 14px;

  .song {
    font-size: 20px;
  }

  // .lyric{
  //   height: 20px;
  // }
  audio {
    height: 30px;

    // margin-top: 20px;
    &::-webkit-media-controls-panel,
    &::-webkit-media-controls-enclosure {
      background-color: $buttonColor;
    }

    // &::-webkit-media-controls-current-time-display,
    // &::-webkit-media-controls-time-remaining-display,
    // &::-webkit-media-controls-mute-button {
    //   color: white;
    //   // background-color: white;
    // }

    &::-webkit-media-controls-play-button {
      // background-color: white;
      display: none;
      // background-image: url(@/assets/time.svg);
      // &::-internal-media-controls-button-hover-background {
      //   opacity: 0.1;
      // }
    }

  }

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
    width: 260px;
    height: 100%;
  }

  .audioBtn {
    width: 200px;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .musicController {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
}

.fade {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transform: translateY(100px);
}

.detailFade {
  box-shadow: 0px 0px 0px 0px rgba(0, 0, 0, 0);
  transform: translateY(100vh);

  // opacity: 0;
  .detailBackground {
    filter: blur(0px);
  }
}

.musicBtn {
  $btnColor: var(--btnColor);
  font-size: 16px;
  font-weight: bold;
  position: fixed;
  z-index: 98;
  right: 50px;
  bottom: 200px;
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
</style>