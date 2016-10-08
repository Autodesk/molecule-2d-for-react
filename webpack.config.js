const InlineEnviromentVariablesPlugin = require('inline-environment-variables-webpack-plugin');
const path = require('path');

module.exports = {
  entry: {
    app: ['babel-polyfill', './src/main.js'],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/js/',
    filename: 'bundle.js',
    library: true,
    libraryTarget: 'commonjs2',
  },
  externals: [
    /^[a-z\-0-9]+$/,
  ],
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
      }, {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'eslint-loader',
      }, {
        test: /\.scss$/,
        loaders: ['style', 'css', 'sass'],
      },
    ],
  },
  devtool: 'source-map',
  plugins: [
    new InlineEnviromentVariablesPlugin(),
  ],
};
