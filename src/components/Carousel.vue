<template>
  <div>
    <el-carousel :interval="props.interval" :type="props.isCard ? 'card' : ''" :height="props.height" :initial-index="props.initialIndex"
      :autoplay="props.autoplay" :indicator-position="props.indicatorPosition" :arrow="props.arrow" :style="{'--btnBgColor':props.style.btnBgColor,'--btnColor':props.style.btnColor}" @change="props.change" ref="carousel">
      <el-carousel-item v-for="item in props.list" :key="item">
        <h3 v-if="typeof item == 'number'" text="2xl" justify="center">{{ item }}</h3>
        <template v-else>
          <!-- <img v-if="item.path" :src="item.path + item.name" alt="">
          <img v-else :src="`/src/assets/img/${item.name}`" alt=""> -->
          <div v-if="item.path&&item.name" class="img" :style="{ backgroundImage: `url(${item.path + item.name})` }"></div>
          <div v-else-if="item.name" class="img" :style="{ backgroundImage: `url(/src/assets/img/${item.name})` }"></div>
          <!-- <div v-else class="img" :style="{ backgroundImage: `url(${item})` }"></div> -->
          <img v-else :src="item" alt=""> 
        </template>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
interface PropsType {
  isCard?: boolean,
  interval?: number,
  height?: string,
  autoplay?: boolean,
  indicatorPosition?: string,
  arrow?: string,
  initialIndex?:number,
  list: any[],
  style?:{
    [propName:string]:string
  },
  change?:(index:number,prevIndex:number)=>void
}
const props = withDefaults(defineProps<PropsType>(), {
  isCard: false,
  interval: 4000,
  height: '200px',
  autoplay: true,
  indicatorPosition: '',
  arrow: 'hover',
  list: () => [],
  initialIndex:0,
  style:()=>({
    btnBgColor:'',
    btnColor:'',
  }),
  change:()=>(index:number,prevIndex:number)=>{}
});

const carousel:any=ref(null);

const setActiveItem=(index:number)=>{
  carousel.value.setActiveItem(index);
}
defineExpose({
  setActiveItem,
})

</script>

<style scoped lang="scss">
.el-carousel {
  $btnBgColor:var(--btnBgColor);
  $btnColor:var(--btnColor);
  // border: 5px solid;
  :deep() .el-carousel__arrow {
    background-color: $btnBgColor;
    color: $btnColor;
  }
}

.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

img {
  width: 100%;
  height: 100%;
}

.img {
  width: 100%;
  height: 100%;
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
}
</style>