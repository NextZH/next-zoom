<template>
  <div class="page">
    <el-radio-group v-model="isCollapse" @change="change">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收缩</el-radio-button>
    </el-radio-group>
    <el-button class="circleBtn" type="primary" @click="changeShowCircle">{{ props.showCircle?'关闭鼠标动画':'开启鼠标动画' }}</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps(['isCollapse','showCircle']);
const emits: any = defineEmits();
const isCollapse = ref(props.isCollapse);

const change = () => {
  emits('update:isCollapse', isCollapse.value)
}
const changeShowCircle=()=>{
  emits('update:showCircle',!props.showCircle)
}
</script>

<style lang="scss" scoped>
// .el-radio-group{
//   display: flex;
//   align-items: center;
// }
.page{
  display: flex;
  align-items: center;
}
.circleBtn{
  margin-left: 20px;
}
</style>