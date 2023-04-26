// Important modules this config uses
const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const HashOutput = require('webpack-plugin-hash-output');
const StatPlugin = require('../../plugins/StatPlugin');

module.exports = require('./webpack.base.babel')({
  // In production, we skip all hot-reloading stuff
  entry: [
    path.join(process.cwd(), 'app/app.js'),
  ],

  // Utilize long-term caching by adding content hashes (not compilation hashes) to compiled assets
  output: {
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].[chunkhash].chunk.js',
  },
  plugins: [
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 400000, // Minimum number of characters
    }),
    new HashOutput(),
    new StatPlugin({ dry: false, uglify: true }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'main',
      children: true,
      minChunks: 2,
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks({ context }) {
        return (context && context.indexOf('node_modules') >= 0);
      },
    }),
    // Minify and optimize the index.html
    new HtmlWebpackPlugin({
      template: 'app/index.html',
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      },
      inject: false,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        properties: true,
        sequences: true,
        dead_code: true,
        conditionals: true,
        comparisons: true,
        evaluate: true,
        booleans: true,
        unused: true,
        loops: true,
        hoist_funs: true,
        cascade: true,
        if_return: true,
        join_vars: true,
        drop_console: true,
        drop_debugger: true,
        unsafe: true,
        hoist_vars: true,
        negate_iife: true,
        screw_ie8: true,
      },
      comments: () => false,
      mangle: {
        screw_ie8: true,
        keep_fnames: false,
      },
    }),
  ],
});
