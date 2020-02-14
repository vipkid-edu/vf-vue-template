const path = require('path')
const merge = require('webpack-merge')
const common = require('./webpack.common')
const Webpack = require('webpack')
const CopyPlugin = require('copy-webpack-plugin');

console.log('✨ 正在执行[本地环境] build..')
module.exports = merge(common, {
  output: {
    publicPath: '/',
  },
  plugins: [
    new Webpack.DefinePlugin({
      'BUILD.ENV': "'LOCAL_DEV'",
      'BUILD.DEBUG': "true"
    }),
    // new CopyPlugin([
    //   {
    //     from: 'static',
    //     to: '/'
    //   }
    // ])
  ],
  devServer: {
    host: '0.0.0.0', // can be overwritten by process.env.HOST // can be overwritten by process.env.PORT, if port is in use, a free one will be determined
    port: 8899,
    open: true,
    proxy: {},
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join('/', 'App.vue.html') },
      ],
    },
  },
})
