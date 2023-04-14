<template>
  <div class="common-layout">
    <el-container class="container">
      <el-header >
        <HeaderPage v-model:isCollapse="isCollapse"></HeaderPage>
        <!-- <el-radio-group v-model="isCollapse" style="margin-bottom: 20px">
          <el-radio-button :label="false">展开</el-radio-button>
          <el-radio-button :label="true">收缩</el-radio-button>
        </el-radio-group> -->
      </el-header>
      <el-container class="container-2">
        <el-aside >
          <NavPage :isCollapse="isCollapse"></NavPage>
        </el-aside>
        <el-container>
          <el-main>
            <router-view></router-view>
          </el-main>
          <!-- <el-footer>Footer</el-footer> -->
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">
import NavPage from './views/NavPage.vue';
import HeaderPage from './views/HeaderPage.vue';
import { ref } from 'vue'

const isCollapse = ref(false)


</script>

<style lang="scss" scoped>
.common-layout {
  height: 100%;
}

.container {
  height: 100%;
  box-sizing: border-box;
  .container-2{
    height: calc(100% - 60px);
  }
}

.el-main {
  display: flex;
  justify-content: space-between;
  width: 100%;
}
.el-header{
  background-color: skyblue;
  display: flex;
  align-items: center;
}
.el-aside{
  width: auto;
  background-color: skyblue;
}
</style>
