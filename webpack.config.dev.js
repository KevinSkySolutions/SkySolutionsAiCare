const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
  devtool: 'source-map',
  entry: [
    'webpack-hot-middleware/client',
    path.resolve(__dirname, 'src')
  ],
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  plugins: [
    new CleanWebpackPlugin(['public/*']),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        WEBPACK: true
      }
    })
  ],
  module: {
    loaders: [
      {
        test: /\.(js)$/,
        loader: 'babel',
        include: path.resolve(__dirname, 'src'),
        query: {
          presets: [ 'react-hmre' ]
        }
      },
      {
        test: /\.css$/,
        loader: 'style!css',
        include: path.resolve(__dirname, '/')
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'url-loader'
      }
    ]
  }
};
