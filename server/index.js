/* eslint-disable global-require */
const express = require('express');
const favicon = require('serve-favicon');
const path = require('path');
const bodyParser = require('body-parser');

const config = require('./config');

const app = express();

// Routes
const api = require('./routes/api');

const getHtml = (entry) => {
  // language=HTML
  const html = `
    <html lang="cs">
    <head>
      <meta charset="utf-8">
      <link rel="apple-touch-icon" sizes="180x180" href="/assets/icons/apple-touch-icon.png">
      <link rel="icon" type="image/png" sizes="32x32" href="/assets/icons/favicon-32x32.png">
      <link rel="icon" type="image/png" sizes="16x16" href="/assets/icons/favicon-16x16.png">
      <link rel="manifest" href="/assets/icons/site.webmanifest">
      <link rel="mask-icon" href="/assets/icons/safari-pinned-tab.svg" color="#00a0ab">
      <meta name="msapplication-TileColor" content="#ffffff">
      <meta name="msapplication-config" content="/assets/icons/browserconfig.xml">
      <meta name="theme-color" content="#ffffff">
      <title>appkrea.cz | mobile & web app development</title>
      <meta name="viewport" content="width=device-width, initial-scale=1">
    </head>
    <style>
      .loading {
        position: absolute;
        top: 48%;
        left: 45%;
        top: calc(50% - 11px);
        left: calc(50% - 14px);
      }

      .loading-bar {
        display: inline-block;
        width: 4px;
        height: 18px;
        border-radius: 4px;
        animation: loading 1s ease-in-out infinite;
      }

      .loading-bar:nth-child(1) {
        background-color: #931ED0;
        animation-delay: 0;
      }

      .loading-bar:nth-child(2) {
        background-color: #00A0AB;
        animation-delay: 0.09s;
      }

      .loading-bar:nth-child(3) {
        background-color: #931ED0;
        animation-delay: .18s;
      }

      .loading-bar:nth-child(4) {
        background-color: #00A0AB;
        animation-delay: .27s;
      }

      @keyframes loading {
        0% {
          transform: scale(1);
        }
        20% {
          transform: scale(1, 2.2);
        }
        40% {
          transform: scale(1);
        }
      }
    </style>
    <body>
      <div id="app">
        <div class="loading">
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
          <div class="loading-bar"></div>
        </div>
      </div>
      <script src="/bundles/vendors.js"></script>
      <script src="/bundles/${entry}.js"></script>
    </body>
    </html>`;
  return html;
};

if (config.env !== 'production') {
  // Webpack HOT middleware
  const webpack = require('webpack');
  const webpackMiddleware = require('webpack-dev-middleware');
  const webpackHotMiddleware = require('webpack-hot-middleware');
  const webpackConfig = require('../webpack.config');

  const compiler = webpack(webpackConfig);

  app.use(webpackMiddleware(compiler, {
    hot: true,
    publicPath: '/bundles/',
    noInfo: true,
    logLevel: 'warn',
  }));
  app.use(webpackHotMiddleware(compiler));
} else {
  app.use('/bundles', express.static(path.join(__dirname, '../client', 'dist', 'bundles')));
}

// Log in development only
if (config.env !== 'production') {
  // eslint-disable-next-line no-console
  console.log(`Server is listening on port ${config.port}`);
  const morgan = require('morgan');
  app.use(morgan('dev'));
}

// Body parser JSON
app.use(bodyParser.json());

// Serve static files
app.use('/assets', express.static(path.join(__dirname, '../client', 'dist', 'assets')));

// Serve favicon
app.use(favicon(path.join(__dirname, '../client', 'dist', 'assets', 'icons', 'favicon.ico')));

// Api route
app.use('/api', api);

app.get('/admin*', (req, res) => {
  res.send(getHtml('admin'));
});

app.get('/*', (req, res) => {
  res.send(getHtml('index'));
});

app.listen(config.port);
