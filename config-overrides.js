const { ProvidePlugin } = require('webpack');
const tsconfigPaths = require('./tsconfig.paths.json')['compilerOptions']['paths'];
const path = require('path');

const alias = {};
const resolve = (dir) => path.resolve(__dirname, dir);
const removeSlashStar = (arg) => arg.split('/*')[0];

Object.entries(tsconfigPaths).forEach(([key, [value]]) => {
  const name = removeSlashStar(key);
  const path = removeSlashStar(value);

  alias[name] = resolve(path);
});

module.exports = function (config, env) {
  config.resolve.alias = Object.assign(config.resolve.alias, alias);

  return {
    ...config,
    module: {
      ...config.module,
      rules: [
        ...config.module.rules,
        {
          test: /\.(m?js|ts)$/,
          enforce: 'pre',
          use: ['source-map-loader']
        }
      ]
    },
    plugins: [
      ...config.plugins,
      new ProvidePlugin({
        process: 'process/browser'
      })
    ],
    resolve: {
      ...config.resolve,
      fallback: {
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        crypto: require.resolve('crypto-browserify')
      }
    },
    ignoreWarnings: [/Failed to parse source map/]
  };
};
