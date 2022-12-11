const path = require('path')

module.exports = config => {
  config.module
    .rule('md')
    .test(/\.md$/)
    .use('vue-loader')
    .loader('vue-loader')
    .options({
      compilerOptions: {
        preserveWhitespace: false
      }
    })
    .end()
    // 你还可以再添加一个 loader
    .use(path.resolve(__dirname, '../md-loader/index.js'))
    .loader(path.resolve(__dirname, '../md-loader/index.js'))
    .end()
}
