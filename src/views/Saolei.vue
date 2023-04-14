<!-- 这是一个纯原生html开发的页面，未引入UI框架 -->

<template>
  <div class="page">
    <div class="top">
      <div class="left">
        <div class="leftBox" :style="{ width: width * basicWidth + 'px' }">
          <table class="bigBox" :style="{ width: width * basicWidth + 'px' }" cellspacing="0">
            <tr v-for="width in box" :key="width.wNum">
              <td :class="{
                item: true,
                unActiveItem: !height.activeItem,
                unActiveItemHover: !height.activeItem && gameStart && !gameOver,
                activedItem: height.activeItem,
                hasLandmine: gameOver && height.hasLandmine,
                isClear: height.isClear,
                gameOver: gameOver || !gameStart,
              }" 
              v-for="height in width.children" 
              :key="height.hNum" 
              :style="{ width: basicWidth + 'px',height:basicWidth-2+'px'}"
              @click.left="clickBox(height)"
                @click.middle="demining(height)">
                <div v-if="(height.activeItem || gameOver) && height.hasLandmine && !height.isClear">
                  ⨂
                </div>
                <div v-else-if="height.activeItem && !height.hasLandmine && height.text == 0">

                </div>
                <div v-else-if="height.activeItem && !height.hasLandmine && height.text > 0">
                  {{ height.text }}
                </div>
                <div v-else-if="height.isClear">
                  <template v-if="height.hasLandmine && gameOver">
                    ⨂🚩
                  </template>
                  <template v-else>
                    🚩
                  </template>
                </div>
                <div v-else>
                  {{ height.num }}
                </div>
              </td>
          </tr>
          <!-- <div class="item" v-for="item in box" :key="item.num" @click="clickBox(item)">
                {{ item.num }}
              </div> -->
          </table>
          <div class="mask" v-if="!gameStart">
            <button @click="start" :disabled="gameStart" :class="{ disabled: gameStart }">
              开始
            </button>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="rightItem">
          <div class="title">
            游戏用时：
          </div>
          <div class="content">
            <span>
              {{ formatter }}
            </span>
          </div>
        </div>
        <div class="rightItem">
          <div class="title">
            游戏排行榜({{ currentBtn.text }})：
          </div>
          <div class="content">
            <table>
              <tr class="listItem">
                <th>排名</th>
                <th>玩家</th>
                <th>游戏用时</th>
                <th>记录时间</th>
              </tr>
              <tr class="listItem" v-for="item, index in range[currentIndex].list" :key="item.nowTime">
                <td>{{ index + 1 }}</td>
                <td>{{ item.username }}</td>
                <td>{{ item.useTime }}</td>
                <td>{{ item.nowTime }}</td>
              </tr>
            </table>
          </div>
        </div>
      </div>
    </div>
    <div class="btns">
      <button v-for="btn, index in btns" :key="btn.level" @click="changeLevel(btn, index)">
        {{ btn.text }}
    </button>
    <!-- <button  @click="start" :disabled="gameStart" :class="{disabled:gameStart}" >
          开始
        </button> -->
      <button @click="allOpen" :disabled="gameStart" :class="{ disabled: gameStart }">
        全开
      </button>
      <input type="text" :value="`剩余地雷数：${flag}/${totalLandmine}`" disabled>
      <span class="help" @mouseenter="enterHelp" @mouseleave="leaveHelp">
        ?
      </span>
      <span :class="{ isActiveHelp, helpText: true }">
        左键点击打开方块，鼠标滑轮中键点击插旗
      </span>
    </div>
    <div class="dialogContainer" v-if="dialogShow">
      <div class="dialog">
        <div class="title">
          恭喜你排雷成功！
        </div>
        <div class="content">
          <template v-if="nowRange">
            <div class="text">
              {{ `你本次游戏用时${formatter}，恭喜你进入【${currentBtn.text}】难度强榜前${listMax}(当前排名第${nowRange})！请输入你的大名:` }}
            </div>
            <input type="radio" name="inputType" id="inputName" @click="changeCheck(true)" :checked="inputType">
            文本输入玩家名
            <br>
            <input type="text" :disabled="!inputType" v-model="inputPlayer" :class="{ disabledInput: !inputType }"
              placeholder="请输入玩家名称">
            <br>
            <input type="radio" name="inputType" id="selectName" @click="changeCheck(false)" :checked="!inputType">
            选择已存在玩家名
            <br>
            <N-select :data="playerList()" v-model:value="selectPlayer" :disabled="inputType">
              <template #blankSpace>
                暂无可用玩家名
              </template>
            </N-select>
            <br>
          </template>
          <template v-else>
            <div class="text">
              {{ `你本次游戏用时${formatter}，未进入强榜前${listMax},请再接再厉！` }}
            </div>
          </template>
        </div>
        <div class="btns">
          <span v-if="tips">
            玩家名称不能为空，请填写名称！
          </span>
          <button @click="confirm">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted, computed, watch } from 'vue';
