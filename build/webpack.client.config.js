const base = require('./webpack.base.config')
const webpack = require('webpack')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const path = require('path')

const config = Object.assign({}, base, {
  plugins: (base.plugins || [])
})

if (process.env.NODE_ENV !== 'production') {
  config.devtool = 'source-map' //source-map is required for debugging to work
  config.mode = 'development'
}

if (process.env.NODE_ENV === 'production') {
  config.mode = 'production'
  config.plugins.push(
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.HashedModuleIdsPlugin(),
    new BundleAnalyzerPlugin({
      analyzerMode: 'static',
      openAnalyzer: false,
      generateStatsFile: true,
      statsFilename: '../report/stats.json',
      reportFilename: '../report/report.html'
    })
  )

  config.optimization.minimize = true
}
module.exports = config
