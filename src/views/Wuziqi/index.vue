<template>
  <div id="page">
    <el-row :gutter="20">
      <el-col :span="16">
        <div class="square">
          <div class="outContainer">
            <div class="rowNum">
              <span v-for="item in lines" :key="item">{{ item }}</span>
            </div>
            <div class="second">
              <div class="colNum">
                <span v-for="item in lines" :key="item">{{ item }}</span>
              </div>
              <div id="bigbox">
                <!-- 棋盘 -->
                <div class="container container1" :style="{ '--boxRepeatTimes': boxRepeatTimes, }">
                  <div class="item" v-for="item in Math.pow(boxRepeatTimes, 2)" :key="item"></div>
                </div>
                <!-- 棋子 -->
                <div class="container container2" :style="{ '--lines': lines, }">
                  <div :class="{
                    item: true,
                    unActiveBlack: !item.isActive && !item.color && gaming,
                    activedBlack: item.isActive && !item.color ,
                    unActiveWhite: !item.isActive && item.color && gaming,
                    activedWhite: item.isActive && item.color ,
                  }" v-for="item in chesses" :key="item.id" @click="drop(item)">
                  </div>
                </div>
              </div>
              <div class="colNum">
                <span v-for="item in lines" :key="item">{{ item }}</span>
              </div>
            </div>
            <div class="rowNum">
              <span v-for="item in lines" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="8">
        <el-row :gutter="20">
          <el-col :span="8">
            棋盘大小：
          </el-col>
          <el-col :span="16">
            <el-slider v-model="lines" :min="20" :max="30" show-input :marks="linesMarks" @change="init" @input="init" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            最大悔棋次数：
          </el-col>
          <el-col :span="16">
            <el-slider v-model="repentMax" :min="0" :max="10" show-input :marks="repentMarks" @change="init"
              @input="init" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            白方剩余悔棋次数:
          </el-col>
          <el-col :span="16">
            <el-progress show-text :text-inside="true" :stroke-width="24"
              :percentage="repentChesses.white.max / repentMax * 100" status="success">
              <span>{{ `${repentChesses.white.max}/${repentMax}` }}</span>
            </el-progress>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            黑方剩余悔棋次数:
          </el-col>
          <el-col :span="16">
            <el-progress show-text :text-inside="true" :stroke-width="24"
              :percentage="repentChesses.black.max / repentMax * 100" status="success">
              <span>{{ `${repentChesses.black.max}/${repentMax}` }}</span>
            </el-progress>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="20">
            <el-button type="primary" @click="init">重新开始</el-button>
            <el-button type="danger" @click="repenting"
              :disabled="repentChesses[!chessColor ? 'white' : 'black'].list.length == 0">{{ `${!chessColor ? '白方' :
                '黑方'}悔棋`
              }}</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive } from 'vue';
// import Item from './components/Item.vue';

interface chessesItem {
  id: number,
  color: boolean,
  isActive: boolean,
  xNum: number,
  yNum: number,
}

//存放能够悔棋的棋子
const repentChesses: {
  white: {
    list: chessesItem[],
    max: number,
  },
  black: {
    list: chessesItem[],
    max: number,
  },
} = reactive({
  white: {
    list: [],
    max: 0,
  },
  black: {
    list: [],
    max: 0,
  },
});
//最大悔棋次数
const repentMax = ref(5);

const linesMarks = reactive({
  20: '20',
  30: '30',
})
const repentMarks = reactive({
  0: '0',
  10: '10',
})

const gaming = ref(false);
const lines = ref(22);//线重复次数
const boxRepeatTimes = computed(() => lines.value - 1);//格子重复次数
// const isActive=ref(false);
const chesses: chessesItem[] = reactive([]);
const chessColor = ref(true);//true白棋 false黑棋
const init = () => {
  let id = 0;
  chesses.splice(0, chesses.length)
  for (let i = 1; i <= lines.value; i++) {
    for (let j = 1; j <= lines.value; j++) {
      id++;
      chesses.push({
        id,
        xNum: j,
        yNum: i,
        color: true,
        isActive: false,
      })

    }
  }
  chessColor.value=true;
  repentChesses.black.list.splice(0, repentChesses.black.list.length);
  repentChesses.black.max = repentMax.value;
  repentChesses.white.list.splice(0, repentChesses.white.list.length);
  repentChesses.white.max = repentMax.value;
  gaming.value = true;
};
init();

