<template>
  <div id="detailPage">
    <div class="background" :style="{ backgroundImage: `url(${singerInfo.cover})` }">
      <el-page-header @back="goBack">
        <template #content>
          <span class="text-large font-600 mr-3"> 歌手详情 </span>
        </template>
      </el-page-header>
      <div class="info">
        <div class="avatar">
          <el-image :src="singerInfo.avatar" fit="fill">
            <template #error>
              <div class="image-slot">
                <el-icon><icon-picture /></el-icon>
              </div>
            </template>
          </el-image>
        </div>
        <div class="desc">
          <div class="name">
            <span>
              {{ singerInfo.name }}
            </span>
            <span>
              {{ singerInfo.alias && singerInfo.alias.join(',') }}
            </span>
          </div>
          <div class="occupation">
            职业：{{ singerIdentify.imageDesc }}
          </div>
          <div class="number">
            <span>歌曲：{{ singerInfo.musicSize }}</span>
            <span>MV：{{ singerInfo.mvSize }}</span>
          </div>
          <div class="descContent">
            {{ singerInfo.briefDesc }}
          </div>
        </div>
      </div>
    </div>
    <el-tabs type="border-card">
      <el-tab-pane label="精选">
        <TopSong :singer-id="route.query.singerId" ></TopSong>
      </el-tab-pane>
      <el-tab-pane label="歌曲">歌曲</el-tab-pane>
      <el-tab-pane label="专辑">专辑</el-tab-pane>
      <el-tab-pane label="MV">MV</el-tab-pane>
      <el-tab-pane label="详情">详情</el-tab-pane>
    </el-tabs>
    <div class="bottom"></div>
  </div>
</template>

<script setup lang="ts">
import { Picture as IconPicture } from '@element-plus/icons-vue'
import { ref, reactive, computed } from 'vue';
import { getArtistDesc, getArtistDetail } from '@/api/wangyiyun';
import { useRoute, useRouter } from 'vue-router';
import TopSong from './componets/TopSong.vue';
const route = useRoute();
const router = useRouter();

const goBack = () => {
  // console.log('go back')
  router.back()
}
const singer: any = reactive({});
const singerInfo = computed(() => singer.detail && singer.detail.artist ? singer.detail.artist : {});
const singerIdentify = computed(() => singer.detail && singer.detail.identify ? singer.detail.identify : {});
const getArtistDescAsync = async () => {
  const res = await getArtistDesc({ id: Number(route.query.singerId!) });
  // console.log('getArtistDesc', res);
  singer.briefDesc = res.briefDesc;
  singer.introduction = res.introduction;
  singer.topicData = res.topicData;
}
const getArtistDetailAsync = async () => {
  const res = await getArtistDetail({ id: Number(route.query.singerId!) });
  // console.log('getArtistDetail', res);
  singer.detail = res.data;
}

/* created */
(async () => {
  getArtistDescAsync();
  getArtistDetailAsync();
})();
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#detailPage {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  // display: flex;
  // flex-direction: column;
}

.background {
  padding: 20px;
  box-sizing: border-box;
  background-position: center 30%;
  background-repeat: no-repeat;
  background-size: cover;
}

.el-page-header {
  margin-bottom: 20px;
  color: white;
  text-shadow: 0px 0px 5px black;
  :deep() .el-page-header__left{
    background-image: linear-gradient(to right,rgba(0, 0, 0, 0),rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0));
    padding: 10px 50px;
  }

  .text-large {
    color: white;
    text-shadow: 0px 0px 5px black;
  }
}

.info {
  display: flex;
  align-items: center;
  width: 100%;
  margin-bottom: 20px;
  background-color: rgba(0, 0, 0, 0.4);
  padding: 10px;

  .avatar {
    .el-image {
      width: 200px;
      height: 200px;
      border-radius: 50%;

      .image-slot {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        height: 100%;
        background: var(--el-fill-color-light);
        color: var(--el-text-color-secondary);
        font-size: 30px;

        .el-icon {
          font-size: 30px;
        }
      }
    }
  }

  .desc {
    padding: 20px;
    box-sizing: border-box;
    height: 100%;
    color: white;
    text-shadow: 0px 0px 3px black;

    .name {
      margin-bottom: 10px;

      span {
        &:nth-child(1) {
          font-size: 30px;
          font-weight: bold;
          margin-right: 10px;
        }

        &:nth-child(2) {
          font-size: 14px;
          // color: #666;
          // text-shadow: 0px 0px 5px white;
        }
      }
    }

    .occupation {
      font-size: 14px;
      margin-bottom: 10px;
    }

    .number {
      font-size: 14px;
      margin-bottom: 10px;

      span {
        margin-right: 20px;
      }
    }

    .descContent {
      font-size: 12px;
      // color: #999;
      // text-shadow: 0px 0px 1px white;
      height: 80px;
      overflow: auto;

      &::-webkit-scrollBar {
        display: none;
      }
    }
  }
}

.el-tabs {
  width: 100%;
  // min-height: 100%;
  margin-bottom: 20px;
}
.bottom{
  width: 100%;
  height: 1px;
}
</style>