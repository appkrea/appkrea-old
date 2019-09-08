const webpack = require('webpack');
const path = require('path');
const autoprefixer = require('autoprefixer');

const mode = process.env.NODE_ENV === 'production' ? 'production' : 'development';

const SRC = path.join(__dirname, 'client', 'src');
const DIST = path.join(__dirname, 'client', 'dist', 'bundles');

const entry = {
  index: [
    `${SRC}/index/js/index.jsx`,
    `${SRC}/index/scss/index.scss`,
  ],
  admin: [
    `${SRC}/admin/js/index.jsx`,
    `${SRC}/admin/scss/index.scss`,
  ],
};

if (mode !== 'production') {
  Object.keys(entry).forEach((e) => {
    entry[e].unshift('webpack-hot-middleware/client?noInfo=false');
  });
}

module.exports = {
  mode,
  entry,
  output: {
    filename: '[name].js',
    path: DIST,
    publicPath: '/bundles/',
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader'],
      },
      {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [autoprefixer()],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 25000,
            },
          },
        ],
      },
    ],
  },
  plugins: (mode !== 'production') ? [
    new webpack.HotModuleReplacementPlugin(),
  ] : [],
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /[\\/]node_modules[\\/]/,
          name: 'vendors',
          chunks: 'all',
        },
      },
    },
  },
};
