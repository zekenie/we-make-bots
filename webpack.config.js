module.exports = {
  entry: './src/index.js',
  devtool: 'source-map',
  output: {
    path: process.cwd() + '/dist',
    filename: './client.js'
  },
  module: {
    loaders: [
      {
        test: /\.scss$/,
        loaders: ["style", "css?sourceMap", "sass?sourceMap"]
      },
      {
        test: /\.jsx?$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['react', 'es2016']
        }
      }
    ]
  }
};