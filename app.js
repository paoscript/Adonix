var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

// Views Front End Controlles
var loginController = require('./controllers/loginController')
var mainController = require('./controllers/mainController')
var logoutController = require('./controllers/logoutController')
var apprenticeController = require('./controllers/apprenticeController')
var usersController = require('./controllers/usersController')
var settingController = require('./controllers/settingController')
var modificationController = require('./controllers/modificationController')

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Conttrollers
app.use('/', mainController)
app.use('/login', loginController)
app.use('/logout', logoutController)
app.use('/apprentices', apprenticeController)
app.use('/users', usersController)
app.use('/settings', settingController)
app.use('/modifications', modificationController)


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
