/* -*- js -*- */

var path = require("path");
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {

  module: {
    loaders: [
      { test: /\.es6$/, loader: "babel" }
    ]
  },

  entry: {
    counter: ["./examples/counter.es6"],
  },

  output: {
    path: path.resolve('./examples/dist'),
    filename: '[name].js',
    pathinfo: true,
    publicPath: ''
  },

  devServer: {
    inline: true,
    progress: true,
    stats: {colors: true},
    contentBase: path.resolve('./dist'),
    historyApiFallback: {index: '/'}
  },

  plugins: [
    new HtmlWebpackPlugin({
      chunks: ['counter'],
      filename: "counter.html",
      inject: true
    })
  ]
};
