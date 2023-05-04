<template>
  <div>
    <el-carousel :interval="props.interval" :type="props.isCard?'card':''" :height="props.height">
      <el-carousel-item v-for="item in props.list" :key="item">
        <h3 text="2xl" justify="center">{{ item }}</h3>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script setup lang="ts">
interface PropsType{
  isCard?:boolean,
  interval?:number,
  height?:string,
  list:any[],
}
const props=withDefaults(defineProps<PropsType>(),{
  isCard:false,
  interval:4000,
  height:'200px',
  list:()=>[],
});

</script>

<style scoped lang="scss">
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
</style>