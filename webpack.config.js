const path = require('path');
const webpack = require('webpack');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
// const MinifyPlugin = require("babel-minify-webpack-plugin");
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  mode: 'development',
  plugins: [
    new VueLoaderPlugin()
  ],
  entry: ['babel-polyfill','./src/main.js'],
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '/dist/',
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
      },      {
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
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js'
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    historyApiFallback: true,
    noInfo: true,
    overlay: true
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    // new webpack.optimize.UglifyJsPlugin({
    //   sourceMap: true,
    //   compress: {
    //     warnings: false
    //   }
    // }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    })
  ]);

  module.exports.mode = 'production';
  // module.exports.optimization = {
  //   minimizer: [
  //     // we specify a custom UglifyJsPlugin here to get source maps in production
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       uglifyOptions: {
  //         compress: false,
  //         // ecma: 5,
  //         mangle: true
  //       },
  //       sourceMap: true
  //     })
  //   ]
  // };
  module.exports.optimization = {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        terserOptions: {
          compress: true,
          mangle: true
        }
      })
    ]
  };
}
