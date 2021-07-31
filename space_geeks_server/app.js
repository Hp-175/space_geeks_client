var createError = require('http-errors');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose=require('mongoose');
var config=require('./configure');
var passport=require('passport');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var SpaceAchievementRouter=require('./routes/SpaceAchievementRouter');
var FacinatingTheoryRouter=require('./routes/FacinatingTheoryRouter');
var FactRouter=require('./routes/FactsRouter');
var FavouriteRouter=require('./routes/FavouriteRouter');
var uploadRouter=require('./routes/uploadRouter');

const url=config.mongoUrl;
const connect=mongoose.connect(url,
  {
    useNewUrlParser:true,
    useUnifiedTopology:true
  });
  mongoose.set('useCreateIndex', true);
connect.then((db)=>{
  console.log('Database connected!');
},(err)=>{console.log(err);});

var app = express();


app.all('*',(req,res,next)=>{
  if(req.secure)
  {
    return next();
  }
  else
  {
    res.redirect(307,'https://'+req.hostname+':'+app.get('secPort')+req.url);
  }
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(passport.initialize());

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/SpaceAchievement',SpaceAchievementRouter);
app.use('/FacinatingTheory',FacinatingTheoryRouter);
app.use('/Fact',FactRouter);
app.use('/Favourite',FavouriteRouter);
app.use('/ImageUpload',uploadRouter);

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
