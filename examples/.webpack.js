/* -*- js -*- */

var webpack = require('webpack')
var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

var config = {

  debug: true,
  devtool: 'source-map',

  module: {
    loaders: [
      { test: /\.js$/,
        include: [
          __dirname,
          path.resolve(__dirname, '../src'),
        ],
        loaders: [
          `babel?extends=${path.resolve(__dirname, '.babelrc')}`
        ]
      }
    ]
  },

  entry: {
    index: [path.resolve(__dirname, 'index.js')],
  },

  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    pathinfo: true,
    publicPath: ''
  },

  devServer: {
    inline: true,
    progress: true,
    stats: {colors: true},
    contentBase: path.resolve(__dirname, 'dist'),
    historyApiFallback: {index: '/'}
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['index'],
      inject: true
    })
  ]
};


module.exports = config
