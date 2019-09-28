module.exports = () => ({
  module: {
    rules: [
      {
        test: /\.wav$/,
        loader: 'file-loader',
        options: {
          name: 'media/sounds/[name].[ext]',
        },
      },
    ],
  },
});
