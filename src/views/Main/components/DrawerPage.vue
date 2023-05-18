<template>
  <Drawer ref="mydrawer" :closeByModal="false" class="mydrawer">
    <template #header>
      点击动画设置
    </template>
    <template #content>
      <div class="title">粒子半径范围:</div>
      <el-slider v-model="particle.radius" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
        @change="chnageParticleObj" />
      <div class="title">粒子数量范围:</div>
      <el-slider v-model="particle.number" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
        @change="chnageParticleObj" />
      <div class="title">粒子爆炸速度范围:</div>
      <el-slider v-model="particle.speed" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
        @change="chnageParticleObj" />
      <div class="title">水波纹圈半径范围:</div>
      <el-slider v-model="particle.waterRadius" range :min="0" :max="30" :step="0.1" show-input :marks="marks"
        @change="chnageParticleObj" />
      <div class="title">水波纹圈完整度:</div>
      <el-slider v-model="particle.integrity" range :min="0" :max="1" :step="0.01" show-input :marks="marks2"
        @change="chnageParticleObj" />
    </template>
  </Drawer>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';
import Drawer from '@/components/Drawer.vue';
import { setAnimeData, particleObj } from '@/animation/js/click1.js';
/* 鼠标点击动画相关 */
const mydrawer = ref(null);
const changeSetShowClickFlag = () => {
  (mydrawer.value as any).changeVisible();
}
const particle = reactive(particleObj);
const marks = reactive({
  0: '0',
  30: '30',
})
const marks2 = reactive({
  0: '0',
  1: '1',
})
const formatTooltip = (value: any) => {
  return value / 10;
}
const chnageParticleObj = () => {
  setAnimeData(particle)
}
defineExpose({
  changeSetShowClickFlag,
})
</script>

<style scoped lang="scss">
.mydrawer {
  .content {
    .title {
      margin: 20px 0 10px;
    }
  }
}
</style>