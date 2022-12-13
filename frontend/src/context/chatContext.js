import { io } from 'socket.io-client';
import { createContext } from 'react';

let ENDPT = "http://localhost:5000" //is this correct/?
if (process.env.NODE_ENV === 'production') {
  let ENDPT = 'https://rising-sign.onrender.com/'
  console.log("in production mode")

}

export const socket = io(ENDPT)

export const ChatContext = createContext();