import NSelect from './../components/N-select.vue';
import moment from 'moment'

interface childrenType {
  num: number,
  hNum: number,
  wNum: number,
  text: number,
  hasLandmine: boolean,
  isClear: boolean,
  activeItem: boolean,
  isBorder: boolean,
}
interface boxItemType {
  wNum: number,
  children: childrenType[]

}
interface btnsItemType {
  text: string,
  level: number,
  width: number,
  height: number,
  max: number,
}
interface listItem {
  total: number,
  useTime: string,
  nowTime: string,
  username: string | null,
}
interface rangeItem {
  level: number,
  text: string,
  list: listItem[] | [],
}

const basicWidth=ref(35);

const box: boxItemType[] = reactive([]);
const width = computed(() => box[0].children.length);
const smallBoxs = computed(() => {
  const arr: childrenType[] = [];
  box.forEach((e: boxItemType) => {
    arr.push(...e.children);
  })
  return arr;
})
//计时器
const timer = ref(0);
//计时
const total = ref(0);
const seconds = computed(() => total.value % 60);
const minites = computed(() => Math.floor(total.value / 60) % 60);
const hours = computed(() => Math.floor(total.value / 3600));
const formatter = computed(() => {
  let ss: any = seconds.value;
  let mm: any = minites.value;
  let hh: any = hours.value;
  if (seconds.value < 10) {
    ss = '0' + seconds.value;
  }
  if (minites.value < 10) {
    mm = '0' + minites.value;
  }
  if (hours.value < 10) {
    hh = '0' + hours.value;
  }
  return `${hh}:${mm}:${ss}`
})
//雷总数
const totalLandmine = ref(0);
//插旗量
const flag = computed(() => totalLandmine.value - smallBoxs.value.filter((e: childrenType) => e.isClear).length)
const clearLandmine = computed(() => smallBoxs.value.filter((e: childrenType) => e.isClear && e.hasLandmine).length);
// watch(clearLandmine,(value)=>{
//   // console.log(value);
//   if (value==totalLandmine.value) {
//     over();
//   }
// })
const auto = ref(false);
watch(smallBoxs, (value) => {
  const allActive = value.every((e: childrenType) => e.activeItem || (e.isClear && e.hasLandmine));
  // console.log(allActive);
  if (allActive && !auto.value) {
    over();
  }
}, { deep: true })
//按钮集合
const btns: btnsItemType[] = reactive([
  {
    text: '初级',
    level: 1,
    width: 8,
    height: 10,
    max: 10,
  },
  {
    text: '中级',
    level: 2,
    width: 12,
    height: 15,
    max: 25,
  },
  {
    text: '高级',
    level: 3,
    width: 16,
    height: 20,
    max: 45,
  },
]);
const currentIndex = ref(0);
const currentBtn = computed(() => btns[currentIndex.value]);
//游戏开始标志
const gameStart = ref(true);
//游戏结束标志
const gameOver = ref(false);

