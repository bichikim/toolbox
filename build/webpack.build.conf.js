/**
 *
 * @author Bichi Kim <bichi@pjfactory.com>
 * @copyright PJ Factory Co.
 * @license Private
 */
const WebpackBaseConfig = require('./webpack.base.conf')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const DtsBundlePlugin = require('dts-bundle')
const {CheckerPlugin} = require('awesome-typescript-loader')
const WebpackMerge = require('webpack-merge')
WebpackBaseConfig.output.libraryTarget = 'commonjs2' // module mode
module.exports = WebpackMerge(WebpackBaseConfig, {
  plugins: [
    new CheckerPlugin(),
    new UglifyJsPlugin(),
  ],
})