'use strict';

const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const join = require('path').join;
const bodyParser = require('body-parser');
const jade = require('jade');
const fs = require('fs');
const methodOverride = require('method-override');
require('dotenv').load();

const app = express();
const port = process.env.PORT || 4000;

mongoose.connect(process.env.DATABASE);

fs.readdirSync('./api/models').forEach(function (file) {
  if (~file.indexOf('.js')) require(join(__dirname, 'api/models', file));
});

app.set('view engine', 'jade');
app.set('views', __dirname + '/app/views');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(methodOverride('_method'));

require('./config/routes')(app);

app.listen(port, function() {
  console.log('Magic is happening on port ' + port);
});

module.exports = app;
