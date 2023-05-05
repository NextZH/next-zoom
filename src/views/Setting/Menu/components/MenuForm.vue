<template>
  <el-form :model="form" :inline="inline" label-width="120px">
    <template v-for="value, key in menuItem " :key="key">
      <el-form-item :label="key" v-if="(key as any) != 'iconPath' && (key as any) != 'icon' && (key as any) != 'meta'"
        width="160">
        <el-input v-model="form[key]" />
      </el-form-item>
      <!-- <template v-if="(key as any) == 'meta'">
        <template v-for="value, key2 in menuItem.meta " :key="key2">
          <el-form-item :label="key2" width="160" v-if="(key2 as any) != 'important' ">
            <el-input v-model="form.meta[key2]" />
          </el-form-item>
        </template>
      </template> -->
    </template>
    <el-form-item label="icon">
      <el-radio-group v-model="form.icon">
        <el-radio border v-for="item in iconList" :key="item.key" :label="item.key" style="margin: 5px;">
          <template #default>
            <el-icon :size="20">
              <component v-if="item.icon" :is="item.icon.render" />
              <img v-else :src="item.iconPath" alt="" width="20" height="20">
            </el-icon>
          </template>
        </el-radio>
      </el-radio-group>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref, reactive, computed } from 'vue';
const props = defineProps(['form', 'menuItem', 'iconList', 'inline'])
</script>

<style scoped></style>