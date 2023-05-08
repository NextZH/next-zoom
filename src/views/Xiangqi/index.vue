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
                <span v-for="item in lines + 1" :key="item">{{ item }}</span>
              </div>
              <div id="bigbox">
                <!-- 棋盘 -->
                <div class="container container1" :style="{ '--boxRepeatTimes': boxRepeatTimes, }">
                  <div class="item" v-for="item in Math.pow(boxRepeatTimes, 2) + 1" :key="item">
                    <template v-if="item == 33">
                      <div class="title">楚河</div>
                      <div class="title">汉界</div>
                    </template>
                    <template
                      v-else-if="item == 4 || item == 5 || item == 12 || item == 13 || item == 53 || item == 54 || item == 61 || item == 62">
                      <div class="innerBox"></div>
                    </template>
                    <template v-else>
                      <div class="innerBox" v-for="num in 16" :key="num"></div>
                    </template>
                  </div>
                </div>
                <!-- 棋子 -->
                <div class="container container2" :style="{ '--lines': lines, }">
                  <div :class="{
                      item: true,
                      red: (item.hasChess || item.moveIn) ? (item.showInfo.type ? item.showInfo.type : item.chessInfo.type) == 'red' : false,
                      balck: (item.hasChess || item.moveIn) ? (item.showInfo.type ? item.showInfo.type : item.chessInfo.type) == 'black' : false,
                      hasChess: item.hasChess && !(item.moveIn && item.movable),
                      pickupHasChess: pickUp && pickUpChess.id == item.chessInfo.id && item.hasChess && !(item.moveIn && item.movable),
                      nothasChess: pickUp && item.movable && item.moveIn,
                    }" v-for="item in chesses" :key="item.id" @click="drop(item)" @mouseenter="mouseenter(item)"
                    @mouseleave="mouseleave(item)">
                    <span v-if="item.hasChess || (item.moveIn && item.movable)">
                      <template v-if="item.showInfo.name">
                        {{ item.showInfo.name }}
                      </template>
                      <template v-else>
                        {{ item.chessInfo.name }}
                      </template>
                      <!-- {{ item.chessInfo.name }} -->
                    </span>
                  </div>
                </div>
              </div>
              <div class="colNum">
                <span v-for="item in lines + 1" :key="item">{{ item }}</span>
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
            最大悔棋次数：
          </el-col>
          <el-col :span="16">
            <el-slider v-model="repentMax" :min="0" :max="10" show-input :marks="repentMarks" @change="init"
              @input="init" />
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="8">
            红方剩余悔棋次数:
          </el-col>
          <el-col :span="16">
            <el-progress show-text :text-inside="true" :stroke-width="24"
              :percentage="repentChesses.red.max / repentMax * 100" status="success">
              <span>{{ `${repentChesses.red.max}/${repentMax}` }}</span>
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
            <el-button :type="buttonType" @click="init">重新开始</el-button>
            <el-button type="danger" @click="repenting"
              :disabled="repentChesses[!chessColor ? 'red' : 'black'].list.length == 0">{{ `${!chessColor ? '红方' :
                '黑方'}悔棋`
              }}</el-button>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonType,buttonColor } = storeToRefs(themeStore);

