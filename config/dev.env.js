'use strict'
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  // SERVER_URL: '"http://192.168.1.12:8086/v1/"',
  SERVER_URL:'"http://fanoosinvestment.farazpardazan.com/v1/"'
})
