const path = require('path');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
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
    plugins: [
      new HtmlWebpackPlugin({
        filename: 'index.html',
        title: 'Tetris',
        template: `${PATHS.src}/index.html`,
      }),
      new FaviconsWebpackPlugin({
        logo: './favicon.png',
        cache: true,
        inject: true,
        favicons: {
          appName: 'Tetris',
          appDescription: 'Tetris',
          developerName: 'Vladimir Nosov',
          developerURL: null,
          background: '#ddd',
          theme_color: '#333',
        },
      }),
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
  } if (env === 'development') {
    return merge([
      common,
      devServer(),
    ]);
  }
};
