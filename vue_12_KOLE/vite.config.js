import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
  plugins: [vue()],
  css: {
    postcss: {
      // 明确指定要处理的文件扩展名
      include: /\.css$/,
      // 禁用对vue文件的CSS处理
      exclude: /\.vue$/
    }
  }
})