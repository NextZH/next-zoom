<template>
  <div>
    <h1>当前页面由于新增菜单已被创建，请联系开发者设计页面</h1>
    <el-button type="primary" @click="turnDown" >返回</el-button>
  </div>
</template>

<script setup lang="ts">
const turnDown=()=>{
  history.back();
}
</script>

<style scoped>

</style>