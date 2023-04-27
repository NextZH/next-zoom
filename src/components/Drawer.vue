<template>
  <el-drawer v-model="visible" :show-close="false" :z-index="props.ZIndex" :close-on-click-modal="closeByModal">
    <template #header="{ close, titleId, titleClass }: any">
      <h4 :id=" titleId " :class=" titleClass ">
        <slot name="header">
          抽屉
        </slot>
      </h4>
      <el-button type="danger" @click=" close ">
        <el-icon class="el-icon--left">
          <CircleCloseFilled />
        </el-icon>
        关闭
      </el-button>
    </template>
    <div class="content">
      <slot name="content">
        <el-empty description="暂无内容" />
      </slot>
    </div>
  </el-drawer>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { CircleCloseFilled } from '@element-plus/icons-vue'
interface PropsType {
  // visible?:boolean
  closeByModal?: boolean
  ZIndex?: number
}
const props = withDefaults(defineProps<PropsType>(), {
  // visible:false,
  closeByModal: true,
  ZIndex: 99,
});
// const emits =defineEmits(['update:visible']);
// const visible1 = ref(props.visible);
const visible = ref(false);
const changeVisible = () => {
  // console.log(props.visible);
  // emits('update:visible',!props.visible);
  // console.log(props.visible);
  visible.value = !visible.value;
}
defineExpose({
  changeVisible
})
</script>

<style scoped></style>