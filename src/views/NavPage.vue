<template>
  
  <el-menu
    default-active="/wuziqi"
    router
    class="el-menu-vertical-demo"
    :collapse="porps.isCollapse"
    @open="handleOpen"
    @close="handleClose"
  >
    <template #title>
      <el-icon><location /></el-icon>
      <span>快速导航</span>
    </template>
    <el-menu-item index="/home">
      <el-icon><icon-menu /></el-icon>
      <template #title>首页</template>
    </el-menu-item>
    <el-menu-item index="/saolei">
      <el-icon><ZoomOut /></el-icon>
      <template #title>扫雷</template>
    </el-menu-item>
    <el-menu-item index="/wuziqi">
      <el-icon><ZoomOut /></el-icon>
      <template #title>五子棋</template>
    </el-menu-item>
    <el-menu-item index="/xiangqi">
      <el-icon><ZoomOut /></el-icon>
      <template #title>象棋</template>
    </el-menu-item>
    <el-sub-menu index="2">
      <template #title>
        <el-icon><location /></el-icon>
        <span>功能</span>
      </template>
      <el-menu-item index="2-1">背包</el-menu-item>
      <el-menu-item index="2-2">角色</el-menu-item>
      <el-menu-item index="2-3">图鉴</el-menu-item>
      <el-menu-item index="2-4">强化</el-menu-item>
    </el-sub-menu>
    <el-menu-item index="/practiceRange" disabled>
      <el-icon><document /></el-icon>
      <template #title>快捷练习场</template>
    </el-menu-item>
    <el-menu-item index="4">
      <el-icon><setting /></el-icon>
      <template #title>战斗</template>
    </el-menu-item>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut
} from '@element-plus/icons-vue'

const porps=defineProps(['isCollapse']);
const handleOpen = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
.el-menu-vertical-demo{
  height: 100%;
}
</style>
