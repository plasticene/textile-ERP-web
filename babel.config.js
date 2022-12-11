const isProd =
  process.env.NODE_ENV === 'production' &&
  process.env.VUE_APP_MODE === 'production'
const plugins = [
  '@babel/plugin-proposal-optional-chaining',
  '@babel/plugin-proposal-nullish-coalescing-operator',
  '@babel/plugin-proposal-object-rest-spread'
]
if (isProd) {
  plugins.push('transform-remove-console')
}

module.exports = {
  presets: [
    ['@vue/cli-plugin-babel/preset', { jsx: { compositionAPI: true } }]
  ],
  plugins,
  compact: false
}
