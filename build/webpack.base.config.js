// This configuration file informs webpack as to which node_modules are requires to handle various file types
'use strict'
const path = require('path')
const { VueLoaderPlugin } = require('vue-loader')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const CopyPlugin = require('copy-webpack-plugin')
const devMode = process.env.NODE_ENV !== 'production'

const config = {
  entry: {
    app: path.resolve(__dirname, '../src/client-entry.ts')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.vue', '.json', 'ttf', 'eot', 'woff', 'woff2', 'otf'],
    alias: {
      vue$: 'vue/dist/vue.runtime.esm.js',
      '@': path.resolve(__dirname, '../src'),
      '@Images': path.resolve(__dirname, '../src/Static/images/'),
      '@Common': path.resolve(__dirname, '../src/Common'),
      '@Controls': path.resolve(__dirname, '../src/Components/Controls'),
      '@Containers': path.resolve(__dirname, '../src/Components/Containers'),
      '@Services': path.resolve(__dirname, '../src/Services'),
      '@Utilities': path.resolve(__dirname, '../src/Utilities'),
      '@Styles': path.resolve(__dirname, '../src/Styles'),
      '@Mixins': path.resolve(__dirname, '../src/Mixins')
    },
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        devextreme: {
          test: /[\\/]node_modules[\\/](devextreme).*/,
          name: 'devextreme',
          chunks: 'all'
        },
        vendors: {
          test: /[\\/]node_modules[\\/](?!devextreme)/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    },
    minimize: false,
    runtimeChunk: 'single'
  },
  externals: [
    function(context, request, callback) {
      // Tells webpack to treat all Model imports as external dependencies.
      // However, we should not be bundling models and there should be no externals triggered.
      // We keep this config to help us catch any bundling of models.
      if (/[\\/]Models[\\/]/.test(request)){
        var segments = request.split('/')
        return callback(null, segments[segments.length - 1]);
      }
      callback();
    }
  ],
  module: {
    noParse: /^(vue|vue-router|vuex|vuex-router-sync)$/,
    rules: [
      //process .vue
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: file => (
          /node_modules/.test(file) &&
          !/\.vue\.js/.test(file)
        )
      },
      //process .ts
      {
        test: /\.ts$/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader',
            options: {
              // transpileOnly: true,
              appendTsSuffixTo: [
                '\\.vue$'
              ],
              happyPackMode: false
            }
          },
          {
            loader: 'tslint-loader',
            options: {
              configFile: './tslint.json',
            }
          }
        ]
      },
      //process .css, except the css files under Styles/Themes
      {
        test: /\.css$/,
        exclude: /[\\/]Styles[\\/]Themes[\\/].+\.css$/i,
        use: [{
          loader: devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
          options: {
            sourceMap: false
          }
        },
        {
          loader: 'css-loader',
          options: {
            sourceMap: false
          }
        }]
      },
      //process .scss
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'vue-style-loader',
            options: {
              sourceMap: false,
            }
          },
          {
            loader: 'css-loader',
            options: {
              sourceMap: false
            }
          },
          {
            loader: 'sass-loader',
            options: {
              sourceMap: false,
            }
          }
        ]
      },
      //process .png, .jpg and outputs them to assets/Static/Images folder
      {
        test: /\.(png|jpg)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/Static/Images'
          }
        }]
      },
      //process .woff, .woff2, .eot, .ttf, .otf and outputs them to assets/Static/Fonts folder
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'assets/Static/Fonts'
          }
        }]
      }
    ]
  },
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: devMode ? 'assets/js/[name].js' : 'assets/js/[name].[contenthash].js',
    chunkFilename: devMode ? 'assets/js/[name].js' : 'assets/js/[name].[contenthash].js'
  },
  plugins: [
    new VueLoaderPlugin(),

    //Extract CSS styles to a stand alone file.
    //Reference to the result .css file gets injected to the index.html
    //If it is production mode, a hash is appended to the file name.
    new MiniCssExtractPlugin({
      filename: devMode ? 'assets/Styles/style.css' : 'assets/Styles/style.[contenthash].css',
      chunkFilename: devMode ? 'assets/Styles/[name].css' : 'assets/Styles/[name].[contenthash].css',
    }),

    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, '../index.html'),
      inject: true
    }),

    new CopyPlugin([
      {
        from: path.resolve(__dirname, '../src/Static'),
        to: path.resolve(__dirname, '../dist/assets/Static')
      },
      {
        from: path.resolve(__dirname, '../src/Styles/Themes'),
        to: path.resolve(__dirname, '../dist/assets/Styles/Themes')
      }
    ])
  ]
}

module.exports = config
