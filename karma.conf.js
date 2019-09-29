module.exports = (config) => {
  config.set({
    basePath: '',

    frameworks: [
      'mocha',
      'chai',
    ],

    files: [
      'src/**/*.js',
      'test/**/*.js',
    ],

    preprocessors: {
      'src/**/*.js': [
        'webpack',
        'sourcemap',
      ],
      'test/**/*.js': [
        'webpack',
        'sourcemap',
      ],
    },

    reporters: ['mocha'],

    webpack: {
      target: 'node',
      node: {
        fs: 'empty',
        child_process: 'empty',
      },
      module: {
        rules: [
          {
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
              loader: 'babel-loader',
            },
          },
          {
            test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
            loader: 'file-loader',
            options: {
              name: 'fonts/[name].[ext]',
            },
          },
          {
            test: /\.css$/,
            use: [
              'style-loader',
              'css-loader',
            ],
          },
          {
            test: /\.wav$/,
            loader: 'file-loader',
            options: {
              name: 'media/sounds/[name].[ext]',
            },
          },
        ],
      },
    },

    plugins: [
      require('karma-webpack'),
      require('karma-mocha'),
      require('karma-chai'),
      require('karma-mocha-reporter'),
      require('karma-chrome-launcher'),
      require('karma-sourcemap-loader'),
    ],

    autoWatch: true,

    browsers: ['ChromeHeadless'],

    singleRun: false,

    webpackServer: {
      noInfo: true,
    },
  });
};
