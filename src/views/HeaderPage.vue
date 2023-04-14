<template>
  <el-radio-group v-model="isCollapse" style="margin-bottom: 20px" @change="change">
    <el-radio-button :label="false">展开</el-radio-button>
    <el-radio-button :label="true">收缩</el-radio-button>
  </el-radio-group>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const porps=defineProps(['isCollapse']);
const emits:any=defineEmits();
const isCollapse=ref(porps.isCollapse)

const change=()=>{
  emits('update:isCollapse',isCollapse.value)
}
</script>

<style lang="scss" scoped>
// .el-radio-group{
//   display: flex;
//   align-items: center;
// }
</style>