const drop = (item: chessesItem) => {
  if (!gaming.value) return;
  item.color = chessColor.value;
  chessColor.value = !chessColor.value;
  item.isActive = true;
  chesses.forEach((e: chessesItem) => {
    if (!e.isActive) {
      e.color = chessColor.value;
    }
  })
  // console.log(item);
  findLine(item);
  const arr = repentChesses[item.color ? 'white' : 'black'].list;
  const max = repentChesses[item.color ? 'white' : 'black'].max;
  arr.push(item);
  if (arr.length > max) {
    arr.shift();
  }
}
/* 计算是否凑够五子 */
interface ANUM {
  [propName: string]: number
}
const findLine = (item: chessesItem) => {
  const total: ANUM = { left: 0, right: 0, top: 0, bottom: 0, left_top: 0, right_bottom: 0, right_top: 0, left_bottom: 0 };
  //递归计算
  const recursion = (item: chessesItem, symbol: string = 'all') => {
    const inner = (key: any, str: string) => {
      const chessesItem = chesses.find((e: chessesItem) => e.id == key && e.color == item.color && e.isActive);
      if (chessesItem) {
        // str=='right_top'&&console.log(chessesItem);
        total[str]++;
        recursion(chessesItem, str);
      }
    }
    const left = item.xNum > 1 ? item.id - 1 : null;
    const right = item.xNum < lines.value ? item.id + 1 : null;
    const top = item.id - lines.value > 0 ? item.id - lines.value : null;
    const bottom = item.id + lines.value < Math.pow(lines.value, 2) ? item.id + lines.value : null;
    const left_top = top ? (top - 1 > 0 && item.xNum > 1 ? top - 1 : null) : null;
    const right_bottom = bottom ? (bottom + 1 <= Math.pow(lines.value, 2) && item.xNum < lines.value ? bottom + 1 : null) : null;
    const right_top = top ? (top + 1 > 0 && item.xNum < lines.value ? top + 1 : null) : null;
    const left_bottom = bottom ? (bottom - 1 <= Math.pow(lines.value, 2) && item.xNum > 1 ? bottom - 1 : null) : null;
    if (symbol == 'all' || symbol == 'left') {
      left && inner(left, 'left');
    }
    if (symbol == 'all' || symbol == 'right') {
      right && inner(right, 'right');
    }
    if (symbol == 'all' || symbol == 'top') {
      top && inner(top, 'top');
    }
    if (symbol == 'all' || symbol == 'bottom') {
      bottom && inner(bottom, 'bottom');
    }
    if (symbol == 'all' || symbol == 'left_top') {
      left_top && inner(left_top, 'left_top');
    }
    if (symbol == 'all' || symbol == 'right_bottom') {
      right_bottom && inner(right_bottom, 'right_bottom');
    }
    if (symbol == 'all' || symbol == 'right_top') {
      right_top && inner(right_top, 'right_top');
    }
    if (symbol == 'all' || symbol == 'left_bottom') {
      left_bottom && inner(left_bottom, 'left_bottom');
    }
    // console.log('左' + left, '右' + right, '上' + top, '下' + bottom);
    // console.log('左上' + left_top, '右上' + right_top, '左下' + left_bottom, '右下' + right_bottom);
  }
  recursion(item);
  const heng = total.left + total.right + 1;
  const shu = total.top + total.bottom + 1;
  const pie = total.right_top + total.left_bottom + 1;
  const na = total.left_top + total.right_bottom + 1;
  const max = Math.max(heng, shu, pie, na);
  // console.log(max, total);
  if (max == 5) {
    alert(`${item.color ? '白' : '黑'}棋获胜！`);
    gaming.value = false;
  }
}

/* 悔棋相关 */

//悔棋
const repenting = () => {
  if (repentChesses[chessColor.value ? 'black' : 'white'].max) {
    const arr = repentChesses[chessColor.value ? 'black' : 'white'].list;
    arr[arr.length - 1].isActive = false;
    arr.pop();
    repentChesses[chessColor.value ? 'black' : 'white'].max--;
    chessColor.value = !chessColor.value;
  } else {
    alert('不能再悔棋了！');
  }

}

</script>

<style scoped lang="scss">
#page {
  width: 100%;
}

.square {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outContainer {
  // background-color: #eee;
  display: inline-block;
}

.second {
  display: flex;
}

.rowNum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 30px;
  // background-color: pink;
  padding: 0 20px;

  span {
    display: flex;
    width: 30px;
    justify-content: center;
    align-items: center;
  }
}

.colNum {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
  width: 30px;

  // background-color: pink;
  span {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

#bigbox {
  position: relative;
}

.container {
  display: grid;
}

.container1 {
  $boxRepeatTimes: var(--boxRepeatTimes); //格子重复次数
  $itemLength: 25px; //单位长度
  $gap: 5px; //单位间隔
  background-color: #eee;
  height: calc(($itemLength + $gap) * $boxRepeatTimes );
  border: 2px solid;
  padding: $gap;
  padding-bottom: 0;
  grid-template-columns: repeat($boxRepeatTimes, $itemLength);
  grid-template-rows: repeat($boxRepeatTimes, $itemLength);
  grid-gap: $gap;

  .item {
    background-color: #ac7d56;
  }
}

.container2 {
  position: absolute;
  left: -10px;
  top: -10px;
  $lines: var(--lines); //格子重复次数
  $itemLength: 5px; //单位长度
  $gap: 25px; //单位间隔
  // background-color: pink;
  height: calc(($itemLength + $gap) * $lines );
  border: 2px solid rgba(0, 0, 0, 0);
  // padding: $gap;
  grid-template-columns: repeat($lines, $itemLength);
  grid-template-rows: repeat($lines, $itemLength);
  grid-gap: $gap;

  .item {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    border: 1px solid rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0);
  }

  .unActiveWhite {
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      border-color: #000000;
      background-color: #ffffff;
      transform: scale(1.4, 1.4);
    }
  }

  .activedWhite {
    border-color: #000000;
    background-color: #ffffff;
  }

  .unActiveBlack {
    cursor: pointer;
    transition: 0.5s;

    &:hover {
      border-color: #000000;
      background-color: #000000;
      transform: scale(1.4, 1.4);
    }
  }

  .activedBlack {
    border-color: #000000;
    background-color: #000000;
  }
}

.el-row {
  margin-bottom: 20px;
}

.el-row:last-child {
  margin-bottom: 0;
}

.el-col {
  border-radius: 4px;
}

.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>