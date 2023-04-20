<template>
  <el-container>
    <el-header>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="primary" plain>Primary</el-button>
      <el-button type="primary" round>Primary</el-button>
    </el-header>
    <el-main>
      <div class="container" :style="{ '--containerLength': containerLength + 'px', '--cardLength': cardLength + 'px' }">
        <div class="card" v-for="item in cardList" :key="item.id" @click="clickCard(item)"
          :style="{ left: item.x + 'px', top: item.y + 'px', backgroundColor: `rgba(${item.red},${item.green},${item.blue},0.6)`,zIndex:item.z_index }">
          <!-- <img src="" alt=""> -->{{ item.value }}
        </div>
      </div>
    </el-main>
    <el-footer>Footer</el-footer>
  </el-container>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';

interface cardType {
  id: number,
  value: number,
  z_index: number,
  isClear: boolean,
  isShow: boolean,
  red: number,
  blue: number,
  green: number,
  x: number,
  y: number,
}

const cardList: cardType[] = reactive([]);

const containerLength = ref(500);
const cardLength = ref(50);
const max = computed(() => containerLength.value - cardLength.value)
const format = (max: number, min: number = 0, num: number = 0) => Number((Math.random() * max+min).toFixed(num) );
const init = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 16; j++) {
      const obj = {
        id: (i+1) * j,
        value: j,
        z_index: format(10),
        isClear: false,
        isShow: false,
        red: format(255),
        blue: format(255),
        green: format(255),
        x: format(max.value,20),
        y: format(max.value,20),
      }
      cardList.push(obj);
    }
  }
}
init()

const clickCard=(item:cardType)=>{
  const startX=item.x;
  const endX=item.x+cardLength.value;
  const startY=item.y;
  const endY=item.y+cardLength.value;
  cardList.forEach((e:cardType)=>{
    const x1=e.x;
    const x2=e.x+cardLength.value;
    const y1=e.y;
    const y2=e.y+cardLength.value;
    if (e.z_index>=item.z_index&&e.id>item.id) {
      if (((x1>=startX&&x1<=endX)||(x2>=startX&&x2<=endX)&&(y1>=startY&&y1<=endY)||(y2>=startY&&y2<=endY))) {
        
      }
    }
  })
}

</script>

<style lang="scss" scoped>
@import "../../assets/mixins.scss";
.el-header {
  background-image: radial-gradient(farthest-side at 50% 100%, skyblue, white);
}
.el-header,
.el-footer,
.el-main {
  @include f-c-c;
}

// .el-footer{
//   background-image: radial-gradient(farthest-side at 50% 100%, skyblue, white);
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
    position: absolute;
    width: $cardLength;
    height: $cardLength;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: 0.5s;
    &:hover {
      transform: scale(1.2,1.2);
      box-shadow: 0px 0px 5px 1px #333;
    }
  }
}
</style>