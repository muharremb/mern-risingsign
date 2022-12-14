const debug = require('debug');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const csurf = require('csurf');
const { isProduction } = require('./config/keys');
const User = require('./models/User');
require('./config/passport');
const passport = require('passport');
const usersRouter = require('./routes/api/users');
const csrfRouter = require('./routes/api/csrf');
const picsRouter = require('./routes/api/pics');


const socketio = require('socket.io')
const cors = require('cors');
const app = express();

app.use(logger('dev'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors())
app.use('/usersChat', usersRouter)
require('./bin/www')

const server = require('http').createServer(app)
const PORT = process.env.PORT || 5000



app.use(cookieParser());

app.use(passport.initialize());


app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

app.use('/api/pics', picsRouter);
app.use('/api/users', usersRouter);
app.use('/api/csrf', csrfRouter);


if (isProduction) {
  const path = require('path');
  // Serve the frontend's index.html file at the root route
  app.get('/', (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });

  // Serve the static assets in the frontend's build folder
  app.use(express.static(path.resolve("../frontend/build")));

  // Serve the frontend's index.html file at all other routes NOT starting with /api
  app.get(/^(?!\/?api).*/, (req, res) => {
    res.cookie('CSRF-TOKEN', req.csrfToken());
    res.sendFile(
      path.resolve(__dirname, '../frontend', 'build', 'index.html')
    );
  });
}

app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.statusCode = 404;
    next(err);
});

const serverErrorLogger = debug('backend:error');

  // Express custom error handler that will be called whenever a route handler or
  // middleware throws an error or invokes the `next` function with a truthy value
app.use((err, req, res, next) => {
    serverErrorLogger(err);
    const statusCode = err.statusCode || 500;
    res.status(statusCode);
    res.json({
      message: err.message,
      statusCode,
      errors: err.errors
    })
});


module.exports = app;