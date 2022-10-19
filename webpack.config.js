const path = require('path');
const webpack = require('webpack');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  entry: './server.js',
  mode: 'production',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './data-marketplace/dist/gdx'),
    filename: 'server.bundle.js'
  },
  plugins: [
    new webpack.IgnorePlugin({ resourceRegExp: /^pg-native$/ }),
    new CopyWebpackPlugin({
      patterns: [
        { from: '.env' }
      ]
    })
  ]
};
