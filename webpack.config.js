const webpack = require('webpack');
module.exports = {
  entry: {
    bundle: './app/src/main.jsx'
  },
  output: {
    path: 'assets',
    filename: '[name].js'
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  module: {
    loaders: [{
      test: /\.js|jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }, {
      test: /\.css$/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.yml|yaml$/,
      loader: 'yaml-loader'
    }],
    plugins: [
      new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        warnings: false,
        compress: {
          warnings: false
        }
      })
    ]
  }
};
