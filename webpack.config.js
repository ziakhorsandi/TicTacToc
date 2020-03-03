var webpack=require('webpack');
var path=require('path');
const CopyPlugin = require('copy-webpack-plugin');

var DIST_DIR=path.resolve(__dirname,'dist');
var SRC_DIR=path.resolve(__dirname,'src');

var config={
  entry: SRC_DIR+"/app/index.js",
  output:{
    path:DIST_DIR+"/app",
    filename:"bundle.js",
    publicPath:"/app/"
  },
  devServer: {
    contentBase: SRC_DIR,
    compress: true,
    port: 9000
  },



  module:{
    rules: [
      {
        test: /\.m?js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env',"@babel/preset-react"]
          }
        }
      }
    ]
      
  },
  plugins:[
    new CopyPlugin([
      { from: 'src/index.html', to: '../' }
    ])
  ]
};

module.exports= config;