var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fileUploader = require('express-fileupload');

var index = require('./routes/index');
var addMeme = require('./routes/addMeme');
var viewAll = require('./routes/viewAll');
var searchMeme = require('./routes/searchMeme');
var addGenre = require('./routes/addGenre');
var searchResults = require('./routes/searchResults');
var getDetails = require('./routes/getDetails');

var app = express();


require('./config/db')


app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')))

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// uncomment after placing your favicon in /public
console.log(__dirname)

app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(fileUploader())

app.use('/', index);
app.use('/addMeme', addMeme);
app.use('/viewAll', viewAll);
app.use('/searchMeme', searchMeme);
app.use('/addGenre', addGenre);
app.use('/searchResults', searchResults);
app.use('/getDetails', getDetails);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
