'use strict';

var Route = function (app) {
  app.use(function (req, res) {
    res.status(404).json({
      url: req.originalUrl,
      error: 'Not found',
    });
  });
};

module.exports = Route;
