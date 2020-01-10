const merge = require('webpack-merge')
const common = require('./webpack.common')
const Webpack = require('webpack')
console.log('🤟 正在执行[上线环境] build..')
module.exports = merge(common, {
  output: {},
  plugins: [
    new Webpack.DefinePlugin({
      'BUILD.ENV': "'RELEASE'",
      'BUILD.DEBUG': "false"
    }),
  ]
})
