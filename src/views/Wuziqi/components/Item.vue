<template>
  <div @click="drop" :class="class"></div>
</template>

<script setup lang="ts">
const props=defineProps(['class','item'])
const emits=defineEmits(['drop']);
const drop=()=>{
  emits('drop',props.item);
}
</script>

<style scoped>

</style>