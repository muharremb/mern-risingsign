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

const socketio = require('socket.io')
const cors = require('cors');
const app = express();

app.use(logger('dev'));

//chat stuff lets go
app.use(express.urlencoded({ extended: true })); //changed to true for chat
app.use(express.json());
app.use(cors()) // should put this in conditional for !production?
app.use('/usersChat', usersRouter)
require('./bin/www')

const server = require('http').createServer(app)
const PORT = process.env.PORT || 5000


//chat stuff lmk if we should refactor sorry guys



// io.on('connection', (socket) => {

//   socket.on('new-user', async () => {
//     const members = await User.find();
//     io.emit('new-user', members)
//   })

//   socket.on('join-room', async(room) => {
//     socket.join(room);
//     let roomMessages = await getLastMessagesFromRoom(room);
//     roomMessages = sortRoomMessagesByDate(roomMessages)
//     socket.emit('room-messages', roomMessages)
//   })

//   socket.on('message-room', async(room, content, sender, time, date) => {
//     console.log('new-message', content)
//     const newMessage = await Message.create({content, from: sender, time, date, to: room});
//     let roomMessages = await getLastMessagesFromRoom(room);
//     roomMessages = sortRoomMessagesByDate(roomMessages);

//     //send message to room
//     io.to(room).emit('room-messages', roomMessages);
//     socket.broadcast.emit('notifications', room)
//   })
// })



app.use(cookieParser());

app.use(passport.initialize());
// const app.use(express.json())

// // chat stuff
// const rooms = ['libra', 'pisces', 'crypto']

// app.get('/rooms', (req, res) => {
//   res.send(rooms)
// }) // is this correct location ?



// source: www.youtube.com/watch?v=qdZYHbg72WQ&t=11784s -->
// const getLatestMessagesFromRoom = async (room) => {
//   let roomMessages = await Message.aggregate([
//     {$match: {to: room}},
//     {$group: {_id: '$date'}, messagesByDate: {push: '$$ROOT'}}
//   ])
//   return roomMessages
// }

// const sortMessages = (messages) => {
//   const sortedMessages = messages.sort((a, b) => {
//     const dateA = a._id.split('/');
//     const dateB = b._id.split('/');
//     const dateAChron = dateA[2] + dateA[0] + dateA[1];
//     const dateBChron = dateB[2] + dateB[0] + dateB[1];
//     return dateAChron > dateBChron ? 1 : -1;
//   })
// }

//socket conneciton!!!
// io.on('connection', (socket) => {

//   socket.on('new-user', async() => {
//     console.log("is anything happening? ???????")
//     const members = await User.find(); //what does User.find() do?
//     io.emit('new-user', members)
//   })

//   socket.on('join-room', async(room) => {
//     socket.join(room)
//     const roomMessages = await getLatestMessagesFromRoom(room);
//     const sortedMessages = sortMessages(roomMessages);
//     socket.emit('room-messages', sortedMessages)
//   })

// })


// if(!isProduction) { // need to add back in this check
//     app.use(cors());
// }

app.use(
    csurf({
      cookie: {
        secure: isProduction,
        sameSite: isProduction && "Lax",
        httpOnly: true
      }
    })
);

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
