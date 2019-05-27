const webpack = require('webpack')
const path = require('path')
const clientConfig = require('./webpack.client.config')

module.exports = function setupDevServer (app) {
  clientConfig.entry.app = [
    'webpack-hot-middleware/client',
    clientConfig.entry.app
  ]

  clientConfig.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin()
  )

  const clientCompiler = webpack(clientConfig)
  app.use(require('webpack-dev-middleware')(clientCompiler, {
    stats: {
      colors: true
    },
    publicPath: clientConfig.output.publicPath
  })
  )

  app.use(require('webpack-hot-middleware')(clientCompiler))

  // This configures express server to respond to any routes and returns the index.html from webpack's memory system
  app.get('*', (req, res, next) => {
    clientCompiler.outputFileSystem.readFile(path.join(clientCompiler.outputPath, 'index.html'), (err, result) => {
      if (err) {
        return next(err)
      }
      res.set('content-type', 'text/html')
      res.send(result)
      res.end()
    })
  })
}