//布置雷
const setLandmine = (max: number = 20) => {
  do {
    for (let i = 1; i <= box.length; i++) {
      if (smallBoxs.value.filter((e: childrenType) => e.hasLandmine).length == max) break;
      for (let j = 1; j <= box[i - 1].children.length; j++) {
        if (smallBoxs.value.filter((e: childrenType) => e.hasLandmine).length < max) {
          box[i - 1].children[j - 1].hasLandmine = Math.random() - 0.9 > 0;
        } else {
          break;
        }
      }
    }
  } while (smallBoxs.value.filter((e: childrenType) => e.hasLandmine).length < max);
}
//选难度
const changeLevel = (btn: btnsItemType, index: number) => {
  clearInterval(timer.value);
  total.value = 0;
  // gameOver.value=true;
  currentIndex.value = index;
  gameStart.value = false;
  gameOver.value = false;
  totalLandmine.value = btn.max;
  box.splice(0, box.length)
  let num = 0;
  for (let i = 1; i <= btn.width; i++) {
    box.push({ wNum: i, children: [] });
    for (let j = 1; j <= btn.height; j++) {
      num++;
      const obj: childrenType = {
        num,
        wNum: i,
        hNum: j,
        text: 0,
        hasLandmine: false,
        isClear: false,
        activeItem: false,
        isBorder: false,
      }
      box[i - 1].children.push(obj)
    }
  }
  setLandmine(btn.max);
}
changeLevel(btns[0], 0);
//点击方块
const clickBox = (item: childrenType, auto: boolean = false) => {
  if (!gameStart.value && !auto) return;
  if (gameOver.value) return;
  if (item.activeItem) return;
  item.activeItem = true;
  // const timer=setTimeout(()=>{
  //   item.activeItem=true;
  //   clearTimeout(timer)
  // },500)
  if (item.hasLandmine && !auto) {
    alert('踩到雷了，游戏结束！')
    gameOver.value = true;
    // gameStart.value=false;
    clearInterval(timer.value);
    return;
  }
  // console.log(item);
  if (auto) return;
  const left = item.hNum > 1 ? item.num - 1 : null;
  const right = item.hNum < width.value ? item.num + 1 : null;
  const top = item.num - width.value > 0 ? item.num - width.value : null;
  const bottom = item.num + width.value <= width.value * box.length ? item.num + width.value : null;
  const left_top = top ? (top - 1 > 0 && item.hNum > 1 ? top - 1 : null) : null;
  const right_top = top ? (top + 1 > 0 && item.hNum < width.value ? top + 1 : null) : null;
  const left_bottom = bottom ? (bottom - 1 <= width.value * box.length && item.hNum > 1 ? bottom - 1 : null) : null;
  const right_bottom = bottom ? (bottom + 1 <= width.value * box.length && item.hNum < width.value ? bottom + 1 : null) : null;
  // console.log('左'+left,'右'+right,'上'+top,'下'+bottom);
  // console.log('左上'+left_top,'右上'+right_top,'左下'+left_bottom,'右下'+right_bottom);

  const arroundNumbers = [left, right, top, bottom, left_top, right_top, left_bottom, right_bottom]
  const arroundBoxs = smallBoxs.value.filter((e: childrenType) => arroundNumbers.includes(e.num));
  // console.log(arroundBoxs);
  const landmineNum = arroundBoxs.filter((e: childrenType) => e.hasLandmine).length;
  if (landmineNum > 0) {
    item.text = landmineNum;
  } else {
    arroundBoxs.forEach((e: childrenType) => {
      if (!e.hasLandmine) {
        clickBox(e)
      }
    })
  }
}
//中键点击
const demining = (item: childrenType,) => {
  if (!gameStart.value) return;
  if (gameOver.value) return;
  flag.value > 0 ? item.isClear = !item.isClear : (item.isClear ? item.isClear = !item.isClear : alert('没有旗帜了!'));
}
//全开
const allOpen = () => {
  gameStart.value = true;
  auto.value = true;
  // let i=0;
  // const timer=setInterval(()=>{
  //   if (i<smallBoxs.value.length) {
  //     clickBox(smallBoxs.value[i],true)
  //     i++;
  //   } else {
  //     clearInterval(timer);
  //   }
  // },30)
  smallBoxs.value.forEach((e: childrenType) => {
    clickBox(e, true)
  })
}
//游戏开始
const start = () => {
  auto.value = false;
  gameStart.value = true;
  gameOver.value = false;
  total.value = 0;
  timer.value = setInterval(() => {
    total.value++;
    if (total.value == 86400) {
      clearInterval(timer.value);
      alert('游戏时间到，请重新开局！');
      gameOver.value = true;
    }
  }, 1000)
}
//排行榜单
let range: rangeItem[] = reactive([
  {
    level: 1,
    text: '初级',
    list: []
  },
  {
    level: 2,
    text: '中级',
    list: []
  },
  {
    level: 3,
    text: '高级',
    list: []
  }
]);
//排行榜最大容量
const listMax = ref(20);
//玩家名单
const playerList = () => [...new Set(range[currentIndex.value].list.map((e: listItem) => e.username))]
//选择玩家
const selectPlayer = ref(playerList()[0]);
//输入玩家
const inputPlayer = ref(null);

