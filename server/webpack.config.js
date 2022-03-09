const path = require('path');

module.exports = {
  mode: "development",
  target: 'node',
  entry: "./src/index.ts",
  devtool: 'inline-source-map',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname, 'build')
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: [/node_modules/, /dist/],
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.ts$/,
        use: {
          loader: "ts-loader"
        }
      }
    ]
  },
  resolve: {
    extensions: [
      'js',
      'ts'
    ]
  }
};