<template>
  <div class="page">
    <el-radio-group v-model="isCollapse" @change="change">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收缩</el-radio-button>
    </el-radio-group>
    <el-button class="circleBtn" type="primary" @click="changeShowCircle">{{ props.showCircle?'关闭鼠标动画':'开启鼠标动画' }}</el-button>
    <el-button class="circleBtn" type="primary" @click="changeShowClick">{{ props.showClick?'关闭点击动画':'开启点击动画' }}</el-button>
    <el-button type="primary" :disabled="!props.showClick" :icon="Setting" circle @click="changeSetShowClickFlag" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Setting
} from '@element-plus/icons-vue'
const props = defineProps(['isCollapse','showCircle','showClick']);
const emits: any = defineEmits();
const isCollapse = ref(props.isCollapse);

const change = () => {
  emits('update:isCollapse', isCollapse.value)
}
const changeShowCircle=()=>{
  emits('update:showCircle',!props.showCircle)
}
const changeShowClick=()=>{
  emits('update:showClick',!props.showClick)
}
const changeSetShowClickFlag=()=>{
  emits('changeSetShowClickFlag')
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