const { defineConfig } = require('vite')
const { resolve } = require('path')
const dts = require('vite-plugin-dts')
const { createVuePlugin } = require('vite-plugin-vue2')
const AutoImport = require('unplugin-auto-import/vite')
const vueSetupExtend = require('unplugin-vue-setup-extend-plus/vite')
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/components/index.js'),
      name: 'hccwp-lib',
      formats: ['es', 'cjs'],
      fileName: 'hccwp-lib'
    },
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue'
        }
      }
    }
  },
  plugins: [
    createVuePlugin(),
    vueSetupExtend(),
    // 自动导入vue 相关api
    AutoImport({
      include: [
        /\.[tj]sx?$/, // .ts, .tsx, .js, .jsx
        /\.vue$/,
        /\.vue\?vue/ // .vue
      ],
      imports: [
        'vue',
        {
          '@a-latte/vue2-helpers': ['createVuexHelpers'],
          '@a-latte/vue2-helpers/vuex': ['useStore'],
          '@a-latte/vue2-helpers/vue-router': [
            'useRouter',
            'useRoute',
            'onBeforeRouteLeave',
            'onBeforeRouteUpdate'
          ]
        },
        { lodash: ['get'] }
      ],
      dts: true,
      eslintrc: {
        enabled: true // <-- this
      }
    }),
    dts({
      cleanVueFileName: true,
      outputDir: [resolve(__dirname, './types')],
      insertTypesEntry: true,
      skipDiagnostics: false,
      tsConfigFilePath: resolve(__dirname, './src/components/tsconfig.json'),
      beforeWriteFile: (filePath, content) => {
        return {
          filePath: filePath.replace('/src/components', ''),
          content: content
        }
      }
    })
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src')
    },
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue']
  },
  css: {
    preprocessorOptions: {
      less: {
        modifyVars: {
          hack: `true; @import (reference) "${resolve(
            'src/theme/default/index.less'
          )}";`,
          'border-radius-base': 'var(--border-radius-base,4px)',
          'border-radius-sm': 'var(--border-radius-sm,2px)',
          'table-padding-vertical': '10px',
          'table-padding-horizontal': '12px'
        },
        javascriptEnabled: true
      }
    }
  }
})
