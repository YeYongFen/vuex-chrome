const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const WebpackShellPlugin = require('webpack-shell-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ChromeExtensionReloader = require('webpack-chrome-extension-reloader');
const { VueLoaderPlugin, } = require('vue-loader');
const HtmlWebpackPlugin = require('vue-html-webpack-plugin');

const { version, } = require('./package.json');

function resolve (dir) {
  return path.join(__dirname, './', dir);
}

const config = {
  mode: process.env.NODE_ENV,
  context: resolve('/src'),
  entry: {
    'background': resolve('/src/background.js'),
    'popup/popup': resolve('/src/popup/popup.js'),
    'options/options': resolve('/src/options/options.js'),
    'content': resolve('/src//content/content.js'),
  },
  output: {
    path: resolve('/dist'),
    filename: '[name].js',
  },
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.js', '.vue'],
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loaders: 'vue-loader',
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif|svg|ico)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        },
      }
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({
      filename: '[name].css',
    }),

    new HtmlWebpackPlugin({
      title: 'popup page',
      filename: 'popup/popup.html',
      chunks: ['popup/popup'],
      vue: true,
    }),

    new HtmlWebpackPlugin({
      title: 'popup page',
      filename: 'options/options.html',
      chunks: ['options/options'],
      vue: true,
    }),
    new CopyWebpackPlugin([
      { from: 'icons', to: 'icons', ignore: ['icon.xcf'], },
      {
        from: 'manifest.json',
        to: 'manifest.json',
        transform: content => {
          const jsonContent = JSON.parse(content);
          if (config.mode === 'development') {
            jsonContent['content_security_policy'] = "script-src 'self' 'unsafe-eval'; object-src 'self'";
          }
          return JSON.stringify(jsonContent, null, 2);
        },
      }
    ]),
    new WebpackShellPlugin({
      onBuildEnd: ['node scripts/remove-evals.js'],
    })
  ],
};

if (config.mode === 'production') {
  config.plugins = (config.plugins || []).concat([
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: '"production"',
      },
    })
  ]);
}

if (process.env.HMR === 'true') {
  config.plugins = (config.plugins || []).concat([new ChromeExtensionReloader()]);
}

module.exports = config;
