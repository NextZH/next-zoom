<template>
  <div id="homePage">
    <div class="row"
      :style="{ '--height': style[0].height, '--left': style[0].left.flex, '--right': style[0].right.flex, '--grow': style[0].center.grow, '--shrink': style[0].center.shrink, }">
      <div class="row-left" v-if="style[0].left.show">
        <div class="item clock">
          <div class="item-left">
            <img src="../assets/time.svg" alt="" width="30" height="30">
            <div class="time">{{ time }}</div>
          </div>
          <div class="item-right">
            <div class="date">{{ date }}</div>
            <div class="week">星期{{ weekformat(week) }}</div>
          </div>
        </div>
        <div class="item sky">
          <div class="item-left" v-loading="weatherLoading">
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
              <el-popover placement="right" title="未来一周天气" :width="800" trigger="click">
                <template #reference>
                  <span class="btn">
                    未来一周天气>>
                  </span>
                </template>
                <template #default>
                  <div class="list">
                    <div class="item" v-for="item in weekWeather" :key="item.date" :style="{backgroundColor:buttonColor}">
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
      :style="{ '--height': style[1].height, '--left': style[1].left.flex, '--right': style[1].right.flex, '--grow': style[0].center.grow, '--shrink': style[0].center.shrink, }">
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
      </div>
      <div class="row-center" v-if="style[1].center.show">
      </div>
      <div class="row-right calendar" v-if="style[1].right.show">
        <el-calendar v-model="value" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import { ref, reactive, computed, onUnmounted } from 'vue';
import moment from 'moment';
import menu from '@/constant/menu';
import { getWeather, getWeekWeather } from '@/api/home';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonType,buttonColor } = storeToRefs(themeStore);

//游戏列表
const gameList: any = computed(() => menu.filter((e: any) => e.meta.isGame));
const turnTo = (item: any) => {
  location.assign(item.path);
}
//日历
const value = ref(new Date());
//轮播图
const list = reactive([
  {
    name: '1.jpg',
  },
  {
    name: '2.jpg',
  },
  {
    name: '3.jpg',
  },
  {
    name: '4.jpg',
  },
  {
    name: '5.jpg',
  },
  {
    name: '6.png',
  },
]);
//布局样式
const style = reactive([
  {
    height: '300px',
    left: {
      flex: '1 0',
      show: true,
    },
    center: {
      grow: '2',
      shrink: '0',
      show: true,
    },
    right: {
      flex: '1 0',
      show: true,
    },
  },
  {
    height: '350px',
    left: {
      flex: '1 0',
      show: true,
    },
    center: {
      // flex: '2 0',
      grow: '2',
      shrink: '0',
      show: false,
    },
    right: {
      flex: '1 0',
      show: true,
    },
  },
])
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
const getWeekWeatherAsync = async () => {
  const res = await getWeekWeather();
  console.log(res);
  weekWeather = res.data;
}
//定位
const city = ref('成都');
//生命周期
const created = () => {
  getTime();
  // console.log(weather);
  getWeatherAsync();
  getWeekWeatherAsync();
}
created();
onUnmounted(() => {
  clearInterval(timer.value);
})
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#homePage {
  width: 100%;
}

.row {
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
      background-image: url(../assets/sky.webp);
      background-position: center center;
      background-repeat: no-repeat;
      background-size: cover;
    }

    .clock {
      background-image: -webkit-cross-fade(url(../assets/sky.webp), url(../assets/clock.webp), 50%);
      // background-image: cross-fade(url(../assets/sky.webp),url(../assets/clock.webp),50%);
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
    background-image: url(../assets/webp/desk2.webp);
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;

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
    justify-content: space-evenly;
    align-items: flex-start;
    box-sizing: border-box;

    .gameItem {
      width: 80px;
      height: 80px;
      margin: 5px;
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
    overflow: scroll;
    @include scrollBar();
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
  .list {
    display: flex;
    justify-content: space-evenly;

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
}
</style>