const path = require('path');

module.exports = {
  entry: "./assets/javascript/src/main.js",
  output: {
    filename: 'main.js',
    path: path.resolve( __dirname, "assets/javascript/dist" )
  },
  optimization: {
		minimize: true
	},
  devtool: 'source-map',
  watch: true
}