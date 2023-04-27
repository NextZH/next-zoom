<template>
  <div>
    <h2>404 Not NotFound</h2>
    <h2>页面不见了</h2>
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