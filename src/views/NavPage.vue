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
      <MenuItem :item="item">
      </MenuItem>
    </template>
  </el-menu>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import menu from './../constant/menu'
import MenuItem from '@/components/MenuItem.vue';
import {
  Document,
  Menu as IconMenu,
  Location,
  Setting,
  ZoomOut
} from '@element-plus/icons-vue'

const props = defineProps(['isCollapse']);
const defaultPath = ref(menu[0].path);
const created = () => {
  const path = localStorage.getItem('defaultPath');
  if (path) {
    defaultPath.value = path;
  }
}
created();
const handleSelect = (key: string, keyPath: string[]) => {
  // console.log(key, keyPath)
  // defaultPath.value=key;
  localStorage.setItem('defaultPath', key);
}
</script>

<style scoped lang="scss">
@import "./../assets/mixins.scss";

.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}

.el-menu-vertical-demo {
  height: 100%;
}

.el-menu {
  // background-color: $themeColor;
  // background-image: url();
  background-image: $backgroundColor;
  @include scrollBar();
}

:deep() .el-menu {
  // color: white !important;
  background-color: rgba(0, 0, 0, 0) !important;
}

:deep() .el-menu-item,:deep() .el-sub-menu__title {
  text-shadow: 0px 0px 5px white;
  color: #666;
  font-weight: bold;
  &.is-active {
    color: white;
    font-weight: bold;
    font-size: 18px;
    text-shadow: 0px 0px 5px black;
  }
}

:deep() .el-menu-item:hover,
:deep() .el-sub-menu__title:hover {
  background-color: gray !important;
}
</style>