/* 弹出框相关 */
//弹出框开关
const dialogShow = ref(false);

//输入类型 true文本框输入 false下拉框选择
const inputType = ref(true);
watch(inputType, (value) => {
  console.log(value);

})
const changeCheck = (value: boolean) => {
  inputType.value = value;
}
//弹窗非空校验小提示
const tips = ref(false);
//确认
const confirm = () => {
  if (!nowRange.value) {
    dialogShow.value = false;
    return;
  }
  const username = inputType.value ? inputPlayer.value : selectPlayer.value;
  if (!username) {
    tips.value = true;
    return;
  } else {
    tips.value = false;
  }
  range[currentIndex.value].list.splice(nowRange.value - 1, 0, {
    total: total.value,
    useTime: formatter.value,
    nowTime: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    username,
  })
  if (range[currentIndex.value].list.length > listMax.value) {
    range[currentIndex.value].list.pop();
  }
  inputPlayer.value = null;
  selectPlayer.value = null;
  nowRange.value = 0;
  dialogShow.value = false;
}
//当前排名
const nowRange = ref(0);
//获取榜单
const getRange = () => {
  const rangeStr = localStorage.getItem('range');
  const primaryRange = JSON.parse((rangeStr as any));
  if (primaryRange) {
    range = primaryRange;
  }
}
getRange();
//更新内存榜单
const setRange = () => {
  localStorage.setItem('range', JSON.stringify(range));
}
//游戏结束
const over = () => {
  gameOver.value = true;
  // gameStart.value=false;
  clearInterval(timer.value);
  // getRange();
  console.log(range);
  const deposit = (index: number = range[currentIndex.value].list.length) => {
    console.log(index);
    nowRange.value = index + 1;
    // const username=prompt(`恭喜你进入【${currentBtn.value.text}】难度强榜前${listMax.value}(当前排名第${index+1})！请输入你的大名`);
  }
  if (range[currentIndex.value].list.length == 0) {
    deposit();
  } else if (range[currentIndex.value].list.length < listMax.value) {
    let isUse = false;
    for (let i = 0; i < range[currentIndex.value].list.length; i++) {
      if (total.value < range[currentIndex.value].list[i].total) {
        isUse = true;
        deposit(i);
        break;
      }
    }
    if (!isUse) deposit();
  } else {
    for (let i = 0; i < range[currentIndex.value].list.length; i++) {
      if (total.value > range[currentIndex.value].list[i].total) {
        deposit(i);
        break;
      }
    }
  }
  dialogShow.value = true;
  setRange();
}
//帮助相关
const isActiveHelp = ref(false);
const enterHelp = () => {
  isActiveHelp.value = true;
}
const leaveHelp = () => {
  isActiveHelp.value = false;
}

</script>

<style lang="scss" scoped>
.page {
  // height: 100vh;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: relative;
  padding: 2rem;
}

.dialogContainer {
  z-index: 10;
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;

  .dialog {
    width: 400px;
    height: 300px;
    background-color: white;
    box-shadow: 0px 0px 5px 1px #ccc;
    border-radius: 10px;
    display: flex;
    flex-direction: column;

    // overflow: hidden;
    .title {
      padding: 10px 20px;
      border-radius: 10px 10px 0 0;
      color: red;
      background-color: skyblue;
    }

    .content {
      flex-grow: 1;
      padding: 10px 20px;

      .text {
        font-size: 12px;
        color: rgb(255, 153, 0);
        padding: 10px 0;
      }
    }

    .btns {
      border-radius: 0 0 10px 10px;
      background-color: rgba(135, 207, 235, 0.381);
      display: flex;
      justify-content: flex-end;
      padding: 0 20px;
      align-items: center;

      span {
        color: red;
        font-size: 14px;
      }
    }
  }
}

