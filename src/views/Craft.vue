<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div id="page_1024">
    <div class="box">
      <div class="chess chessboard">
        <div class="cell" v-for="item in 16" :key="item"></div>
      </div>
      <div class="chess chessPieces">
        <div :class="{ cell: true, ...getColor(item),new:item.new,hasChess:item.value > 0 }" v-for="item in chesses" :key="item.id">{{
          item.value > 0 ? item.value : '' }}</div>
      </div>
    </div>
    <div class="btns">
      <el-button class="refrashBtn" :disabled="!gameStatus" type="primary" @click="init">重置</el-button>
      <el-button class="startBtn" :disabled="gameStatus" type="primary" @click="startGame">开始</el-button>
      <div class="keyboard">
        <div class="floor top">
          <div class="key-cell up" @click="chessUp">↑</div>
        </div>
        <div class="floor bottom">
          <div class="key-cell left" @click="chessLeft">←</div>
          <div class="key-cell down" @click="chessDown">↓</div>
          <div class="key-cell right" @click="chessRight">→</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import _ from 'lodash'
import { ElMessage } from 'element-plus';

const gameStatus = ref(false);//是否开始游戏

const random = ref(0);
const startRandom = ref(0);
const chesses: any = ref([]);

const getColor = (item: any) => {
  switch (item.value) {
    case 2:
      return { chess_2: true };
    case 4:
      return { chess_4: true };
    case 8:
      return { chess_8: true };
    case 16:
      return { chess_16: true };
    case 32:
      return { chess_32: true };
    case 64:
      return { chess_64: true };
    case 128:
      return { chess_128: true };
    case 256:
      return { chess_256: true };
    case 512:
      return { chess_512: true };
    case 1024:
      return { chess_1024: true };
    case 2048:
      return { chess_2048: true };
    case 4096:
      return { chess_4096: true };
    default:
      return {};
  }
}

const init = () => {
  chesses.value = [];
  for (let i = 0; i < 16; i++) {
    chesses.value.push({
      value: 0,
      id: i,
      new:false
    })
  }
  gameStatus.value = false;
}

const startGame = () => {
  do {
    startRandom.value = Math.ceil(Math.random() * 16);
    random.value = Math.ceil(Math.random() * 16);
  } while (startRandom.value == random.value);
  chesses.value[startRandom.value - 1].value = 2;
  chesses.value[startRandom.value - 1].new = true;
  chesses.value[random.value - 1].value = 2;
  chesses.value[random.value - 1].new = true;
  gameStatus.value = true;
}
const createNew = (newChesses: any[]) => {
  if (_.isEqual(chesses.value, newChesses)) {
    ElMessage({
      message: '没有可以移动的格子',
      type: 'error',
    })
  } else {
    chesses.value = newChesses;
    // console.log(chesses.value);
    const arr = chesses.value.filter((e: any) => e.value).map((e: any) => e.id + 1);
    if (arr.length == 16) {
      // ElMessage({
      //   message: '游戏结束!',
      //   type: 'suceess',
      // })
    } else {
      do {
        random.value = Math.ceil(Math.random() * 16);
      } while (arr.includes(random.value));
      chesses.value[random.value - 1].value = 2;
      chesses.value.forEach((e: any) => {
        e.new = false;
      })
      chesses.value[random.value - 1].new = true;
    }
  }
}
//灰 白 青 绿 蓝 紫 黄 橙 红 黑 黑白 彩
const chessDown = () => {
  moveChess('down');
}
const chessRight = () => {
  moveChess('right');
}
const chessUp = () => {
  moveChess('up');
}
const chessLeft = () => {
  moveChess('left');
}
const moveChess = (flag: string) => {
  if (!gameStatus.value) return;
  let params: any = {};
  switch (flag) {
    case 'down':
      params = {
        condition: (i: number) => i + 4 <= 15,
        self: (index: number) => 15 - index,
        next: (i: number) => i + 4,
        revChesses: () => _.cloneDeep(chesses.value).reverse()//因为是向下移动需要优先从后面计算
      }
      break;
    case 'up':
      params = {
        condition: (i: number) => i - 4 >= 0,
        self: (index: number) => index,
        next: (i: number) => i - 4,
        revChesses: () => _.cloneDeep(chesses.value)
      }
      break;
    case 'left':
      params = {
        condition: (i: number) => i % 4 > 0,
        self: (index: number) => index,
        next: (i: number) => i - 1,
        revChesses: () => _.cloneDeep(chesses.value)
      }
      break;
    case 'right':
      params = {
        condition: (i: number) => i % 4 < 3,
        self: (index: number) => 15 - index,
        next: (i: number) => i + 1,
        revChesses: () => _.cloneDeep(chesses.value).reverse()//因为是向右移动需要优先从后面计算
      }
      break;
    default:
      break;
  }
  const newChesses = _.cloneDeep(chesses.value);//所有都算完之后的棋子布局
  const handle: any = (e: any, i: number, index: number) => {
    const {condition,self,next}=params;
    if (condition(i)) {
      if (newChesses[next(i)].value == 0) {
        //1.移动方没有方块
        return handle(e, next(i), index);
      } else if (newChesses[next(i)].value != 0 && newChesses[next(i)].value != e.value) {
        //2.移动方有不同方块
        if (newChesses[i].id != e.id) {
          newChesses[i].value = e.value;
          newChesses[self(index)].value = 0;
          return `通过第1种情况，移动到第${newChesses[i].id + 1}个格子上，值为${newChesses[i].value}`
        } else {
          return '通过第1种情况，没有移动';
        }
      } else {
        //3.移动方有相同方块
        newChesses[next(i)].value = e.value * 2;
        newChesses[self(index)].value = 0;
        return `通过第2种情况，移动到第${newChesses[next(i)].id + 1}个格子上，值为${newChesses[next(i)].value}`
      }
    } else {
      //4.已经到移动方最里面
      if (newChesses[i].id != e.id) {
        newChesses[i].value = e.value;
        newChesses[self(index)].value = 0;
        return `通过第3种情况，移动到第${newChesses[i].id + 1}个格子上，值为${newChesses[i].value}`
      } else {
        return '通过第3种情况，没有移动';
      }
    }
  }
  params.revChesses().forEach((e: any, index: number) => {
    if (e.value != 0) {
      const msg = handle(e, e.id, index);
      console.log(`第${e.id + 1}个格子的值,${msg}`);
    }
  });
  createNew(newChesses);
}

