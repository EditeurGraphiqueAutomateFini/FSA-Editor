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
    filename: 'fsa-editor.js',
    publicPath: '/static/',
    library: "fsa_editor",
    libraryTarget: 'umd',
    umdNamedDefine: true
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
        jquery: '$',
        d3: "d3",
        swal: "sweetalert",
        _: "lodash"
    })
  ],
  module: {
    loaders: [
        {
          test: /\.js$/,
          loaders: ['react-hot', 'babel'],
          include: path.join(__dirname, 'src')
      },
      { test: /\.css$/, loader: "style-loader!css-loader" },
      { test: /\.png$/, loader: "url-loader?limit=100000" },
      { test: /\.jpg$/, loader: "url-loader?limit=100000" },
      { test: /\.gif$/, loader: "url-loader?limit=100000" }
    ]
  }
};
