<template>
  <div class="page">
    <div class="left">
      <el-tree :data="treeData" :props="defaultProps" node-key="value" :default-expanded-keys="expandList"
        @node-click="handleNodeClick" />
    </div>
    <div class="right">
      <div class="item" v-if="currentValue==list[0].value">
        <div class="title">{{ list[0].title }}</div>
        <div class="content">
          <el-radio-group v-model="list[0].current" class="ml-4" @change="setButton" :fill="buttonColor">
            <el-radio-button v-for="item in list[0].radio" :label="item.label" :key="item.label" size="large">
              {{ item.label }}
            </el-radio-button>
          </el-radio-group>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
import {setList,treeData} from './constant'
const themeStore = useThemeStore();
const { setButtonType } = themeStore;
const { buttonType, buttonColor } = storeToRefs(themeStore);
const setButton = () => {
  const item = list[0].radio.find((e: any) => list[0].current == e.label);
  setButtonType(item);
  console.log(buttonType.value, buttonColor.value);

}

const currentValue = ref('button');

const list = reactive(setList);
const handleNodeClick = (data: any) => {
  console.log(data)
  currentValue.value=data.value;
}

const expandList = computed(() => treeData.filter((e: any) => e.children).map((e: any) => e.value));

const defaultProps = {
  children: 'children',
  label: 'label',
  value: 'value',
}

const created=()=>{
  handleNodeClick(treeData[0])
}
created();
</script>

<style scoped lang="scss">
@import '@/assets/mixins.scss';

.page {
  width: 100%;
  height: 100%;
  padding: 100px;
  display: flex;
  box-sizing: border-box;

  .left {
    flex: 1 0;
    margin-right: 20px;
    overflow-x: hidden;
    overflow-y: scroll;
    background-color: white;
    @include scrollBar();
    @include border();
    padding: 10px;
  }

  .right {
    flex: 5 0;
    background-color: white;
    box-sizing: border-box;
    padding: 20px;
    @include border();
    .title{
      margin-bottom: 10px;
    }
  }
}
</style>