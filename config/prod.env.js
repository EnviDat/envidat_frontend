'use strict'
module.exports = {
  NODE_ENV: '"production"',
  VERSION: JSON.stringify(require('../package.json').version),
  ENVIDAT_PROXY: '"./ServiceProxyServlet?server=0&serverpath="',
  SOLR_PROXY: '"./ServiceProxyServlet?server=1&serverpath="',
}
