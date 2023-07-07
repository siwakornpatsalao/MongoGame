var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const cors = require('cors');
const mongoose = require('mongoose');
const games = require('./routes/games');
const Game = require('./models/Game.js');
const users = require('./routes/users2');
const New = require('./models/News.js');
const news = require('./routes/news');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb+srv://Pure:1234@cluster0.cy0kfn9.mongodb.net/?retryWrites=true&w=majority')
        .then(() => console.log('connection successfully!'))
        .catch((err) => console.error(err))

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/user', usersRouter);
app.use('/games', games);
app.use('/users', users);
app.use('/news', news);

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

app.listen(9000, () => {
    console.log('Application is running on port 9000');
  });

app.get('/games', async (req, res) => {
    try {
      const Games = await Game.find({});
      res.json(Games);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

app.get('/news', async (req, res) => {
    try {
      const news1 = await New.find({});
      res.json(news1);
    } catch (err) {
      console.error(err);
      res.status(500).send('An error occurred');
    }
});

  
module.exports = app;