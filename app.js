var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');


var routes = require('./routes/index');
var webhook = require('./routes/webhook');


var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));


app.use('/', routes);


var port = process.env.PORT || 3000;

app.listen(port, function () {
  console.log('Example app listening on port 3000!');
});
