/**
 * @license Created by felix on 16-12-16.
 * @email   307253927@qq.com
 */
'use strict';

const webpackMerge = require('webpack-merge');
const commonConfig = require('./webpack.common.js');
const DefinePlugin = require('webpack/lib/DefinePlugin');
const BannerPlugin = require('webpack/lib/BannerPlugin');

const ENV = process.env.NODE_ENV = 'production';
const API    = "/";
const banner = `
/**
  * @author Created by felix on 16-12-16.
  * @email   307253927@qq.com
  */
`;

module.exports = webpackMerge(commonConfig, {
  mode   : 'production',
  devtool: false,
  plugins: [
    new DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(ENV),
        API     : JSON.stringify(API)
      }
    }),
    new BannerPlugin({banner})
  ],
  node   : {
    crypto        : 'empty',
    process       : false,
    module        : false,
    clearImmediate: false,
    setImmediate  : false
  }
});