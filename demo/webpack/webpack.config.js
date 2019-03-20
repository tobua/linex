const CommonConfigWebpackPlugin = require('common-config-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  plugins: [
    new CommonConfigWebpackPlugin(),
    new HtmlWebpackPlugin()
  ]
}
