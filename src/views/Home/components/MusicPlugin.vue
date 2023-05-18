<template>
  <div class="musicCarousel">
    <div class="btns">
      <el-button :type="buttonType" :icon="DArrowLeft" circle @click="turnMusic(false)" />
      <el-button :type="buttonType" :icon="DArrowRight" circle @click="turnMusic(true)" />
    </div>
    <div class="imgs" :class="{ prev, next }">
      <img :src="music.musicImg[musicIndex - 2]" alt="">
      <img :src="music.musicImg[musicIndex - 1]" alt="">
      <img :src="music.musicImg[musicIndex]" alt="">
      <img :src="music.musicImg[musicIndex + 1]" alt="">
      <img :src="music.musicImg[musicIndex + 2]" alt="">
    </div>
  </div>
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
  <div class="controller">
    <el-button :type="buttonType" size="large" circle @click="playMusic">
      <el-icon :size="40">
        <VideoPause v-if="playFlag" />
        <VideoPlay v-else />
      </el-icon>
    </el-button>
    <el-slider v-model="currentTime" disabled :max="duration" :marks="marks" :format-tooltip="formatTooltip" :step="0.01"
      @change="sliderChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed, onUnmounted, onMounted, watch } from 'vue';
import { storeToRefs } from 'pinia';
import { useThemeStore } from '@/stores/Theme';
import { useMusicStore } from '@/stores/Music';
import { VideoPlay, VideoPause, DArrowRight, DArrowLeft } from '@element-plus/icons-vue';
const musicStore = useMusicStore();
const { musicChange } = musicStore;
const { music, musicIndex, lyric, Imglist, musicAudio, duration, currentTime, playFlag, musicPlugin } = storeToRefs(musicStore);

const playMusic = () => {
  playFlag.value = !playFlag.value;
  if (playFlag.value) {
    (musicAudio.value as any).play();
  } else {
    (musicAudio.value as any).pause();
  }
}
//切歌
const prev = ref(false);
const next = ref(false);
const turnMusic = (flag: boolean) => {
  playFlag.value = true;
  let index = 0;
  if (flag) {
    next.value = true;
    index = musicIndex.value + 1;
  } else {
    prev.value = true;
    index = musicIndex.value - 1;
  }
  // console.log(index);
  const timer = setTimeout(() => {
    prev.value = false;
    next.value = false;
    musicChange(index);
    clearTimeout(timer);
  }, 500)
}
//进度条首尾长度显示
const marks = computed(() => ({
  0: '00:00.00',
  [duration.value]: formatTooltip(duration.value)
}));
//进度条显示格式化
const formatTooltip = (value: any) => {
  const time = value.toFixed(0);
  let m = Math.floor(time / 6000);
  let s = Math.floor(time / 100) - m * 60;
  let ms = time % 100;
  // console.log(value);
  return `${m < 10 ? '0' + m : m}:${s < 10 ? '0' + s : s}.${ms < 10 ? '0' + ms : ms}`;
}
//进度条改变
const sliderChange = (value: any) => {
  console.log('前', value, (musicAudio.value as any).currentTime);
  // currentTime.value=value;
  (musicAudio.value as any).currentTime = (value / 100).toFixed(6);
  console.log('后', value, (musicAudio.value as any).currentTime);
}

//主题
const themeStore = useThemeStore();
const { buttonType, buttonColor, fontColor } = storeToRefs(themeStore);

onMounted(() => {
  // const timer2=setTimeout(()=>{
  //   // initEcharts();
  //   // clearTimeout(timer2);
  // },1000)

  if ((musicAudio.value as any).played) {
    playFlag.value = (musicAudio.value as any).played;
  }
  if ((musicAudio.value as any).paused) {
    playFlag.value = !(musicAudio.value as any).paused;
  }
})
</script>

<style scoped lang="scss">
@import "@/assets/mixins.scss";
.musicCarousel {
  position: relative;
  width: 100%;
  height: 200px;

  .btns {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-sizing: border-box;
    padding: 20px;
    z-index: 10;
  }

  .imgs {
    width: 100%;
    height: 100%;
    // display: flex;
    // justify-content: space-between;
    position: relative;
    box-sizing: border-box;
    perspective: 500px;
    -webkit-perspective: 500px;
    // transfrom-origin:center center;
    perspective-origin: center center;
    transform-style: preserve-3d;

    img {
      $length: 180px;
      position: absolute;
      flex-shrink: 0;
      height: $length;
      width: $length;
      box-shadow: 0px 0px 5px 1px black;
      top: calc(50% - $length/2);

      &:nth-child(1) {
        transform: translate3d(-70%, 0, -200px);
      }

      &:nth-child(5) {
        transform: translate3d(170%, 0, -200px);
      }

      &:nth-child(2) {
        transform: translate3d(-20%, 0, -100px);
      }

      &:nth-child(4) {
        transform: translate3d(115%, 0, -100px);
      }

      &:nth-child(3) {
        transform: translate3d(50%, 0, 0);
      }
    }
  }

  .prev {
    $length: 180px;
    transition: 0.5s;

    img {
      transition: 0.5s;

      &:nth-child(4) {
        transform: translate3d(170%, 0, -200px);
      }

      &:nth-child(1) {
        transform: translate3d(-20%, 0, -100px);
      }

      &:nth-child(3) {
        transform: translate3d(115%, 0, -100px);
      }

      &:nth-child(2) {
        transform: translate3d(50%, 0, 0);
      }
    }
  }

  .next {
    $length: 180px;
    transition: 0.5s;

    img {
      transition: 0.5s;

      &:nth-child(2) {
        transform: translate3d(-70%, 0, -200px);
      }

      &:nth-child(3) {
        transform: translate3d(-20%, 0, -100px);
      }

      &:nth-child(5) {
        transform: translate3d(115%, 0, -100px);
      }

      &:nth-child(4) {
        transform: translate3d(50%, 0, 0);
      }
    }
  }
}

.song {
  font-size: 20px;
}

// .lyric{
//   height: 20px;
// }

.controller {
  margin: 5px 10px;
  display: flex;
  align-items: center;

  .el-slider {
    margin: 0 40px;
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
</style>