(() => {
  init();
})()
</script>

<style lang="scss" scoped>
#page_1024 {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  .box {
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 100px;
    position: relative;

    .chess {
      display: flex;
      flex-wrap: wrap;


      .cell {
        width: 100px;
        height: 100px;
        box-sizing: border-box;
        border: 2px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        color: white;
        font-size: 20px;
        font-weight: bold;
        text-shadow: 1px 1px 1px black;
      }
    }

    .chessboard {
      .cell {
        background-color: #e7e5e5;
      }
    }

    .chessPieces {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;

      .cell {
        transition: 0.5s;
        transform: scale(0,0);

        &.up-chess {
          transform: translateY(-100px);
        }
      }
      .hasChess{
        transform: scale(1,1);
      }
      .new{
        transition: 1s;
        transform-origin: 50% 50%;
        transform: scale(1,1);
      }

      .chess_2 {
        background-color: #9e9e9e;
      }

      .chess_4 {
        background-color: #ffffff;
      }

      .chess_8 {
        background-color: #8ceb79;
      }

      .chess_16 {
        background-color: rgb(2, 142, 28);
      }

      .chess_32 {
        background-color: #79cbeb;
      }

      .chess_64 {
        background-color: #c179eb;
      }

      .chess_128 {
        background-color: #f1ee27;
      }

      .chess_256 {
        background-color: #f0861c;
      }

      .chess_512 {
        background-color: #fb3232;
      }

      .chess_1024 {
        background-color: #0f0f0f;
      }

      .chess_2048 {
        background-color: #ffffff;
        animation: identifier 1s linear forwards infinite;
        @keyframes identifier {
          50%{
            background-color: #000000;
          }
        }
      }

      .chess_4096 {
        background-color: #ff2a2a;
        animation: identifier2 2s linear forwards infinite;
        @keyframes identifier2 {
          10%{
            background-color: rgb(245, 101, 29);
          }
          20%{
            background-color: rgb(245, 195, 29);
          }
          30%{
            background-color: rgb(180, 245, 29);
          }
          40%{
            background-color: rgb(65, 245, 29);
          }
          50%{
            background-color: rgb(29, 245, 231);
          }
          60%{
            background-color: rgb(29, 90, 245);
          }
          70%{
            background-color: rgb(155, 29, 245);
          }
          80%{
            background-color: rgb(245, 29, 191);
          }
          90%{
            background-color: rgb(245, 29, 65);
          }
        }
      }
    }
  }

  .btns {
    display: flex;
    justify-content: center;
    align-items: center;

    .refrashBtn {
      width: 80px;
    }

    .startBtn {
      width: 80px;
      margin-right: 40px;
    }

    .keyboard {
      display: flex;
      flex-direction: column;

      .floor {
        display: flex;
        justify-content: center;
      }

      .top {
        .key-cell {
          margin: 0 10px 5px;
        }
      }

      .key-cell {
        box-sizing: border-box;
        margin: 5px;
        display: flex;
        justify-content: center;
        align-items: center;
        width: 50px;
        height: 50px;
        border-radius: 5px;
        background-color: #ccc;
        font-size: 18px;
        cursor: pointer;
        transition: 0.1s;

        &:active {
          background-color: #eb7979;
          border: 2px solid;
        }
      }
    }
  }
}
</style>