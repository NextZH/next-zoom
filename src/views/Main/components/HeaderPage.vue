<template>
  <div class="page">
    <div class="left">
      <el-radio-group v-model="isCollapse" @change="change" :fill="buttonColor">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收缩</el-radio-button>
      </el-radio-group>
      <el-button class="circleBtn" :type="buttonType" @click="changeShowCircle">{{ props.showCircle ? '关闭鼠标动画' : '开启鼠标动画'
      }}</el-button>
      <el-button class="circleBtn" :type="buttonType" @click="changeShowClick">{{ props.showClick ? '关闭点击动画' : '开启点击动画'
      }}</el-button>
      <el-tooltip class="box-item" effect="dark" content="点击动画设置" placement="bottom">
        <el-button :type="buttonType" :disabled="!props.showClick" :icon="Setting" circle @click="changeSetShowClickFlag" />
      </el-tooltip>
      <span class="title">背景动画：</span>
      <el-switch v-model="showBackground" class="mt-2" inline-prompt :active-icon="Check" :inactive-icon="Close"
        @change="changeShowBackground" />
    </div>
    <div class="right">
      <img class="gif" src="@/assets/gif/huaji2.gif" alt="" height="60">
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import {
  Setting
} from '@element-plus/icons-vue'
import { Check, Close } from '@element-plus/icons-vue'
import { useThemeStore } from '@/stores/Theme';
import { storeToRefs } from 'pinia';
const themeStore = useThemeStore();
const { buttonType,buttonColor } = storeToRefs(themeStore);
const props = defineProps(['isCollapse', 'showCircle', 'showClick', 'showBackground']);
const emits: any = defineEmits();
const isCollapse = ref(props.isCollapse);
const showBackground = ref(props.showBackground);

const change = () => {
  emits('update:isCollapse', isCollapse.value)
}
const changeShowCircle = () => {
  emits('update:showCircle', !props.showCircle)
}
const changeShowClick = () => {
  emits('update:showClick', !props.showClick)
}
const changeShowBackground = () => {
  emits('update:showBackground', showBackground.value)
}
const changeSetShowClickFlag = () => {
  emits('changeSetShowClickFlag')
}
</script>

<style lang="scss" scoped>
// .el-radio-group{
//   display: flex;
//   align-items: center;
// }
.page {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  .left{
    display: flex;
    align-items: center;
  }
}

.circleBtn {
  margin-left: 20px;
}

.title {
  font-size: 14px;
  color: white;
  margin-left: 10px;
}
</style>