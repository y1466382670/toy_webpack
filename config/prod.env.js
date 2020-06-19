'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')
 
module.exports = merge(prodEnv, {
  NODE_ENV: '"production"',
  API_ROOT: '"https://www.prov.com"'   //线上请求前缀
})
