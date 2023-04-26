/* eslint-disable global-require */
const path = require('path');
const proxy = require('http-proxy-middleware');

// const StatPlugin = require('../../plugins/StatPlugin');

// Dev middleware
const addDevMiddlewares = (app, webpackConfig, args) => {
  const webpack = require('webpack');
  const webpackDevMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const compiler = webpack(webpackConfig);
  const middleware = webpackDevMiddleware(compiler, {
    noInfo: true,
    publicPath: webpackConfig.output.publicPath,
    silent: true,
    stats: 'errors-only',
  });
  const fs = middleware.fileSystem;
  const middlewareHtml = (req, res) => { // eslint-disable-line
    // const stat = webpackConfig.plugins.find((i) => i instanceof StatPlugin);

    fs.readFile(path.join(compiler.outputPath, 'index.html'), (err, file) => {
      if (err) {
        res.sendStatus(404);
      } else {
        // res.send(stat.replace(file.toString()));
        res.send(file.toString());
      }
    });
  };
  app.get('/', middlewareHtml);
  app.use(middleware);
  app.use(webpackHotMiddleware(compiler));

  const REMOTE_URL = 'https://demo.betonchart.com';
  const LOCAL_URL = 'http://localhost:8081';
  const target = (args.length > 0 && args.includes('local')) ? LOCAL_URL : REMOTE_URL;
  app.use(['/api', '/ws'], proxy({
    target,
    // secure: false,
    changeOrigin: true,
    ws: true,
    logLevel: 'debug',
  }));

  // Since webpackDevMiddleware uses memory-fs internally to store build
  // artifacts, we use it instead
  app.get('*', middlewareHtml);
};


/**
 * Front-end middleware
 */
module.exports = (app) => {
  const args = process.argv.slice(2);
  const webpackConfig = require('../../internals/webpack/webpack.dev.babel');

  addDevMiddlewares(app, webpackConfig, args);

  return app;
};
