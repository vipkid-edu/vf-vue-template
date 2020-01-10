const merge = require('webpack-merge')
const common = require('./webpack.common')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const Webpack = require('webpack')
console.log('🔥 正在执行[测试环境] build..')
module.exports = merge(common, {
  output: {},
  plugins: [
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
      analyzerMode: 'static'
    }),
    new Webpack.DefinePlugin({
      'BUILD.ENV': "'BETA'",
      'BUILD.DEBUG': "false"
    }),
  ]
})
