/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
const WebpackBaseConfig = require('./webpack.base.conf')
const WebpackMerge = require('webpack-merge')
module.exports = WebpackMerge(WebpackBaseConfig, {
  devtool: 'inline-source-map',
})
