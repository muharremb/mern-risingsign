import { io } from 'socket.io-client';
import { createContext } from 'react';

const ENDPT = "http://localhost:5000" //is this correct/?

export const socket = io(ENDPT)

export const ChatContext = createContext();