<template>
  <div id="singerPage" v-loading="initLoading">
    <el-form :model="form" label-width="120px">
      <el-form-item label="地区">
        <el-radio-group v-model="form.area" size="large" @change="change" :fill="buttonColor">
          <el-radio-button v-for="item in singerArea" :label="item.value">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="类型">
        <el-radio-group v-model="form.type" size="large" @change="change" :fill="buttonColor">
          <el-radio-button v-for="item in singerType" :label="item.value">
            {{ item.name }}
          </el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="顺序">
        <el-radio-group v-model="form.initial" size="large" @change="change" :fill="buttonColor">
          <el-radio v-for="item in singerSort" :label="item.value">
            {{ item.name }}
          </el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <div class="singerList">
      <div class="top">
        <template v-for="item, index in singer.list" :key="item.id">
          <div class="singerItem" v-if="index < 10" @click="turnDetail(item)">
            <!-- <span>{{ item.name }}</span> -->
            <img :src="item.picUrl" alt="">
            <div class="name">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>
      <div class="bottom">
        <template v-for="item, index in singer.list" :key="item.id">
          <div class="singerItem" v-if="index >= 10" @click="turnDetail(item)">
            <div class="name">
              {{ item.name }}
            </div>
          </div>
        </template>
      </div>

    </div>
    <el-backtop :right="50" :bottom="150" target=".singerList" />
  </div>
</template>

<script setup lang="ts">
import { reactive,ref } from 'vue';
import { singerType, singerArea, singerSort } from '../constant';
import { useRouter } from 'vue-router'
import { getArtist } from '@/api/wangyiyun';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonColor } = storeToRefs(themeStore);

const router = useRouter();

const initLoading=ref(false);

const form = reactive({
  area: -1,
  type: -1,
  initial: -1,
  limit: 100,//一次回传数量
  offset: 0,
})


let singer: any = reactive({
  list: [],
});
const getArtistAsync = async () => {
  initLoading.value=true;
  const res = await getArtist(form);
  // console.log(res);
  singer.list = res.artists;
  initLoading.value=false;
}
const change = () => {
  getArtistAsync();
  // console.log(form.area);
}

const turnDetail=(item:any)=>{
  // console.log(item);
  router.push({ name: 'singerDetail', query: { singerId: item.id }})
  // location.assign(`/gongneng/music/singerDetail?singerId=${item.id}`)
}


(() => {
  getArtistAsync();
})()
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

#singerPage {
  display: flex;
  flex-direction: column;
  align-items: center;
  box-sizing: border-box;
  height: 100%;
}

.singerList {
  width: 100%;
  height: 100%;
  flex-grow: 1;
  box-sizing: border-box;
  display: flex;
    // justify-content: center;
    align-items: center;
    flex-direction: column;
  padding: 0 50px;
  padding-right: 0;
  overflow: auto;
  @include scrollBar();

  .top,
  .bottom {
    flex-grow: 1;
    flex-shrink: 0;
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    box-sizing: border-box;
  }

  .singerItem {
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    // height: 16px;
    // width: 120px;
    margin: 20px;
    width: 100px;
    cursor: pointer;
    img {
      width: 100px;
      height: 100px;
      border-radius: 5px;
      margin-bottom: 10px;
    }

    .name {
      /* 多余文本用...代替 */
      /* 溢出隐藏 */
      overflow: hidden;
      /* 设置伸缩盒子 */
      display: -webkit-box;
      /* 设置子元素的对齐方式 */
      -webkit-box-orient: vertical;
      /* 设置显示想行数 */
      -webkit-line-clamp: 1;
    }
  }
}
</style>