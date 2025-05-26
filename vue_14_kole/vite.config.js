import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import path from 'path'

export default defineConfig({
  plugins: [
    vue({
      // 确保模板编译器选项正确
      template: {
        compilerOptions: {
          // 处理所有Element Plus的自定义元素
          isCustomElement: tag => tag.startsWith('el-')
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src')
    }
  },
  server: {
    port: 3000,
    open: true
  },
  optimizeDeps: {
    include: ['element-plus/es/components/*']
  }
})