interface chessesItem {
  id: number,
  hasChess: boolean,//是否有棋子在该位置
  moveIn: boolean,//是否移动进入
  movable: boolean,//可移动
  xNum: number,
  yNum: number,
  chessInfo: chessItem,//棋子信息
  showInfo: chessItem,//展示的棋子信息
}
interface chessItem {
  name: string | null,
  id: number | null,
  xNum: number | null,
  yNum: number | null,
  died: boolean | null,
  type: string,
}
//存放能够悔棋的棋子
const repentChesses: {
  red: {
    list: chessesItem[],
    max: number,
  },
  black: {
    list: chessesItem[],
    max: number,
  },
  [porpName: string]: {
    list: chessesItem[],
    max: number,
  },
} = reactive({
  red: {
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

const repentMarks = reactive({
  0: '0',
  10: '10',
})
//空棋
const blankChess: chessItem = reactive({
  name: null,
  id: null,
  xNum: null,
  yNum: null,
  died: null,
  type: '',
})
const gaming = ref(false);
const lines = ref(9);//线重复次数
const boxRepeatTimes = computed(() => lines.value - 1);//格子重复次数
// const isActive=ref(false);
const chesses: chessesItem[] = reactive([]);
const chessColor = ref(true);//true红棋 false黑棋

const blackChess: chessItem[] = reactive([
  {
    name: '俥',
    id: 1,
    xNum: 1,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '馬',
    id: 2,
    xNum: 2,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '象',
    id: 3,
    xNum: 3,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '仕',
    id: 4,
    xNum: 4,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '将',
    id: 5,
    xNum: 5,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '仕',
    id: 6,
    xNum: 6,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '象',
    id: 7,
    xNum: 7,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '馬',
    id: 8,
    xNum: 8,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '俥',
    id: 9,
    xNum: 9,
    yNum: 1,
    died: false,
    type: 'black',
  },
  {
    name: '炮',
    id: 10,
    xNum: 2,
    yNum: 3,
    died: false,
    type: 'black',
  },
  {
    name: '炮',
    id: 11,
    xNum: 8,
    yNum: 3,
    died: false,
    type: 'black',
  },
  {
    name: '卒',
    id: 12,
    xNum: 1,
    yNum: 4,
    died: false,
    type: 'black',
  },
  {
    name: '卒',
    id: 13,
    xNum: 3,
    yNum: 4,
    died: false,
    type: 'black',
  },
  {
    name: '卒',
    id: 14,
    xNum: 5,
    yNum: 4,
    died: false,
    type: 'black',
  },
  {
    name: '卒',
    id: 15,
    xNum: 7,
    yNum: 4,
    died: false,
    type: 'black',
  },
  {
    name: '卒',
    id: 16,
    xNum: 9,
    yNum: 4,
    died: false,
    type: 'black',
  },
])
const redChess: chessItem[] = reactive([
  {
    name: '車',
    id: 17,
    xNum: 1,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '馬',
    id: 18,
    xNum: 2,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '相',
    id: 19,
    xNum: 3,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '士',
    id: 20,
    xNum: 4,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '帅',
    id: 21,
    xNum: 5,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '士',
    id: 22,
    xNum: 6,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '相',
    id: 23,
    xNum: 7,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '馬',
    id: 24,
    xNum: 8,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '車',
    id: 25,
    xNum: 9,
    yNum: 10,
    died: false,
    type: 'red',
  },
  {
    name: '砲',
    id: 26,
    xNum: 2,
    yNum: 8,
    died: false,
    type: 'red',
  },
  {
    name: '砲',
    id: 27,
    xNum: 8,
    yNum: 8,
    died: false,
    type: 'red',
  },
  {
    name: '兵',
    id: 28,
    xNum: 1,
    yNum: 7,
    died: false,
    type: 'red',
  },
  {
    name: '兵',
    id: 29,
    xNum: 3,
    yNum: 7,
    died: false,
    type: 'red',
  },
  {
    name: '兵',
    id: 30,
    xNum: 5,
    yNum: 7,
    died: false,
    type: 'red',
  },
  {
    name: '兵',
    id: 31,
    xNum: 7,
    yNum: 7,
    died: false,
    type: 'red',
  },
  {
    name: '兵',
    id: 32,
    xNum: 9,
    yNum: 7,
    died: false,
    type: 'red',
  },
])
const init = () => {
  let id = 0;
  chesses.splice(0, chesses.length)
  for (let i = 1; i <= lines.value + 1; i++) {
    for (let j = 1; j <= lines.value; j++) {
      id++;
      chesses.push({
        id,
        xNum: j,
        yNum: i,
        hasChess: false,
        moveIn: false,
        movable: false,
        chessInfo: { ...blankChess },
        showInfo: { ...blankChess },
      })

    }
  }
  chessColor.value = true;
  chesses.forEach((e: chessesItem) => {
    let item = null;
    if (e.yNum > 5) {
      item = redChess.find((e2: chessItem) => e2.xNum == e.xNum && e2.yNum == e.yNum);
    } else {
      item = blackChess.find((e2: chessItem) => e2.xNum == e.xNum && e2.yNum == e.yNum);
    }
    if (item) {
      e.hasChess = true;
      e.chessInfo = item;
    }
  })
  repentChesses.black.list.splice(0, repentChesses.black.list.length);
  repentChesses.black.max = repentMax.value;
  repentChesses.red.list.splice(0, repentChesses.red.list.length);
  repentChesses.red.max = repentMax.value;
  gaming.value = true;
};
init();
watch(redChess[4], (newValue) => {
  if (newValue.died) {
    alert('黑方获胜');
    gaming.value = false;
  }
}, {
  deep: true,
})
watch(blackChess[4], (newValue) => {
  if (newValue.died) {
    alert('红方获胜');
    gaming.value = false;
  }
}, {
  deep: true,
})

const pickUp = ref(false);
//被举起的棋子
let pickUpChess: chessItem = reactive({ ...blankChess });
//被挡住的棋子
let blockChess: chessItem = reactive({ ...blankChess });
const drop = (item: chessesItem) => {
  if (!gaming.value) return;
  if (item.chessInfo == pickUpChess) {
    pickUp.value = !pickUp.value;
    chesses.forEach((e: chessesItem) => {
      e.movable = false;
    })
    return;
  }
  if (!pickUp.value && !item.hasChess) return;
  if (!pickUp.value && ((item.chessInfo.type == 'red' && !chessColor.value) || (item.chessInfo.type == 'black' && chessColor.value))) return;
  if (pickUp.value && item.hasChess) {
    if (item.chessInfo.type != pickUpChess.type) {
      item.chessInfo.died = true;
    } else {
      return;
    }
  }
  if (!item.movable && pickUp.value) return;
  pickUp.value = !pickUp.value;
  if (pickUp.value) {
    (pickUpChess as chessItem) = item.chessInfo;
    //计算能移动的格子
    movable(item);
  } else {
    chesses.forEach((e: chessesItem) => {
      e.movable = false;
      if (e.hasChess && e.chessInfo == pickUpChess) {
        const arr = repentChesses[e.chessInfo.type].list;
        const max = repentChesses[e.chessInfo.type].max;
        arr.push({ ...e, chessInfo: { ...e.chessInfo }, showInfo: { ...e.showInfo } });
        if (arr.length > max) {
          arr.shift();
        }
        e.hasChess = false;
        e.chessInfo = { ...blankChess }
      }
    })
    item.hasChess = true;
    item.chessInfo = pickUpChess;
    pickUpChess = { ...blankChess }
    item.showInfo = { ...blankChess };
    blockChess = { ...blankChess };
    item.moveIn = false;
    chessColor.value = !chessColor.value;
  }
}
const rule = reactive({
  ma: (zhi: zhiType, item: chessesItem) => {
    const inner = (chessesItem: chessesItem, key: string) => {
      if (chessesItem && !chessesItem.hasChess) {
        const { xie } = findAround(chessesItem);
        for (const key2 in xie) {
          if (key2.includes(key)) {
            if (!xie[key2].hasChess || (xie[key2].hasChess && xie[key2].chessInfo.type != item.chessInfo.type)) {
              xie[key2].movable = true;
            }
          }
        }
      }
    }
    for (const key in zhi) {
      zhi[key] && inner(zhi[key], key)
    }
  },
  che: (zhi: zhiType, item: chessesItem) => {
    const inner = (chessesItem: chessesItem, key: string) => {
      if (chessesItem && !chessesItem.hasChess) {
        chessesItem.movable = true;
        const { zhi } = findAround(chessesItem);
        zhi[key] && inner(zhi[key], key)
      } else if (chessesItem && chessesItem.hasChess) {
        if (chessesItem.chessInfo.type != item.chessInfo.type) {
          chessesItem.movable = true;
        }
      }
    }
    for (const key in zhi) {
      zhi[key] && inner(zhi[key], key)
    }
  },
  xiang: (xie: xieType, item: chessesItem) => {
    const inner = (chessesItem: chessesItem, key: string) => {
      if (chessesItem && !chessesItem.hasChess) {
        const { xie } = findAround(chessesItem);
        if (xie[key] && !xie[key].hasChess) {
          xie[key].movable = true;
        } else if (xie[key] && xie[key].hasChess) {
          if (xie[key].chessInfo.type != item.chessInfo.type) {
            xie[key].movable = true;
          }
        }
      }
    }
    for (const key in xie) {
      xie[key] && inner(xie[key], key)
    }
  },
  shi: (xie: xieType, item: chessesItem) => {
    const inner = (chessesItem: chessesItem, key: string) => {
      if (chessesItem && !chessesItem.hasChess) {
        chessesItem.movable = true;
      } else if (chessesItem && chessesItem.hasChess) {
        if (chessesItem.chessInfo.type != item.chessInfo.type) {
          chessesItem.movable = true;
        }
      }
    }
    for (const key in xie) {
      xie[key] && inner(xie[key], key)
    }
  },
  pao: (zhi: zhiType, item: chessesItem) => {
    const num: {
      [propName: string]: number,
    } = {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    }
    const inner = (chessesItem: chessesItem, key: string) => {
      if (chessesItem && !chessesItem.hasChess && num[key] == 0) {
        chessesItem.movable = true;
        const { zhi } = findAround(chessesItem);
        zhi[key] && inner(zhi[key], key)
      } else if (chessesItem && chessesItem.hasChess && num[key] == 0) {
        num[key]++;
        const { zhi } = findAround(chessesItem);
        zhi[key] && inner(zhi[key], key)
      } else if (chessesItem && !chessesItem.hasChess && num[key] == 1) {
        const { zhi } = findAround(chessesItem);
        zhi[key] && inner(zhi[key], key)
      } else if (chessesItem && chessesItem.hasChess && num[key] == 1) {
        if (chessesItem.chessInfo.type != item.chessInfo.type) {
          chessesItem.movable = true;
        }
      }
    }
    for (const key in zhi) {
      zhi[key] && inner(zhi[key], key)
    }
  },
  wang: (zhi: zhiType, item: chessesItem) => {
    const num: {
      [propName: string]: number,
    } = {
      jiang: 0,
      shuai: 0
    }
    //计算自己阵营内能移动的格子
    const check = (chessesItem: chessesItem, key: string) => {
      if (item.chessInfo.name == '将') {
        if (((chessesItem.id >= 4 && chessesItem.id <= 6) || (chessesItem.id >= 13 && chessesItem.id <= 15) || (chessesItem.id >= 22 && chessesItem.id <= 24)) && num.jiang == 0) {
          chessesItem.movable = true;
        }
      }
      if (item.chessInfo.name == '帅') {
        if (((chessesItem.id >= 67 && chessesItem.id <= 69) || (chessesItem.id >= 76 && chessesItem.id <= 78) || (chessesItem.id >= 85 && chessesItem.id <= 87)) && num.shuai == 0) {
          chessesItem.movable = true;
        }
      }
    }
    //计算是否能够击杀对方老王
    const check2 = (chessesItem: chessesItem, key: string) => {
      if (chessesItem.chessInfo.name == '帅' && key == 'bottom') {
        if (!chessesItem.hasChess) {
          num.jiang++;
          const { zhi: { bottom } } = findAround(chessesItem);
          inner(bottom, key);
        } else {
          if (chessesItem.chessInfo.name == '帅') {
            chessesItem.movable = true;
          }
        }
      }
      if (item.chessInfo.name == '帅' && key == 'top') {
        if (!chessesItem.hasChess) {
          num.shuai++;
          const { zhi: { top } } = findAround(chessesItem);
          inner(top, key);
        } else {
          if (chessesItem.chessInfo.name == '将') {
            chessesItem.movable = true;
          }
        }
      }
    }
    const inner = (chessesItem: chessesItem, key: string) => {
      if (chessesItem && !chessesItem.hasChess) {
        if ((item.chessInfo.name == '帅' && num.shuai == 0) || (item.chessInfo.name == '将' && num.jiang == 0)) {
          check(chessesItem, key);
        }
        check2(chessesItem, key);
      } else if (chessesItem && chessesItem.hasChess) {
        if (chessesItem.chessInfo.type != item.chessInfo.type) {
          if ((item.chessInfo.name == '帅' && num.shuai == 0) || (item.chessInfo.name == '将' && num.jiang == 0)) {
            check(chessesItem, key);
          }
          if ((item.chessInfo.name == '帅' && num.shuai != 0) || (item.chessInfo.name == '将' && num.jiang != 0)) {
            check2(chessesItem, key);
          }
        }
      }
    }
    for (const key in zhi) {
      zhi[key] && inner(zhi[key], key)
    }
  },
  bing: (zhi: zhiType, item: chessesItem) => {
    const inner = (chessesItem: chessesItem, key: string) => {
      if (chessesItem && !chessesItem.hasChess) {
        chessesItem.movable = true;
      } else if (chessesItem && chessesItem.hasChess) {
        if (chessesItem.chessInfo.type != item.chessInfo.type) {
          chessesItem.movable = true;
        }
      }
    }
    for (const key in zhi) {
      if (item.chessInfo.name == '卒') {
        if (item.yNum < 6) {
          if (key == 'bottom') {
            zhi[key] && inner(zhi[key], key)
          }
        } else {
          if (key != 'top') {
            zhi[key] && inner(zhi[key], key)
          }
        }
      } else if (item.chessInfo.name == '兵') {
        if (item.yNum > 5) {
          if (key == 'top') {
            zhi[key] && inner(zhi[key], key)
          }
        } else {
          if (key != 'bottom') {
            zhi[key] && inner(zhi[key], key)
          }
        }
      }
    }
  },
})
interface aroundType {
  zhi: zhiType,
  xie: xieType,
}
interface zhiType {
  left: chessesItem,
  right: chessesItem,
  top: chessesItem,
  bottom: chessesItem,
  [propName: string]: chessesItem
}
interface xieType {
  left_top: chessesItem,
  right_bottom: chessesItem,
  right_top: chessesItem,
  left_bottom: chessesItem,
  [propName: string]: chessesItem
}
const findAround = (item: chessesItem) => {
  let left: any = item.xNum > 1 ? item.id - 1 : null;
  let right: any = item.xNum < lines.value ? item.id + 1 : null;
  let top: any = item.id - lines.value > 0 ? item.id - lines.value : null;
  let bottom: any = item.id + lines.value < lines.value * (lines.value + 1) ? item.id + lines.value : null;
  let left_top: any = top ? (top - 1 > 0 && item.xNum > 1 ? top - 1 : null) : null;
  let right_bottom: any = bottom ? (bottom + 1 <= lines.value * (lines.value + 1) && item.xNum < lines.value ? bottom + 1 : null) : null;
  let right_top: any = top ? (top + 1 > 0 && item.xNum < lines.value ? top + 1 : null) : null;
  let left_bottom: any = bottom ? (bottom - 1 <= lines.value * (lines.value + 1) && item.xNum > 1 ? bottom - 1 : null) : null;
  // cosnt [left,right,top,bottom,left_top,right_bottom,right_top,left_bottom]=[left,right,top,bottom,left_top,right_bottom,right_top,left_bottom].map(()=>{})
  left = chesses.find((e: chessesItem) => e.id == left);
  right = chesses.find((e: chessesItem) => e.id == right);
  top = chesses.find((e: chessesItem) => e.id == top);
  bottom = chesses.find((e: chessesItem) => e.id == bottom);
  left_top = chesses.find((e: chessesItem) => e.id == left_top);
  right_bottom = chesses.find((e: chessesItem) => e.id == right_bottom);
  right_top = chesses.find((e: chessesItem) => e.id == right_top);
  left_bottom = chesses.find((e: chessesItem) => e.id == left_bottom);
  const obj: aroundType = {
    zhi: {
      left,
      right,
      top,
      bottom
    },
    xie: {
      left_top,
      right_bottom,
      right_top,
      left_bottom,
    }
  }
  return obj;
}
//计算能移动的格子
const movable = (item: chessesItem) => {
  const { zhi, xie } = findAround(item);
  const name = item.chessInfo.name;
  if (name == '馬') {
    rule.ma(zhi, item);
  } else if (name == '俥' || name == '車') {
    rule.che(zhi, item);
  } else if (name == '相' || name == '象') {
    rule.xiang(xie, item);
  } else if (name == '仕' || name == '士') {
    rule.shi(xie, item);
  } else if (name == '炮' || name == '砲') {
    rule.pao(zhi, item);
  } else if (name == '将' || name == '帅') {
    rule.wang(zhi, item);
  } else if (name == '卒' || name == '兵') {
    rule.bing(zhi, item);
  }
}
const mouseenter = (item: chessesItem) => {
  if (pickUp.value && item.movable) {
    // console.log(22222);
    blockChess = item.showInfo;
    item.showInfo = pickUpChess;
    item.moveIn = true;
  }
}
const mouseleave = (item: chessesItem) => {
  if (pickUp.value && item.movable) {
    // console.log(111);
    item.showInfo = blockChess;
    blockChess = { ...blankChess };
    item.moveIn = false;
  }
}

/* 悔棋相关 */

//悔棋
const repenting = () => {
  if (repentChesses[chessColor.value ? 'black' : 'red'].max) {
    const arr = repentChesses[chessColor.value ? 'black' : 'red'].list;
    const last = arr[arr.length - 1];
    let needRepentChess: chessItem;
    chesses.forEach((e: chessesItem) => {
      if (e.hasChess && e.chessInfo.id == last.chessInfo.id) {
        needRepentChess = e.chessInfo;
        e.hasChess = false;
        e.chessInfo = { ...blankChess };
      }
    })
    chesses.forEach((e: chessesItem) => {
      if (e.id == last.id) {
        e.hasChess = true;
        e.chessInfo = needRepentChess;
      }
    })
    arr.pop();
    repentChesses[chessColor.value ? 'black' : 'red'].max--;
    chessColor.value = !chessColor.value;
  } else {
    alert('不能再悔棋了！');
  }

}

</script>

<style scoped lang="scss">
@import "../../assets/mixins.scss";

#page {
  width: 100%;
}

.square {
  display: flex;
  justify-content: center;
  align-items: center;
}

.outContainer {
  // background-color: #000000;
  display: inline-block;
}

.second {
  display: flex;
}

$bold: 60px;

.rowNum {
  padding: 0 30px;

  @include num(height, $bold) {
    width: $bold;
  }
}

.colNum {
  flex-direction: column;
  @include num(width, $bold)
}

#bigbox {
  position: relative;
}

.container {
  display: grid;
}

.container1 {
  $boxRepeatTimes: var(--boxRepeatTimes); //格子重复次数
  $itemLength: 60px; //单位长度
  $gap: 5px; //单位间隔
  background-color: #000000;
  height: calc(($itemLength + $gap) * ($boxRepeatTimes + 1) + 10px);
  border: 2px solid;
  padding: $gap;
  padding-bottom: 0;
  grid-template-columns: repeat($boxRepeatTimes, $itemLength);
  grid-template-rows: repeat($boxRepeatTimes, $itemLength) $itemLength;
  grid-gap: $gap;

  .item {
    background-color: #ac7d56;
    box-sizing: border-box;

    &:nth-child(33) {
      grid-column: 1 / span 8;
      background-color: white;
      display: flex;
      justify-content: space-evenly;
      // flex-direction: column;
      align-items: center;

      .title {
        flex: 1;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }

    $list1: 9, 15, 18, 20, 22, 24, 35, 37, 39, 41, 42, 48;
    $list2: 10, 16, 17, 19, 21, 23, 34, 36, 38, 40, 43, 49;
    $list3: 17, 23, 26, 28, 30, 32, 43, 45, 47, 49, 50, 56;
    $list4: 18, 24, 25, 27, 29, 31, 42, 44, 46, 48, 51, 57;
    $allList: (
      (arr:$list1, i:16, dir1:bottom, dir2:right),
      (arr:$list2, i:13, dir1:bottom, dir2:left),
      (arr:$list3, i:4, dir1:top, dir2:right),
      (arr:$list4, i:1, dir1:top, dir2:left),
    );

  @each $obj in $allList {
    @each $index in map-get($obj, arr) {
      &:nth-child(#{$index}) {
        box-sizing: border-box;
        display: flex;
        flex-wrap: wrap;
        padding: 5px;

        .innerBox {
          width: 25%;
          height: 25%;
          // background-color: pink;
          box-sizing: border-box;

          &:nth-child(#{map-get($obj,i)}) {
            border-#{map-get($obj,dir1)}: 2px solid #000000;
            border-#{map-get($obj,dir2)}: 2px solid #000000;
          }
        }
      }
    }
  }

  $list5: 4 13 53 62;
  $list6: 5 12 54 61;

  @mixin tilt($value) {
    box-sizing: border-box;
    overflow: hidden;

    .innerBox {
      width: 150%;
      height: 150%;
      // background-color: pink;
      box-sizing: border-box;
      transform-origin: $value 0px;
      border-top: 6px solid #000000;
    }
  }

  @each $i in $list5 {
    &:nth-child(#{$i}) {
      .innerBox {
        transform: rotateZ(45deg) translateY(-3px);
      }

      @include tilt(0px)
    }

  }

  @each $i in $list6 {
    &:nth-child(#{$i}) {
      .innerBox {
        transform: rotateZ(-45deg) translate(-20px, -24px);
      }

      @include tilt(100%)
    }

  }
}
}

.container2 {
  position: absolute;
  left: -22px;
  top: -22px;
  $lines: var(--lines); //格子重复次数
  $itemLength: 5px; //单位长度
  $gap: 60px; //单位间隔
  // background-color: pink;
  height: calc(($itemLength + $gap) * $lines );
  border: 2px solid rgba(0, 0, 0, 0);
  // padding: $gap;
  grid-template-columns: repeat($lines, $itemLength);
  grid-template-rows: repeat($lines, $itemLength);
  grid-gap: $gap;

  .item {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 2px solid rgba(0, 0, 0, 0);
    background-color: rgba(0, 0, 0, 0);
    box-sizing: border-box;
    font-size: 18px;
    @include f-c-c();
  }

  .red {
    color: darkred;
  }

  .black {
    color: black;
  }

  $chessColor: #ba8152;
  $chessColor0_5: #ba815277;

  .hasChess {
    cursor: pointer;
    transition: 0.5s;
    border-color: #000000;
    background-color: $chessColor;

    &:hover {
      transform: scale(1.3, 1.3);
    }
  }

  .pickupHasChess {
    // cursor: pointer;
    // border-color: #000000;
    // background-color: $chessColor;
    transform: scale(1.3, 1.3);
  }

  .nothasChess {
    // transition: 0.5s;
    cursor: pointer;

    &:hover {
      border-color: rgba(0, 0, 0, 0.5);
      background-color: $chessColor0_5;
    }
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
}</style>