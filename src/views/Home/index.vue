<template>
  <div id="homePage">
    <div class="row"
      :style="{ '--height': style[0].height, '--left': style[0].left.flex, '--right': style[0].right.flex, '--grow': style[0].center.grow, '--shrink': style[0].center.shrink, }">
      <div class="row-left" v-if="style[0].left.show">
        <div class="item clock">
          <div class="item-left">
            <img src="@/assets/time.svg" alt="" width="30" height="30">
            <div class="time">{{ time }}</div>
          </div>
          <div class="item-right">
            <div class="date">{{ date }}</div>
            <div class="week">星期{{ weekformat(week) }}</div>
          </div>
        </div>
        <div class="item sky" v-loading="weatherLoading">
          <div class="item-left">
            <div class="temp">{{ todayWeather.currentTemp }}</div>
            <div class="city">
              <span class="position">
                <!-- <i class="fal fa-map-marker-alt" /> -->
                <img v-if="todayWeather.currentCity" src="/src/assets/other/定位.svg" alt="" width="25" height="25">
              </span>&nbsp;
              <span>{{ todayWeather.currentCity }}</span>&nbsp;
              <span>{{ todayWeather.currentWeather }}</span>
              <span>
                <img v-if="todayWeather.currentWeather" :src="`/src/assets/weather/${todayWeather.currentWeather}.svg`"
                  alt="" width="30" height="30">
              </span>
              <el-popover placement="right" title="未来一周天气" :width="900" trigger="click" @show="showWeekData">
                <template #reference>
                  <span class="btn">
                    {{ weekWeatherLoading ? '' : '未来一周天气>>' }}
                  </span>
                </template>
                <template #default>
                  <div class="list">
                    <div class="item" v-for="item in weekWeather" :key="item.date"
                      :style="{ backgroundColor: buttonColor }">
                      <div class="weekName">{{ item.weekName }}</div>
                      <div class="date">{{ item.date }}</div>
                      <div class="status">{{ item.status }}</div>
                      <div class="img">
                        <img v-if="item.status" :src="`/src/assets/weather/${item.status}.svg`" alt="" width="30"
                          height="30">
                      </div>
                      <div class="temp">{{ item.temp }}</div>
                    </div>
                  </div>
                  <div id="chart-1" style="width: 800px;height: 400px;"></div>
                </template>
              </el-popover>
            </div>
            <div class="list">
              <span v-for="item, index in todayWeather.weatherList" :key="index">
                <span>{{ item.title }}</span>&nbsp;
                <span>{{ item.value }}</span>
                <span v-if="index !== todayWeather.weatherList.length - 1">&nbsp;|&nbsp;</span>
              </span>
            </div>
          </div>
          <!-- <div class="item-right"></div> -->
        </div>
      </div>
      <div class="row-center" v-if="style[0].center.show">
        <Carousel :list="list" :height="style[0].height"></Carousel>
      </div>
      <div class="row-right" v-if="style[0].right.show">
        <!-- 百度地图 -->
        <baidu-map class="bm-view" :center="city" :zoom="15">
          <bm-scale anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-scale>
          <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
          <bm-map-type :map-types="['BMAP_NORMAL_MAP', 'BMAP_HYBRID_MAP']" anchor="BMAP_ANCHOR_TOP_LEFT"></bm-map-type>
          <bm-geolocation anchor="BMAP_ANCHOR_BOTTOM_RIGHT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
          <bm-city-list anchor="BMAP_ANCHOR_TOP_LEFT"></bm-city-list>
        </baidu-map>
      </div>
    </div>
    <div class="row"
      :style="{ '--height': style[1].height, '--left': style[1].left.flex, '--right': style[1].right.flex, '--grow': style[1].center.grow, '--shrink': style[1].center.shrink, }">
      <div class="row-left application" v-if="style[1].left.show">
        <div class="title">
          游戏
        </div>
        <div class="content game">
          <div class="gameItem" v-for="item in gameList" :key="item.path" @click="turnTo(item)">
            <el-icon :size="50">
              <component v-if="item.icon" :is="item.icon.render" />
              <img v-else :src="item.iconPath" alt="" width="50" height="50">
            </el-icon>
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="title">
          功能
        </div>
        <div class="content game">
          <div class="gameItem" v-for="item in funcList" :key="item.path" @click="turnTo(item)">
            <el-icon :size="50">
              <component v-if="item.icon" :is="item.icon.render" />
              <img v-else :src="item.iconPath" alt="" width="50" height="50">
            </el-icon>
            <div>{{ item.title }}</div>
          </div>
        </div>
        <div class="title">
          设置
        </div>
        <div class="content game">
          <div class="gameItem" v-for="item in settingList" :key="item.path" @click="turnTo(item)">
            <el-icon :size="50">
              <component v-if="item.icon" :is="item.icon.render" />
              <img v-else :src="item.iconPath" alt="" width="50" height="50">
            </el-icon>
            <div>{{ item.title }}</div>
          </div>
        </div>
      </div>
      <div class="row-center" v-if="style[1].center.show">
      </div>
      <div class="row-right calendar" v-if="style[1].right.show">
        <el-calendar v-model="value" />
      </div>
    </div>
    <div class="row"
      :style="{ '--height': style[2].height, '--left': style[2].left.flex, '--right': style[2].right.flex, '--grow': style[2].center.grow, '--shrink': style[2].center.shrink, }">
      <div class="row-left anime" v-if="style[2].left.show">
        <el-tabs type="border-card">
          <el-tab-pane :label="anime.tagList[i]" v-for="list, i in anime.dataList" :key="i">
            <ul>
              <li v-for="item in list">
                <span><a :href="anime.baseURL + item.nameUrl" target="_blank">{{ item.name }}</a></span>
                <span><a :href="anime.baseURL + item.numUrl" target="_blank">{{ item.num }}</a></span>
              </li>
            </ul>
          </el-tab-pane>
        </el-tabs>
      </div>
      <div class="row-center music" v-if="style[2].center.show">
        <template v-if="music.list.length > 0">
          <Carousel ref="musicCarousel" :list="Imglist" :height="'200px'" :is-card="true" :indicatorPosition="'none'"
            :autoplay="false" :initial-index="musicIndex" :arrow="'always'"
            :style="{ btnBgColor: 'white', btnColor: 'black' }" :change="turnMusic"></Carousel>
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
          <el-tooltip class="box-item" effect="dark" :content="lyric" placement="top">
            <div class="lyric">
              {{ lyric }}
            </div>
          </el-tooltip>
          <div class="controller">
            <el-button type="primary" size="large" circle @click="playMusic">
              <el-icon :size="40">
                <VideoPause v-if="playFlag" />
                <VideoPlay v-else />
              </el-icon>
            </el-button>
            <el-slider v-model="currentTime" disabled :max="duration" :marks="marks" :format-tooltip="formatTooltip" :step="0.01" @change="sliderChange" />
          </div>
          <!-- <audio :src="music.currentMusic.url" controls style="width: 100%;" :autoplay="autoplay" @play="audioPlay" @pause="audioPause" @ended="audioEnded" @seeked="autoSeeked" @loadstart="loadstart" ></audio> -->
        </template>
        <template v-else>
          <div class="empty">
            音乐插件已关闭
          </div>
        </template>
      </div>
      <div class="row-right" v-if="style[2].right.show">
      </div>
    </div>
    <div class="row" :style="{ '--height': '1px' }"></div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import { ref, reactive, computed, onUnmounted, onMounted, watch } from 'vue';
