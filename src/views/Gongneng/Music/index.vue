<template>
  <div id="songPage">
    <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
      <el-tab-pane label="排行" name="range">排行</el-tab-pane>
      <el-tab-pane label="歌手" name="singer">
        <Singer />
      </el-tab-pane>
      <el-tab-pane label="分类歌单" name="third">分类歌单</el-tab-pane>
      <el-tab-pane label="精选" name="fourth">精选</el-tab-pane>
      <el-tab-pane label="数字专辑" name="5">数字专辑</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Singer from './components/Singer.vue'

const activeName = ref('singer')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}
</script>

<style scoped lang="scss">
#songPage{
  height: 100%;
}
.el-tabs{
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  :deep() .el-tabs__content{
    height: 100%;
  }
  .el-tab-pane{
    height: 100%;
  }
}
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>