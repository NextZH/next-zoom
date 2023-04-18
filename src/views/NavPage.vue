<template>
  <el-menu :default-active="defaultPath" router class="el-menu-vertical-demo" :collapse="props.isCollapse"
    @select="handleSelect">
    <template #title>
      <el-icon>
        <location />
      </el-icon>
      <span>快速导航</span>
    </template>
    <template v-for="item in menu" :key="item.path">
      <el-menu-item :index="item.path" v-if="!item.children">
        <el-icon>
          <component :is="item.icon" />
        </el-icon>
        <template #title>{{ item.title }}</template>
      </el-menu-item>
      <el-sub-menu :index="item.path" v-else>
        <template #title>
          <el-icon>
            <component :is="item.icon" />
          </el-icon>
          <span>{{ item.title }}</span>
        </template>
        <el-menu-item :index="child.path" v-for="child in item.children">{{ child.title }}</el-menu-item>
      </el-sub-menu>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import menu from './../constant/menu'
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut
} from '@element-plus/icons-vue'

const props = defineProps(['isCollapse']);
const defaultPath=ref('/');
const created=() =>{
  const path=localStorage.getItem('defaultPath');
  if (path) {
    defaultPath.value=path;
  }
}
created();
const handleSelect = (key: string, keyPath: string[]) => {
  console.log(key, keyPath)
  // defaultPath.value=key;
  localStorage.setItem('defaultPath',key);
}
</script>

<style>
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  height: 100%;
}
</style>
