<template>
  <div id="homePage">
    <div class="row"
      :style="{ '--height': style[0].height, '--left': style[0].left.flex, '--right': style[0].right.flex, '--grow': style[0].center.grow, '--shrink': style[0].center.shrink, }">
      <div class="row-left" v-if="style[0].left.show">
        <div class="item">
          <div class="item-left">
            <!-- <el-icon><Clock /></el-icon> -->
            <img src="../assets/time.svg" alt="" width="30" height="30">
            <div class="time">{{ time }}</div>
          </div>
          <div class="item-right">
            <div class="date">{{ date }}</div>
            <div class="week">星期{{ weekformat(week) }}</div>
          </div>
        </div>
        <div class="item">
          <div class="item-left">
          </div>
          <div class="item-right"></div>
        </div>
      </div>
      <div class="row-center" v-if="style[0].center.show">
        <Carousel :list="list" :height="style[0].height"></Carousel>
      </div>
      <div class="row-right" v-if="style[0].right.show">
        <!-- <div id="container"></div> -->
      </div>
    </div>
    <div class="row"
      :style="{ '--height': style[1].height, '--left': style[1].left.flex, '--right': style[1].right.flex, '--grow': style[0].center.grow, '--shrink': style[0].center.shrink, }">
      <div class="row-left" v-if="style[1].left.show">
      </div>
      <div class="row-center" v-if="style[1].center.show">
      </div>
      <div class="row-right" v-if="style[1].right.show">
        <el-calendar v-model="value" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Carousel from '@/components/Carousel.vue';
import { ref, reactive, computed, onUnmounted } from 'vue';
import moment from 'moment';
import {Clock} from '@element-plus/icons-vue'

const value = ref(new Date())
const list = reactive([1, 2, 3, 4]);
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
    height: '550px',
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
const timer = ref(0);//定时器
const getTime = () => {
  timer.value = setInterval(() => {
    time.value = moment(new Date()).format('HH:mm:ss');
    // console.log(time.value);
  }, 1000);
}

// const initMap=()=>{
//   var map = new BMapGL.Map("container");
// }
const created = () => {
  getTime();
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

    .item {
      width: 100%;
      height: 50%;
      flex: 1 0;
      display: flex;
      justify-content: center;
      align-items: center;
      // flex-direction: column;
      // @include f-sb-c();
      .item-left,.item-right{
        flex: 1 0;
        text-align: center;
      }
      .time{
        font-size: 30px;
      }
      .time,.date,.week{
        color: #999;
      }
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
}
</style>