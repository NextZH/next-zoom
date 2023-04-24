<template>
  <div>
    <ul>
      <template v-if="props.data.length > 0">
        <li :key="index" v-for="item, index in props.data" @click="clickCheck(item)">{{ item }}</li>
      </template>
      <template v-else>
        <li>暂无可用玩家名</li>
      </template>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onUnmounted } from 'vue';
const props = defineProps(['data', 'value', 'disabled']);
const emits = defineEmits(['update:value']);
//点击选项
const clickCheck = (item: any) => {
  emits('update:value', item)
}
</script>

<style lang="scss" scoped></style>