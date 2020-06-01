var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpack = require('webpack');

module.exports = {
    entry: ['./src/js/app.js'],
    output: {
      path: __dirname + '/dist',
      filename: '[name].bundle.js'
    },
    externals: {
      jquery: 'jQuery'
    },
    plugins: [
        new HtmlWebpackPlugin({
          template: 'src/index.html',
          filename: 'index.html',
        })
    ],
    module: {
        rules: [
          {
            test: /\.ttf$/,
            loaders: [
              'url-loader'
            ]
          },
          {
            test: /\.(svg|gif|png|eot|woff|ttf)$/,
            loaders: [
              'url-loader'
            ]
          },
          {
            test: /\.(css|txt|html)$/,
            use: 'raw-loader',
          },
        ]
    }
}