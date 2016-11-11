var webpack = require('webpack');
var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


var BUILD_DIR = path.resolve(__dirname, 'src/client/public');
var APP_DIR = path.resolve(__dirname, 'src/client/app');

var config = {
  entry: {
    main : [APP_DIR + '/main.jsx'],
    individual : [APP_DIR + '/individual.jsx']
  },

  output: {
    path: BUILD_DIR,
    filename: '[name].js'
  },
  
  module : {
    loaders : [
      {
        test : /\.jsx?/,
        include : APP_DIR,
        loader : 'babel'
      }

      
    ]
    
  }
};

module.exports = config;
