const webpack = require("webpack");
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  'devtool': 'inline-source-map',
  'entry': [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.js'
  ],
  'module': {
    'loaders': [{
      'test': /\.js$/,
      'exclude': /node_modules/,
      'loader': 'react-hot!babel'
    }, {
      'test': /\.css$/,
      'loader': 'style!css!postcss'
    }]
  },
  'resolve': {
    'extensions': ['', '.js']
  },
  'output': {
    'path': __dirname + '/dist',
    'publicPath': '/',
    'filename': 'bundle.js'
  },
  'devServer': {
    'contentBase': './dist',
    'hot': true
  },
  'plugins': [
    new HtmlWebpackPlugin({
      'template': './index.html',
      'filename': 'index.html'
    }),
    new webpack.HotModuleReplacementPlugin()
  ],
  postcss: function () {
    return [autoprefixer];
  }
};