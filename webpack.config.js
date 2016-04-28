var path = require('path');
var webpack = require('webpack');

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './app.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  resolve:{
      alias:{

      }
  },
  externals: {
      jquery:'$',
      d3: 'd3'
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProvidePlugin({
        jquery:'$',
        d3: "d3",
        swal: "sweetalert"
    })
  ],
  module: {
    loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot', 'babel'],
          include: path.join(__dirname, 'src')
        }
    ]
  }
};
