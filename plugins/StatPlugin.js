const fs = require('fs');
// FIXME uglify-js doesn't work with E6S, babel-core also can't compile even even with defined presets
const UglifyJS = require('uglify-es');
// const babel = require('babel-core');

/**
 * Create a new StatsPlugin that causes webpack to generate a stats file as
 * part of the emitted assets.
 * @constructor
 * @param {Object} options Options passed to the stats' `.toJson()`.
 */

function StatsPlugin(options) {
  this.options = options || {
    uglify: true,
  };
  this.stats = [];
}

/* eslint-disable no-param-reassign */

StatsPlugin.prototype.apply = function apply(compiler) {
  const options = this.options;

  compiler.plugin('emit', (compilation, done) => { // eslint-disable-line consistent-return
    const stats = compilation.getStats().toJson(options);


    this.stats = stats.assets
      .filter((i) => i.name.match(/\.js$/))
      .map((i) => ({ name: i.name, size: i.size }));

    if (!this.stats.length) return done(new Error('Stat assets is empty'));

    done();
  });

  if (this.options.dry) return;

  compiler.plugin('done', () => {
    const path = `${__dirname}/../build/index.html`;
    const file = fs.readFileSync(path);

    fs.writeFileSync(path, this.replace(file.toString()));
  });
};

StatsPlugin.prototype.replace = function replace(source) {
  return source
    .replace('/* replace */ var assets = [];', `var assets = ${JSON.stringify(this.stats)}`)
    .replace(/<script\s+id="load"\s*>((?:.|\s)+)<\/script>/m, (_, m) => `<script>${this.options.uglify ? UglifyJS.minify(m).code : m}</script>`);
};

StatsPlugin.prototype.get = function get() {
  return this.stats;
};

module.exports = StatsPlugin;

