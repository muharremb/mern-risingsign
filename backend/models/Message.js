const mongoose = require('mongoose')

//source: https://www.youtube.com/watch?v=qdZYHbg72WQ&t=11784s

const MessageSchema = new mongoose.Schema({
  content: String,
  from: Object,
  socketid: String,
  time: String,
  date: String,
  to: String
})

const Message = mongoose.model('Message', MessageSchema);

module.exports = Message;