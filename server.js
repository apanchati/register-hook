const express = require('express')
const app = express()
const path = require('path')
const fs = require('fs') // file system module

const isProd = typeof process.env.NODE_ENV !== 'undefined' && (process.env.NODE_ENV === 'production')

const indexHTML = (() => {
  return fs.readFileSync(path.resolve(__dirname, './index.html'), 'utf-8')
})()

if (!isProd) {
  require('./build/dev-server')(app)
} else {
  app.use('/', express.static(path.resolve(__dirname, './dist')))
  app.get('*', (req, res, next) => {
    res.set('content-type', 'text/html')
    res.send(indexHTML)
    res.end()
  })
}

const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log(`server started at http://localhost:${port}`)
})
