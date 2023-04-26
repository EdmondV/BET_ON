const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: `${__dirname}/demo.js`,
  output: { path: __dirname, filename: 'bundle.js' },
  module: {
    loaders: [
      {
        test: /\.js$/, // Transform all .js files required somewhere with Babel
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          // require.resolve solves the issue of relative presets when dealing with
          // locally linked packages. This is an issue with babel and webpack.
          // See https://github.com/babel/babel-loader/issues/149 and
          // https://github.com/webpack/webpack/issues/1866
          // presets: ,
        },

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
        test: /\.(eot|svg|ttf|woff|woff2|aac)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/,
        loader: 'file-loader',
      }, {
        test: /\.html$/,
        loader: 'html-loader',
      }, {
        test: /\.json$/,
        loader: 'json-loader',
      }, {
        test: /\.(mp4|webm)$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
        },
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: `${__dirname}/../app/index.html`,
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
      inject: true,
    }),
  ],
  resolve: {
    modules: ['../app', '../node_modules'],
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
};
