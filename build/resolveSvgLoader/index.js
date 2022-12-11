const path = require('path')
function resolve(dir) {
  return path.join(__dirname, dir)
}
module.exports = config => {
  const iconsPath = resolve('../../src/icons')
  config.module.rule('images').exclude.add(iconsPath).end()
  config.module.rule('svg').exclude.add(iconsPath).end()
  config.module
    .rule('icons')
    .test(/\.svg$/)
    .include.add(iconsPath)
    .end()
    .use('svg-sprite-loader')
    .loader('svg-sprite-loader')
    .options({
      symbolId: 'icon-[name]'
    })
    .end()
}
