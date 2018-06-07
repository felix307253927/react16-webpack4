/**
 * @license Created by felix on 16-12-16.
 * @email   307253927@qq.com
 */
'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');

const ENV = process.env.NODE_ENV = 'development';
// const API = "http://192.168.5.17:9986/";
// const API = "http://192.168.5.26:9985/";
// const API = "http://192.168.6.155:9985/";
// const API = "http://192.168.6.228:9986/";
const API = "http://192.168.6.126:9986/";

module.exports = webpackMerge(commonConfig, {
  mode:'development',
  devtool  : 'cheap-module-source-map',
  devServer: {
    disableHostCheck  : true,
    historyApiFallback: true,
    host              : '0.0.0.0',
    port              : '8000',
    proxy             : {
      "/api/*": {
        target     : API,
        secure     : false,
        pathRewrite: {'^/api': ''}
      }
    }
  },
  plugins  : [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
        API     : JSON.stringify('/api/')
      }
    }),
  ],
  node     : {
    // global        : 'window',
    crypto        : 'empty',
    process       : false,
    module        : false,
    clearImmediate: false,
    setImmediate  : false
  }
});