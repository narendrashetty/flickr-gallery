const webpack = require("webpack");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  'devtool': 'inline-source-map',
  'entry': [
    './src/index.js'
  ],
  'module': {
    'loaders': [{
      'test': /\.js?$/,
      'exclude': /node_modules/,
      'loader': 'react-hot!babel'
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
  ]
};