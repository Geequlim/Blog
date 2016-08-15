const webpack = require('webpack');
const path = require('path');
const node_modules = path.resolve(__dirname, 'node_modules');
const pathToReact = path.resolve(node_modules, 'react/dist/react.min.js');
module.exports = {
  entry: {
    bundle: './app/src/main.jsx'
  },
  output: {
    path: 'assets',
    filename: '[name].js'
  },
  externals: {
    "jquery": '$',
    "lodash":   "_",
    "js-yaml": "jsyaml",
    "immutable": "Immutable",
    "dynamics": "dynamics",
    "marked": "marked",
    "react": 'React',
    "react-dom": "ReactDOM",
    'redux': 'Redux',
    "react-router": "ReactRouter",
    'history': "History",
    'jss': "jss"
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
      exclude: /node_modules/,
      loader: 'style-loader!css-loader'
    }, {
      test: /\.json$/,
      exclude: /node_modules/,
      loader: 'json-loader'
    }, {
      test: /\.yml|yaml$/,
      exclude: /node_modules/,
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
    ],
    noParse: [pathToReact]
  }
};
