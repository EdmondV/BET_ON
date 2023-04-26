/**
 * COMMON WEBPACK CONFIGURATION
 */

const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const execSync = require('child_process').execSync; // eslint-disable-line
// const VERSION = execSync('git describe --tags $(git rev-list --tags --max-count=1)').toString().trim();
const BUILD = execSync('git rev-parse --short HEAD').toString().trim();

module.exports = (options) => ({
  entry: options.entry,
  output: Object.assign({ // Compile into js/build.js
    path: path.resolve(process.cwd(), 'build'),
    publicPath: '/',
  }, options.output), // Merge with env dependent settings
  module: {
    loaders: [{
      test: /\.js$/, // Transform all .js files required somewhere with Babel
      loader: 'babel-loader',
      exclude: /node_modules/,
      query: options.babelQuery,
    }, {
      // Do not transform vendor's CSS with CSS-modules
      // The point is that they remain in global scope.
      // Since we require these CSS files in our JS or CSS files,
      // they will be a part of our compilation either way.
      // So, no need for ExtractTextPlugin here.
      test: /\.css$/,
      include: /node_modules/,
      loaders: ['style-loader', 'css-loader'],
    }, {
      test: /\.(jpg|png|gif)$/,
      loader: 'url-loader',
    }, {
      test: /\.html$/,
      loader: 'html-loader',
    }, {
      test: /\.json$/,
      loader: 'json-loader',
    }, {
      test: /\.(mp4|webm)$/,
      loader: 'file-loader',
      options: {
        outputPath: 'videos/',
      },
    }, {
      test: /\.(eot|ttf|woff|woff2)$/,
      loader: 'file-loader',
    }, {
      test: /\.svg$/,
      loader: 'url-loader',
    }],
  },
  plugins: options.plugins.concat([
    new webpack.ProvidePlugin({
      // make fetch available
      fetch: 'exports-loader?self.fetch!whatwg-fetch',
    }),

    // Always expose NODE_ENV to webpack, in order to use `process.env.NODE_ENV`
    // inside your code for any environment checks; UglifyJS will automatically
    // drop any unreachable code.
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
        TR_ENV: JSON.stringify(process.env.TR_ENV),
        DEBUG: JSON.stringify(process.env.DEBUG),
        API_URL: JSON.stringify('/api'),
        // VERSION: JSON.stringify(VERSION),
        BUILD: JSON.stringify(BUILD),
      },
    }),
    new webpack.NamedModulesPlugin(),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new CopyWebpackPlugin([
      { from: 'static', to: './' },
    ]),
  ]),
  resolve: {
    modules: ['app', 'node_modules'],
    extensions: [
      '.js',
      '.jsx',
      '.react.js',
    ],
    mainFields: [
      'browser',
      'jsnext:main',
      'main',
    ],
  },
  target: 'web', // Make web variables accessible to webpack, e.g. window
  performance: options.performance || {},
});
