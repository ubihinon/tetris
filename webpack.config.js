const path = require('path');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const babel = require('./webpack/babel');
const fonts = require('./webpack/fonts');
const css = require('./webpack/css');
const audio = require('./webpack/audio');
const devServer = require('./webpack/devserver');

const PATHS = {
  src: path.join(__dirname, './src'),
  build: path.join(__dirname, './dist'),
};

const common = merge([
  {
    entry: [
      '@babel/polyfill',
      `${PATHS.src}/js/index.js`,
    ],
    output: {
      path: PATHS.build,
      filename: 'js/bundle.js',
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
          },
        }),
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'Tetris',
        template: `${PATHS.src}/index.html`,
      }),
      new CopyPlugin([
        {
          from: `${PATHS.src}/media/favicons`,
          to: `${PATHS.build}/media/favicons`,
        },
      ]),
    ],
  },
  babel(),
  fonts(),
  css(),
  audio(),
]);

module.exports = (env) => {
  if (env === 'production') {
    return merge([common]);
  }
  if (env === 'development') {
    return merge([
      common,
      devServer(),
    ]);
  }
};
