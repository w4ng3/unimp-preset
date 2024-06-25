import { defineConfig } from 'vite'
import uni from '@dcloudio/vite-plugin-uni'
import WindiCSS from 'vite-plugin-windicss'
import MiniProgramTailwind from '@dcasia/mini-program-tailwind-webpack-plugin/rollup'
import AutoImport from 'unplugin-auto-import/vite'
import { resolve } from 'path'
import tailwindcss from 'tailwindcss'
// https://vitejs.dev/config/
export default defineConfig({
  resolve: {
    alias: [
      {
        find: '@',
        replacement: resolve(__dirname, 'src')
      }
    ]
  },
  build: {
    cssTarget: 'chrome61',
    // 开发阶段启用源码映射
    sourcemap: process.env.NODE_ENV === 'development'
  },
  plugins: [
    uni(),
    WindiCSS(),
    MiniProgramTailwind(),
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: ['vue', 'uni-app', 'pinia'],
      dts: 'src/types/auto-import.d.ts',
      // 指定文件夹位置， 加 /** 可遍历子目录
      dirs: ['src/hooks/**', 'src/stores', 'src/utils', 'src/api/**']
    })
  ],
  css: {
    postcss: {
      plugins: [tailwindcss()]
    }
  }
  // server: {
  //   port: 1314,
  //   // 选项写法
  //   proxy: {
  //     '/pag': {
  //       target: 'https://',
  //       changeOrigin: true,
  //       rewrite: (path) => path.replace(/^\/api/, '/api'),
  //     },
  //   },
  // },
})
