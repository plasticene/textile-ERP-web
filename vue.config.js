const path = require('path')
const fs = require('fs')
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
const { ModuleFederationPlugin } = webpack.container
// const { MFLiveReloadPlugin } = require('@module-federation/fmr')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')
// const {
//   WebUpdateNotificationPlugin
// } = require('@plugin-web-update-notification/webpack')
const CompressionWebpackPlugin = require('compression-webpack-plugin')

const AutoImport = require('unplugin-auto-import/webpack')
const vueSetupExtend = require('unplugin-vue-setup-extend-plus/webpack')
const resolveMdLoader = require('./build/resolveMdLoader')
const resolveSvgLoader = require('./build/resolveSvgLoader')

const { exposes } = require('./package.export')
const packageJSON = require('./package.json')

const distPath = path.resolve(__dirname, 'dist')
const isExistPathDir = fs.existsSync(distPath)
if (!isExistPathDir) {
  fs.mkdirSync(distPath)
}
fs.writeFileSync(
  path.resolve(__dirname, 'dist/assets.json'),
  `{ "version": "${packageJSON.version}" }`
)

const productionGzipExtensions = ['js', 'css']

const isProd =
  process.env.NODE_ENV === 'production' &&
  process.env.VUE_APP_MODE === 'production'
const isDev = process.env.NODE_ENV === 'development'
const ignoreMF = process.env.VUE_APP_IGNORE_MF === 'true'
const isAppTest = process.env.VUE_APP_MODE === 'test'

// console.log(process.env.VUE_APP_IGNORE_MF ==='true')

const ModuleFederation = name => {
  return new ModuleFederationPlugin({
    name, // 唯一 ID，作为输出的模块名，使用时通过 [name]/[expose name] 的方式使用
    library: { type: 'var', name }, // 用来指定模块的使用规范 name 为作为 umd 的 name
    filename: 'remoteEntry.js',
    shared: {
      vue: {
        eager: true,
        singleton: true,
        requiredVersion: '^2.6'
      },
      'vue-demi': {
        eager: true,
        singleton: true,
        requiredVersion: '^0.13.11'
      },
      'vue-echarts': {
        eager: true,
        singleton: true,
        requiredVersion: '^6.2.3'
      },
      echarts: {
        eager: true,
        singleton: true,
        requiredVersion: '^5.4.0'
      }
    },
    exposes
  })
}

module.exports = defineConfig({
  transpileDependencies: true,
  lintOnSave: 'warning',
  devServer: {
    hot: false,
    port: 9889
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      patterns: [path.resolve(__dirname, './src/theme/theme.less')]
    }
  },
  configureWebpack: config => {
    config.entry.app = './src/main.js'
    config.optimization.splitChunks = false
    config.performance = {
      hints: false
    }

    config.plugins.push(
      // Ignore all locale files of moment.js
      new webpack.IgnorePlugin({
        resourceRegExp: /^\.\/locale$/,
        contextRegExp: /moment$/
      }),
      // setup api 提供定义扩展 的方法
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
      })
      // new WebUpdateNotificationPlugin({
      //   logVersion: true,
      //   checkInterval: 60 * 60 * 1000
      //   // injectFileBase: process.env.VUE_APP_API_BASE_URL
      // })
    )

    if (isDev) {
      config.devtool = 'eval-cheap-module-source-map'
      // 用于本地测试调用的模块联邦

      !ignoreMF && config.plugins.push(ModuleFederation('local'))
    }

    // 生产环境下打包模块
    // config.plugins.push(new LodashModuleReplacementPlugin())
    if (isProd || isAppTest) {
      // add `CompressionWebpack` plugin to webpack plugins
      config.plugins.push(
        // 生产环境下的模块联邦
        ModuleFederation('lib'),
        // 生产环境下将资源压缩成gzip格式
        new CompressionWebpackPlugin({
          algorithm: 'gzip',
          test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
          threshold: 10240,
          minRatio: 0.8
        })
      )
    }
  },
  chainWebpack: config => {
    resolveSvgLoader(config)
    resolveMdLoader(config)
  },
  css: {
    sourceMap: !isProd,
    loaderOptions: {
      less: {
        lessOptions: {
          javascriptEnabled: true,
          modifyVars: {
            'border-radius-base': 'var(--border-radius-base,4px)',
            'border-radius-sm': 'var(--border-radius-sm,2px)',
            'table-padding-vertical': '10px',
            'table-padding-horizontal': '12px'
          }
        }
      }
    }
  },
  publicPath: process.env.VUE_APP_PUBLIC_PATH,
  outputDir: 'dist',
  productionSourceMap: !isProd
})
