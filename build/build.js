/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
const webpack = require('webpack')
const webpackConfig = require('./webpack.build.conf')
webpack(webpackConfig, function (error, stats){
  if(error){
    throw error
  }
  console.log(stats.toString())
})