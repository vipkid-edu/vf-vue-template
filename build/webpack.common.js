const path = require('path')
const Webpack = require('webpack')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: './index',
  output: {
    filename: "js/[name].[hash:7].js",
    path: path.resolve(__dirname, '../output'),
    jsonpFunction: "wpJsonpFlightsWidget"
  },
  optimization: {
    splitChunks: {
      chunks: 'all'
    }
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: {
          loader: 'vue-loader',
          options: {
            hotReload: true
          }
        }
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: "style-loader"
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1
            }
          },
          {
            loader: "postcss-loader",
            options: {
              'postcss-import': {},
              'cssnano': {},
              'autoprefixer': {},
            }
          },
          {
            loader: "sass-loader"
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|woff|woff2|eot|ttf|svg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: false,
              name: '[name].[ext]'
            }
          }
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/,
        loader: 'url-loader',
        options: {
          limit: '[name].[ext]'
        }
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin('output', {
        root: process.cwd(),
        verbose: true,
    }),
    // new BundleAnalyzerPlugin({
    //   analyzerMode: 'disabled'
    // }),
    new Webpack.DefinePlugin({
      'BUILD.date':  JSON.stringify(new Date().toLocaleString()),
    }),
    new HTMLWebpackPlugin({
      template: './index.html',
      filename: './index.html'
    }),
    new VueLoaderPlugin(),
  ],
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*','.js', '.vue', '.json']
  },

}