import moment from 'moment';
import menu from '@/constant/menu';
import * as echarts from 'echarts';
import { option, style, list } from './constant';
import { getWeather, getWeekWeather, getAllAnime } from '@/api/home';
import { VideoPlay, VideoPause } from '@element-plus/icons-vue';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
import { useMusicStore } from '@/stores/Music';
const musicStore = useMusicStore();
const { musicChange } = musicStore;
const { music, musicIndex, lyric, Imglist, musicAudio, duration,currentTime,playFlag } = storeToRefs(musicStore);
//音乐播放切换器实例
const musicCarousel = ref('musicCarousel');
//手动切换封面等
watch(musicIndex, (value) => {
  // console.log(value);
  (musicCarousel.value as any).setActiveItem(value);
})
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
const turnMusic = (index: number) => {
  playFlag.value = true;
  musicChange(index);
}
//进度条首尾长度显示
const marks=computed(()=>({
  0:'00:00.00',
  [duration.value]:formatTooltip(duration.value)
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
const sliderChange=(value:any)=>{
  console.log('前', value,(musicAudio.value as any).currentTime);
  // currentTime.value=value;
  (musicAudio.value as any).currentTime=(value/100).toFixed(6);
  console.log('后', value,(musicAudio.value as any).currentTime);
}
//主题
const themeStore = useThemeStore();
const { buttonType, buttonColor } = storeToRefs(themeStore);

//游戏列表
const gameList: any = computed(() => menu.filter((e: any) => e.meta.isGame));
const funcList: any = computed(() => menu.find((e: any) => e.title == '功能')?.children);
const settingList: any = computed(() => menu.find((e: any) => e.title == '设置')?.children);
const turnTo = (item: any) => {
  location.assign(item.path);
}
//定位
const city = ref('成都');
//日历
const value = ref(new Date());
//时间相关
const date = ref(moment(new Date()).format('yyyy-MM-DD'));
const week = ref(moment(new Date()).format('d'));
const weekformat = (week: string) => {
  switch (week) {
    case '1':
      return '一';
    case '2':
      return '二';
    case '3':
      return '三';
    case '4':
      return '四';
    case '5':
      return '五';
    case '6':
      return '六';
    case '7':
      return '日';
    default:
      return '';
  }
}
const time = ref(moment(new Date()).format('HH:mm:ss'));
const timer: any = ref(0);//定时器
const getTime = () => {
  timer.value = setInterval(() => {
    time.value = moment(new Date()).format('HH:mm:ss');
    // console.log(time.value);
  }, 1000);
}
//天气
let todayWeather: any = reactive({});
const weatherLoading = ref(false);
const getWeatherAsync = async () => {
  weatherLoading.value = true;
  const res = await getWeather();
  // console.log(res);
  todayWeather = res.data;
  weatherLoading.value = false;
}
//一周天气
let weekWeather: any = reactive([]);
const weekWeatherLoading = ref(false);
const getWeekWeatherAsync = async () => {
  weekWeatherLoading.value = true;
  const res = await getWeekWeather();
  // console.log(res);
  weekWeather = res.data;
  weekWeatherLoading.value = false;
}

const initEcharts = async () => {
  const myChart = echarts.init(document.getElementById('chart-1')!);
  // await getWeekWeatherAsync();
  option.xAxis.data = weekWeather.map((e: any) => e.date);
  option.series[0].data = weekWeather.map((e: any) => e.temp.split('~')[1].slice(0, -1));
  option.series[1].data = weekWeather.map((e: any) => e.temp.split('~')[0]);
  myChart.setOption(option);
}
const showWeekData = () => {
  initEcharts();
}
//动画列表
let anime: any = reactive({});
// const baseURL=ref('');
const getAllAnimeAsync = async () => {
  const res = await getAllAnime();
  for (const key in res.data) {
    anime[key] = res.data[key];
  }
  // console.log(anime);
}

/* 生命周期 */
const created = () => {
  getTime();
  // console.log(weather);
  getWeatherAsync();
  getWeekWeatherAsync();
  getAllAnimeAsync();
  // getOMMusicAsync();
}
created();
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
onUnmounted(() => {
  clearInterval(timer.value);
})
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#homePage {
  width: 100%;
  height: auto;
  padding-bottom: 20px;
  display: flex;
  flex-direction: column;
}

.row {
  flex-shrink: 0;
  $height: var(--height);
  $left: var(--left);
  // $cneter: var(--cneter);
  $right: var(--right);
  $grow: var(--grow);
  $shrink: var(--shrink);
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
  height: $height;
  margin-bottom: 20px;

  .row-left,
  .row-right,
  .row-center {
    height: 100%;
    margin: 0px 10px;
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    background-color: white;

    .item {
      width: 100%;
      height: 50%;
      flex: 1 0;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: white;

      // flex-direction: column;
      // @include f-sb-c();
      .item-left,
      .item-right {
        flex: 1 0;
        text-align: center;
      }

      .time {
        font-size: 30px;
      }

      .week,
      .date {
        font-size: 20px;
      }

      .time,
      .date,
      .week {
        color: white;
        text-shadow: 0px 0px 4px black;
      }

      .temp {
        font-size: 60px;
        color: #409EFF;
        text-shadow: 0px 5px 6px white;
      }

      .city {
        font-size: 20px;
        @include f-c-c();

        span {
          margin: 5px;
          @include f-c-c();
        }

        .btn {
          font-size: 12px;
          cursor: pointer;
          display: inline-block;
          color: #409EFF;
          text-shadow: 0px 5px 6px white;
          font-weight: bold;
          width: 50px;
        }

        .position {
          animation: move infinite 1.5s ease-in-out;
        }

        @keyframes move {
          0% {
            transform: translateY(0px);
          }

          50% {
            transform: translateY(-10px);
          }

          100% {
            transform: translateY(0px);
          }
        }
      }

      .list {
        font-size: 14px;
      }

      .city,
      .list {
        color: white;
        text-shadow: 0px 3px 5px black;
      }
    }

    .sky {
      background-image: url(@/assets/sky.webp);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .clock {
      background-image: -webkit-cross-fade(url(@/assets/sky.webp), url(@/assets/clock.webp), 50%);
      // background-image: cross-fade(url(@/assets/sky.webp),url(@/assets/clock.webp),50%);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    @include border();
    // @include f-sb-c();
  }

  .row-left {
    flex: $left;
  }

  .row-center {
    flex: $grow $shrink;
  }

  .row-right {
    flex: $right;
  }

  .application {
    padding: 20px;
    box-sizing: border-box;
    background-image: url(@/assets/webp/desk2.webp);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    overflow: auto;
    @include scrollBar();

    .title {
      font-size: 25px;
      font-family: 'H-新雅兰';
      color: #9198e5;
      text-shadow: 0px 0px 10px white;
      font-weight: bold;
    }
  }

  .game {
    display: flex;
    flex-wrap: wrap;
    flex-direction: row;
    // justify-content: space-evenly;
    align-items: flex-start;
    box-sizing: border-box;

    .gameItem {
      width: 80px;
      height: 80px;
      margin: 5px 10px;
      flex-direction: column;
      background-color: #fbe7b5;
      cursor: pointer;
      color: white;
      text-shadow: 0px 0px 5px black;

      &:hover {
        transition: 0.3s;
        background-color: #9198e584;
        color: #666;
        text-shadow: 0px 0px 5px white;
      }

      @include f-c-c();
      @include border();
    }
  }

  .calendar {
    overflow: auto;
    @include scrollBar();
  }

  .anime {
    .el-tabs {
      height: 100%;
      overflow: auto;
      background-image: url(@/assets/webp/yinghua.webp);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
      @include scrollBar();
    }

    // .el-tabs__content{
    //   overflow: auto;
    // }
    // ul{
    //   height: 100%;
    // }
    li {
      display: flex;
      font-size: 14px;
      justify-content: space-between;
      flex-wrap: wrap;

      a {
        font-weight: bold;
        color: black;
        text-decoration: none;

        &:hover {
          color: white;
          text-shadow: 0px 0px 3px black;
        }

        &:nth-child(1) {
          flex: 6 1;
        }

        &:nth-child(2) {
          display: flex;
          justify-content: flex-end;
          align-items: flex-end;
          flex: 1 0;
        }
      }
    }
  }

  .music {
    // display: flex;
    // flex-direction: column;
    color: #409EFF;
    font-size: 14px;

    .song {
      font-size: 20px;
    }

    // .lyric{
    //   height: 20px;
    // }
    audio {
      margin-top: 14px;
    }

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
  }

  .empty {
    height: 100%;
    font-size: 30px;
    @include f-c-c();
  }
}

.bm-view {
  width: 100%;
  height: 300px;
}
</style>
<style lang="scss">
@import '@/assets/mixins.scss';

.el-popover {
  box-sizing: border-box;

  .list {
    display: flex;
    justify-content: space-evenly;
    margin-bottom: 30px;

    .item {
      margin: 5px;
      padding: 10px 0;
      width: 100px;
      flex-direction: column;
      color: white;
      @include f-c-c();
      @include border();
    }
  }

  .chart-1 {
    margin: 20px;
  }
}
</style>