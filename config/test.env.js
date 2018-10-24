'use strict'
const merge = require('webpack-merge')
const devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"',
  VERSION: JSON.stringify(require('../package.json').version),
  ENVIDAT_PROXY: '"/ui/proxy/ServiceProxyServlet?server=0&serverpath="',
  SOLR_PROXY: '"/ui/proxy/ServiceProxyServlet?server=1&serverpath="',
})
