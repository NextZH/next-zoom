<template>
  <div>
    <h1>当前页面由于新增菜单,
      <el-icon :size="20">
        <component v-if="(pageObj as any).icon" :is=" (pageObj as any).icon.render " />
        <img v-else :src="(pageObj as any).iconPath" alt="" width="30" height="20">
      </el-icon>
      【
      <span class="pageName">{{ pageName }}</span>
      】页面已被创建，请联系开发者设计页面
    </h1>
    <el-button :type="buttonType" @click="turnDown(false)">返回</el-button>
    <el-button :type="buttonType" @click="turnDown(true)">返回主页</el-button>
  </div>
</template>

<script setup lang="ts">
import menu from '@/constant/menu';
import { ref, reactive, watch, computed } from 'vue';
import { usePageStore } from '@/stores/Page';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonType } = storeToRefs(themeStore);
const pageStore = usePageStore();
const { pageName, pageObj } = storeToRefs(pageStore);
const { setPageName, setPageObj } = pageStore;
const searchPath = (menu: any,target:string) => {
  menu.forEach((e: any) => {
    if (e.path == target) {
      setPageName(e.title);
      setPageObj(e);
    }
    if (e.children) {
      searchPath(e.children,target);
    }
  })
}
watch(pageName, (value) => {
  // console.log(value);
  if (value == "") {
    searchPath(menu,location.pathname);
  }
}, {
  immediate: true,
})
const turnDown = (flag: boolean) => {
  if (flag) {
    searchPath(menu,'/home');
    localStorage.setItem('defaultPath', '/home');
    location.assign('/home');
  } else {
    searchPath(menu,history.state.back);
    localStorage.setItem('defaultPath', history.state.back);
    history.back();
  }
}
</script>

<style scoped>
.pageName {
  color: red;
  font-size: 20px;
}
</style>