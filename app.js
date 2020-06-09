var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var multer = require('multer');
var upload = multer();
// var session = require('express-session');
const key = require('./controllers/question')._key;
var rfs = require('rotating-file-stream');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var eco1Router = require('./routes/route-eco1');
var eco2Router = require('./routes/route-eco2');

var daysRouter = require('./routes/route-day-report');
var monthRouter = require('./routes/route-month-report');
var updateRouter = require('./routes/updates-route');

var app = express();

app.set('trust proxy', true);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
const fs = require('fs');

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://127.0.0.1:5500"); //"*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));
// app.use(express.urlencoded({ extended: false }));
//app.use(upload.array());
app.use(cookieParser());


const requestIp = require('request-ip');
app.use(requestIp.mw())
const expressip = require('express-ip');
app.use(expressip().getIpInfoMiddleware);

logger.token('type', function (req, res) {
  return req.headers['content-type'];
});
logger.format('iplog', function (req, res) {
  if (!req.ipInfo.country) {
    return `${req.clientIp}`
  }
  const ipInfo = req.ipInfo;
  return `${req.clientIp} - ${ipInfo.country} - ${ipInfo.region} - ${ipInfo.eu} - ${ipInfo.city} - [${ipInfo.ll}]  - ${ipInfo.area}`;
});

const accessLogStream =  rfs.createStream('access.log', {
  interval: '3d',
  path: path.join(__dirname, 'logs')
});

// const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
const logFormat = ":iplog :remote-user [:date[iso]] :method \":url\" HTTP/:http-version :status :res[content-length] - :response-time ms";
// const logFormat = ":remote-addr :remote-user [:date[iso]] :method \":url\" HTTP/:http-version :status :res[content-length] - :response-time ms";

//app.use(logger('combined', { stream: accessLogStream }));
app.use(logger(logFormat, {
  stream: accessLogStream
}));
// app.use(logger('common'));


//app.use(session({secret: key}));

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use('/', indexRouter);

app.use('/1', eco1Router);
app.use('/2', eco2Router);

app.use('/reports/day', daysRouter);
app.use('/reports/month', monthRouter);
app.use('/users', usersRouter);
app.use('/update-last-day', updateRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;