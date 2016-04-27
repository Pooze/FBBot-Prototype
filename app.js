'use strict'

var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var webhook = require('./routes/webhook');

var app = express();

var FBBOT_TOKEN = process.env.FBBOT_TOKEN || 'debug'; // REMOVE THIS LINEs

if (!FBBOT_TOKEN) {
  throw new Error('Missing environment variable FBBOT_TOKEN');
}



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);
app.use('/webhook', webhook);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.json({
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({
      message: err.message,
      error: {}
    });
});

var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
