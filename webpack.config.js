var path = require("path")
var webpack = require("webpack")
var HtmlWebpackPlugin = require("html-webpack-plugin")

var TARGET = process.env.npm_lifecycle_event
var ROOT_PATH = path.resolve(__dirname)
var APP_PATH = path.resolve(ROOT_PATH, "app")
var BUILD_PATH = path.resolve(ROOT_PATH, "build")

module.exports = {

  debug: true,

  devtool: "eval-source-map",

  entry: "./app/index",

  output: {
    path: BUILD_PATH,
    filename: "bundle.js"
  },

  module: {
    loaders: [
      {
        test: /\.js$/,
        include: APP_PATH,
        loaders: ["react-hot", "babel"]
      },
      {
        test: /\.styl$/,
        include: APP_PATH,
        loader: "style-loader!css-loader!stylus-loader"
      },
      {
        test: /\.(png|jpg)$/,
        include: APP_PATH,
        loader: "url-loader?limit=25000"
      }

      // Fonts?
    ],

    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin()
    ]
  }

}
