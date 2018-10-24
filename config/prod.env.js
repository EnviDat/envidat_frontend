'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VERSION: JSON.stringify(require('../package.json').version),
  ENVIDAT_PROXY: '"/ui/proxy/ServiceProxyServlet?server=0&serverpath="',
  SOLR_PROXY: '"/ui/proxy/ServiceProxyServlet?server=1&serverpath="',
}
