<template>
  <div>
    <div class="print" ref="pdf">
      <h1>这是标题</h1>
      <p>这是正文</p>
    </div>
    <el-button @click="print">打印</el-button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { downloadPDF } from "@/utils/pdf.js"
// import Print from "@/utils/print.js"

const pdf = ref(null);
const print = () => {
  downloadPDF(pdf.value);
  // Print(pdf.value);
}
</script>

<style scoped>

</style>