.top {
  flex-grow: 1;
  display: flex;

  // justify-content: space-evenly;
  .left {
    width: 800px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;

    .leftBox {
      border-radius: 10px;
      position: relative;

      .mask {
        border-radius: 10px;
        position: absolute;
        width: 100%;
        height: 100%;
        z-index: 2;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.4);
        display: flex;
        justify-content: center;
        align-items: center;
        transition: 0.5s;

        &:hover {
          background-color: rgba(0, 0, 0, 0.2);
        }
      }
    }
  }

  .right {
    // width: 30%;
    min-width: 400px;
    border-radius: 5px;
    border: 1px solid skyblue;
    margin: 0 20px;
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    justify-content: start;

    .rightItem {
      display: flex;
      flex-direction: column;

      &:nth-child(2) {
        flex: 1;
      }

      .title {
        margin: 10px 0;
      }

      .content {
        margin: 10px 0;
        border: 1px solid skyblue;
        padding: 5px;
        border-radius: 5px;
        color: white;
        font-size: 14px;
        background-color: rgb(221, 191, 250);
        flex: 1;

        span {
          padding: 0 15px;
        }

        table {
          width: 100%;
          text-align: center;
        }

        // .listItem{
        //   display: flex;
        //   justify-content: space-evenly;
        //   align-items: center;
        // }
      }
    }
  }
}

.bigBox {
  border-radius: 10px;
  flex-shrink: 0;
  flex-grow: 0;
  box-sizing: border-box;

  tr {
    &:nth-child(1) {

      // border-radius: 10px 10px 0 0;
      td {
        &:nth-child(1) {
          border-radius: 10px 0 0 0;
        }

        &:nth-last-child(1) {
          border-radius: 0 10px 0 0;
        }
      }
    }

    &:nth-last-child(1) {

      // border-radius: 0 0 10px 10px;
      td {
        &:nth-child(1) {
          border-radius: 0 0 0 10px;
        }

        &:nth-last-child(1) {
          border-radius: 0 0 10px 0;
        }
      }
    }
  }
}

.item {
  // width: 50px;
  font-size: 14px;
  // height: 38px;
  text-align: center;
  border: 1px solid orange;

  div {
    width: 100%;
    box-sizing: border-box;
  }
}

.unActiveItem {
  cursor: pointer;
  color: white;
  background-color: skyblue;
}

.unActiveItemHover {
  &:hover {
    transition: 0.5s;
    background-color: rgb(135, 147, 235);
    transform: scale(1.2, 1.2);
  }

  // &:active{
  //   transition: 0.2s;
  //   transform: rotateY(180deg);
  // }
}

.activedItem {
  cursor: no-drop;
  color: #999;
  background-color: rgba(135, 207, 235, 0.3);
}

.hasLandmine {
  color: red;
}

.isClear {
  background-color: pink;
}

.gameOver {
  cursor: no-drop;
}

button {
  background-color: white;
  border: 1px solid skyblue;
  color: skyblue;
  padding: 10px 20px;
  border-radius: 5px;
  margin: 5px 10px;
  cursor: pointer;
  transition: 0.5s;

  &:hover {
    background-color: skyblue;
    color: white;
  }
}

input[type='text'] {
  box-shadow: 0px 1px 5px 1px skyblue;
  padding: 10px 20px;
  margin: 5px 10px;
  border: 1px solid skyblue;
  border-radius: 5px;
  width: 120px;
  background-color: white;
  outline: none;
}

.disabledInput {
  border: 1px solid #ccc !important;
  background-color: rgb(209, 209, 209) !important;
  cursor: no-drop;
  box-shadow: 0px 1px 5px 1px #666 !important;
}

.btns {
  input {
    background-color: rgb(209, 209, 209);
  }

  .help {
    display: inline-block;
    width: 26px;
    height: 26px;
    font-size: 12px;
    box-sizing: border-box;
    text-align: center;
    line-height: 30px;
    margin: 5px 10px;
    color: white;
    cursor: pointer;
    background-color: skyblue;
    border-radius: 13px;
  }

  .helpText {
    display: none;
  }

  .isActiveHelp {
    padding: 5px;
    border-radius: 5px;
    display: inline-block;
    font-size: 12px;
    color: white;
    background-color: #ccc;
  }

  .disabled {
    background-color: #ccc;
    color: white;
    border-color: #ccc;
    cursor: no-drop;

  }
}</style>