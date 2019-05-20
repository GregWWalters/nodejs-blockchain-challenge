const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');

const app = express();
app.use(
  bodyParser.urlencoded({
    extended: true,
  }),
);
app.use(
  bodyParser.json({
    type: 'application/*',
    limit: '50mb',
  }),
);

routes(app);

// If error in route, pass to next to be resolved here
app.use((err, req, res, next) => {
  console.error(JSON.stringify({
    type: 'ERROR',
    method: req.method,
    endpoint: req.url,
    headers: req.headers,
    body: req.body,
    error: err,
  }));
  return res.status(500).json({
    error: err.message,
  });
});

module.exports = app;
