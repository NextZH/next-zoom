<template>
  <div id="songPage">
    <template v-if="musicPlugin">
      <template v-if="route.path == '/gongneng/music'">
        <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
          <el-tab-pane label="排行" name="range">排行</el-tab-pane>
          <el-tab-pane label="歌手" name="singer">
            <Singer />
          </el-tab-pane>
          <el-tab-pane label="分类歌单" name="third">分类歌单</el-tab-pane>
          <el-tab-pane label="精选" name="fourth">精选</el-tab-pane>
          <el-tab-pane label="数字专辑" name="5">数字专辑</el-tab-pane>
        </el-tabs>
      </template>
      <template v-else>
        <router-view></router-view>
      </template>
    </template>
    <template v-else>
      <BlankPage>
        <template #content>
          <h1>当前页面由于音乐插件未开启不可使用，请联系后端开启音乐插件</h1>
        </template>
      </BlankPage>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import Singer from './Singer/index.vue'
import { useRoute } from 'vue-router'
import BlankPage from '@/views/BlankPage.vue'
import { useMusicStore } from '@/stores/Music'
import { storeToRefs } from "pinia"
const musicStore = useMusicStore();
const { musicPlugin } = storeToRefs(musicStore);

const activeName = ref('singer')

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event)
}

const route = useRoute();
const getMeta = () => {
  console.log(route);
}

/* created */
(() => {
  // getMeta()
})();
</script>

<style scoped lang="scss">
#songPage {
  height: 100%;
  width: 100%;
}

.el-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;

  :deep() .el-tabs__content {
    height: 100%;
  }

  .el-tab-pane {
    height: 100%;
  }
}

.demo-tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}
</style>