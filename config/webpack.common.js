/**
 * @license Created by felix on 16-12-16.
 * @email   307253927@qq.com
 */
'use strict';

const CleanWebpackPlugin        = require('clean-webpack-plugin')
const HtmlWebpackPlugin         = require('html-webpack-plugin');
const CopyWebpackPlugin         = require('copy-webpack-plugin');
const MiniExtractPlugin         = require('mini-css-extract-plugin');
const DefinePlugin              = require('webpack/lib/DefinePlugin');
const ProgressPlugin            = require('progress-bar-webpack-plugin');
const ModuleConcatenationPlugin = require('webpack/lib/optimize/ModuleConcatenationPlugin');
const fs                        = require('fs');
const root                      = fs.realpathSync(process.cwd());
let version
try {
  let pkg = JSON.parse(fs.readFileSync(root + '/package.json'))
  version = pkg.version
} catch (e) {
  version = '1.0.0'
}


console.log('--------------- app version:', version, '---------------');

module.exports = {
  entry : [
    "./src/index.js",
  ],
  output: {
    filename: "[name].bundle.[hash:4].js",
    path    : root + "/dist"
  },
  
  // Enable sourcemaps for debugging webpack's output.
  devtool: 'source-map',
  
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".webpack.js", ".web.js", ".js", '.jsx'],
  },
  
  module      : {
    rules: [
      /*{
        test   : /\.[tj]sx?$/,
        exclude: /node_modules/,
        loader : 'awesome-typescript-loader',
        options: {
          transpileOnly        : true,
          getCustomTransformers: () => ({
            before: [tsImportPluginFactory({
              libraryName: 'antd',
              style      : 'css'
            })]
          })
        },
      },*/
      {
        test   : /\.jsx?$/,
        exclude: /node_modules/,
        use    : [
          {
            loader: "babel-loader",
            query : {
              cacheDirectory: true,
              plugins       : [
                // 'react-hot-loader/babel',
                [
                  "import",
                  [
                    {
                      "libraryName": "antd",
                      "style"      : "css"
                    }
                  ],
                ]
              ]
            }
          }
        ]
      },
      {
        test: /\.css$/,
        use : [
          MiniExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader?importLoaders=1&-autoprefixer'
        ],
      },
      {
        test: /.scss$/,
        use : [
          MiniExtractPlugin.loader,
          // 'style-loader',
          'css-loader',
          'postcss-loader?importLoaders=1&-autoprefixer',
          'sass-loader'
        ],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use : [{
          loader: 'file-loader',
          query : {
            name: '../images/[name].[ext]?[hash]'
          }
        }]
      },
      {test: /\.json$/, use: 'file-loader?name=/[name].[ext]'},
      {
        test: /\.(eot|svg|ttf|woff|woff2)(\?.*)?$/,
        use : [{
          loader: 'file-loader',
          query : {
            name: '../fonts/[name].[ext]'
          }
        }]
      }
    ],
  },
  optimization: {
    // minimize   : true,
    splitChunks: {
      cacheGroups: {
        vendor: {   // 抽离第三方插件
          test    : /node_modules/,   // 指定是node_modules下的第三方包
          chunks  : 'initial',
          name    : 'vendor',  // 打包后的文件名，任意命名
          // 设置优先级，防止和自定义的公共代码提取时被覆盖，不进行打包
          priority: 10
        },
      }
    }
  },
  plugins     : [
    new CleanWebpackPlugin(['dist']),
    new ModuleConcatenationPlugin(),
    new DefinePlugin({
      'process.env': {
        version: JSON.stringify(version)
      }
    }),
    new CopyWebpackPlugin([
      {context: 'src', from: 'images/**/*'},
      {context: 'src', from: 'assets/**/*'},
      {context: 'src', from: 'libs/**/*'},
      {context: '', from: '*.php'},
      {context: 'src', from: '*.html'},
      {context: 'src', from: '*.ico'}
    ], {
      ignore        : [
        'index.html',
        '*.txt'
      ],
      // By default, we only copy modified files during
      // a watch or webpack-dev-server build. Setting this
      // to `true` copies all files.
      copyUnmodified: true
    }),
    new HtmlWebpackPlugin({
      template      : 'src/index.html',
      // chunks        : ['main', 'vendor'],
      chunksSortMode: 'dependency'
    }),
    new MiniExtractPlugin({
      filename: "style.css"
    }),
    new ProgressPlugin(),
  ],
  
  // When importing a module whose path matches one of the following, just
  // assume a corresponding global variable exists and use that instead.
  // This is important because it allows us to avoid bundling all of our
  // dependencies, which allows browsers to cache those libraries between builds.
  /*externals: {
   "react"    : "React",
   "react-dom": "ReactDOM"
   },*/
  node: {
    crypto        : 'empty',
    process       : true,
    module        : false,
    clearImmediate: false,
    setImmediate  : false
  }
};