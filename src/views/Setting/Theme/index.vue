<template>
  <div class="page">
    <div class="left">
      <el-tree :data="treeData" :props="defaultProps" node-key="value" :default-expanded-keys="expandList"
        @node-click="handleNodeClick" />
    </div>
    <div class="right">
      <template v-for="itemSetting in list">
        <div class="item" v-if="currentValue == itemSetting.value||currentValue == 'all'">
          <div class="settingName">
            {{ itemSetting.label }}
          </div>
          <template v-for="item,i in itemSetting.options" :key="item.title">
            <div class="title">{{ `${i+1}.${item.title}` }}</div>
            <div class="content">
              <el-radio-group v-model="item.current" class="ml-4" @change="setButton(item,itemSetting)" :fill="itemSetting.value=='font'?fontColor:buttonColor">
                <el-radio-button v-for="radio in item.radio" :label="item.title == '颜色' ? radio.label : radio.value"
                  :key="radio.label" size="large">
                  {{ radio.label }}
                </el-radio-button>
              </el-radio-group>
            </div>
          </template>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
import { setList, treeData } from './constant'
const themeStore = useThemeStore();
const { setButtonType,setFontType,setFontBtnSync } = themeStore;
const { buttonType, buttonColor,fontBtnSync,fontColor,fontType } = storeToRefs(themeStore);
const setButton = (item: any,itemSetting:any) => {
  if (item.value=='color') {
    const target = item.radio.find((e: any) => item.current == e.label);
    if (itemSetting.value=='button') {
      setButtonType(target);
    }
    if (itemSetting.value=='font') {
      setFontType(target);
    }
    // console.log(buttonType.value, buttonColor.value);
  } else if(item.value=='sync') {
    const target = item.radio.find((e: any) => item.current == e.value);
    setFontBtnSync(target.value);
  }
}

const currentValue = ref('button');

const list = reactive(setList);
const handleNodeClick = (data: any) => {
  console.log(data)
  currentValue.value = data.value;
}

const expandList = computed(() => treeData.filter((e: any) => e.children).map((e: any) => e.value));

const defaultProps = {
  children: 'children',
  label: 'label',
  value: 'value',
}

const created = () => {
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
    .settingName{
      font-size: 18px;
      margin: 10px 0;
    }
    .title {
      font-size: 14px;
      margin: 10px 0;
    }
  }
}</style>