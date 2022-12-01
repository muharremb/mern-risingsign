import { io } from 'socket.io-client';
import { createContext } from 'react';

// const ENDPT = "http://localhost:5000" //is this correct/?
const ENDPT = "https://rising-sign.onrender.com/"

export const socket = io(ENDPT)

export const ChatContext = createContext();