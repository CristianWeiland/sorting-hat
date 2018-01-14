var path = require('path');

module.exports = {
  // This is the "main" file which should include all other modules
  entry: path.join(__dirname, 'src/main.js'),
  // Where should the compiled file go?
  output: {
    // To the `dist` folder
    path: path.join(__dirname, 'dist'),
    publicPath: '/dist/',
    // With the filename `build.js` so it's dist/build.js
    filename: 'build.js'
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          'vue-style-loader',
          'css-loader'
        ],
      }, {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      }
    ]
  },
//   resolve: {
//     alias: {
//       vue: 'vue/dist/vue.js'
//     }
//   }
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
}