<template>
  <el-menu-item :index="item.path" v-if="!item.children" @click="clickItem(item)">
    <el-icon size="20px">
      <component :is="item.icon" v-if="item.icon" />
      <img v-else :src="item.iconPath" alt="" width="20" height="20">
    </el-icon>
    <template #title>{{ item.title }}</template>
  </el-menu-item>
  <el-sub-menu :index="item.path" v-else>
    <template #title>
      <el-icon size="20px">
        <component :is="item.icon" v-if="item.icon" />
        <img v-else :src="item.iconPath" alt="" width="20" height="20">
      </el-icon>
      <span>{{ item.title }}</span>
    </template>
    <MenuItem :item="child" v-for="child in item.children">
    </MenuItem>
  </el-sub-menu>
</template>

<script setup lang="ts">
import { usePageStore } from './../stores/Page';
// import { storeToRefs } from 'pinia';
const pageStore=usePageStore();
// const { pageName }=storeToRefs(pageStore);
const { setPageName,setPageObj }=pageStore;
const name = 'MenuItem';
const props = defineProps(['item']);
const clickItem=(item:any)=>{
  // if (item.component.toString().includes("BlankPage.vue")) {
  //   setPageName(item.title);
  //   setPageObj(item);
  // }
  setPageName(item.title);
  setPageObj(item);
}
</script>

<style scoped></style>