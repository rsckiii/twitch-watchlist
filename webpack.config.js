/*
 * Modules Requires
 */
var Webpack = require('webpack');
var path = require('path');


module.exports = {
  context: path.resolve(__dirname),
  entry: {
    index: "./index.js"
  },
  output: {
    path: path.resolve(__dirname),
    filename: 'index.bundle.js',
  },
   resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
    {
      test: /\.js$/,
      use: 'babel-loader',
      exclude: /node_modules/
    }
  ]
  }
};
