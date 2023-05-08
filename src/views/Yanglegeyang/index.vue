<template>
  <el-container>
    <el-header>
      <el-button :type="buttonType" plain>洗牌</el-button>
      <el-button :type="buttonType" plain>提示</el-button>
      <el-button :type="buttonType" plain>Primary</el-button>
      <el-button :type="buttonType" round>Primary</el-button>
    </el-header>
    <el-main>
      <div class="container" :style="{ '--containerLength': containerLength + 'px', '--cardLength': cardLength + 'px' }">
        <template v-for="item in cardList" :key="item.id">
          <div :class="{ card: true, hide: !item.isShow, show: item.isShow }" v-if="!item.isClear"
            @click="clickCard(item)" :style="{
                left: item.x + 'px', top: item.y + 'px',
                // backgroundColor: `rgba(${item.red},${item.green},${item.blue},0.6)`, 
                zIndex: item.z_index,
                '--red': item.red,
                '--green': item.green,
                '--blue': item.blue,
              }">
            <!-- <img src="" alt=""> -->
            <div>val:{{ item.value }}</div>
            <!-- <div>id:{{ item.id }}</div> -->
          </div>
        </template>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed, watch } from 'vue';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonType,buttonColor } = storeToRefs(themeStore);

interface cardType {
  id: number,
  value: number,
  z_index: number,
  isClear: boolean,//是否被清除
  isShow: boolean,//是否展示在最顶层
  red: number,
  blue: number,
  green: number,
  x: number,
  y: number,
  topCardId: any[],
}

const cardList: cardType[] = reactive([]);

const blankCard: cardType = reactive({
  id: 0,
  value: 0,
  z_index: 0,
  isClear: false,
  isShow: false,
  red: 0,
  blue: 0,
  green: 0,
  x: 0,
  y: 0,
  topCardId: [],
});
let tempCard: cardType = reactive({ ...blankCard });

const containerLength = ref(500);
const cardLength = ref(50);
const max = computed(() => containerLength.value - cardLength.value)
const format = (max: number, min: number = 0, num: number = 0) => Number((Math.random() * max + min).toFixed(num));
const init = () => {
  for (let i = 1; i <= 8; i++) {
    for (let j = 1; j <= 16; j++) {
      const obj = {
        id: 16 ** (i - 1) + j,
        value: j,
        z_index: format(10),
        isClear: false,
        isShow: false,
        red: format(255),
        blue: format(255),
        green: format(255),
        x: format(max.value, 20),
        y: format(max.value, 20),
        topCardId: [],
      }
      cardList.push(obj);
    }
  }
  for (let i = 0; i < cardList.length; i++) {
    const startX = cardList[i].x;
    const endX = cardList[i].x + cardLength.value;
    const startY = cardList[i].y;
    const endY = cardList[i].y + cardLength.value;
    cardList.forEach((e: cardType) => {
      const x1 = e.x;
      const x2 = e.x + cardLength.value;
      const y1 = e.y;
      const y2 = e.y + cardLength.value;
      if (e.z_index > cardList[i].z_index || (e.z_index == cardList[i].z_index && e.id > cardList[i].id)) {
        if (((x1 >= startX && x1 <= endX) || (x2 >= startX && x2 <= endX)) && ((y1 >= startY && y1 <= endY) || (y2 >= startY && y2 <= endY))) {
          cardList[i].topCardId.push(e.id);
        }
      }
    })
    if (cardList[i].topCardId.length == 0) {
      cardList[i].isShow = true;
    }
  }
}
init()

const clickCard = (item: cardType) => {
  console.log(item);
  if (item.topCardId.length > 0) return;
  const filter = (target: cardType) => {
    target.isClear = true;
    cardList.forEach((e: cardType) => {
      if (e.topCardId.includes(target.id)) {
        e.topCardId = e.topCardId.filter(e2 => e2 != target.id);
        if (e.topCardId.length == 0) {
          e.isShow = true;
        }
      }
    });
  }
  if (tempCard.id == 0) {
    (tempCard as cardType) = item;
  } else {
    if (item.id == tempCard.id) {
      (tempCard as cardType) = { ...blankCard };
    } else {
      if (tempCard.value == item.value) {
        filter(tempCard);
        filter(item);
        (tempCard as cardType) = { ...blankCard };
      }
    }
  }
}

</script>

<style lang="scss" scoped>
@import "../../assets/mixins.scss";

.el-header {
  background-image: radial-gradient(farthest-side at 50% 100%, $themeColor, white);
}

.el-header,
.el-footer,
.el-main {
  @include f-c-c;
}

// .el-footer{
//   background-image: radial-gradient(farthest-side at 50% 100%, $themeColor, white);
// }
.container {
  $containerLength: var(--containerLength);
  $cardLength: var(--cardLength);
  position: relative;
  width: calc($containerLength + 40px);
  height: calc($containerLength + 40px);
  // border: 1px solid #ccc;
  border-radius: 10px;
  box-shadow: 0px 0px 5px 1px #333;
  box-sizing: border-box;
  padding: 20px;

  .card {
    $red: var(--red);
    $green: var(--green);
    $blue: var(--blue);
    position: absolute;
    background-color: rgba($red, $green, $blue, 1);
    width: $cardLength;
    height: $cardLength;
    border-radius: 5px;
    transition: 0.5s;
    flex-wrap: wrap;
    font-size: 14px;
    cursor: pointer;
    @include f-c-c;
  }

  .show {
    &:hover {
      transform: scale(1.2, 1.2);
      box-shadow: 0px 0px 5px 1px #333;
    }
  }

  .hide {
    $red: var(--red);
    $green: var(--green);
    $blue: var(--blue);
    // background-color: rgba($red, $green, $blue, 0.1);
    opacity: 0.2;
  }
}
</style>