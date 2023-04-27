import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'

// import path from 'path'
// import { createSvgIconsPlugin } from 'vite-plugin-svg-icons'
import ViteImages from 'vite-plugin-vue-images'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), vueJsx(), ViteImages({
    dirs: ['src/assets'], // 图像目录的相对路径
    extensions: ['jpg', 'jpeg', 'png', 'svg', 'webp'], // 有效的图像扩展
    customResolvers: [], // 覆盖名称->图像路径解析的默认行为
    customSearchRegex: '([a-zA-Z0-9]+)', // 重写搜索要替换的变量的Regex。
  }),],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
