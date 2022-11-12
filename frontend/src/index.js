import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import configureStore from './store/store';
import { ChatContext, socket } from './context/chatContext'
import { useState } from 'react'
import * as picActions from './store/pics';
import jwtFetch from './store/jwt';


const initialState = {}

let store = configureStore(initialState);

window.jwtFetch = jwtFetch;

function Root() {
  //chat stuff sorry everyone we can refactor
  const [rooms, setRooms] = useState([]);
  const [currentRoom, setCurrentRoom] = useState('');
  const [members, setMembers] = useState([]);
  const [messages, setMessages] = useState([]);
  const [privateMsg, setPrivateMsg] = useState({});
  const [newMsgs, setNewMsgs] = useState([]);
  const [currentRoomName, setCurrentRoomName] = useState('');
  // const [ picSent, setPicSent ] = useState(false);


  return (
    <Provider store={store}>
      <ChatContext.Provider value={{ socket, rooms, setRooms, currentRoom, setCurrentRoom, members, setMembers, messages, setMessages, privateMsg, setPrivateMsg, newMsgs, setNewMsgs, currentRoomName, setCurrentRoomName }}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </ChatContext.Provider>
    </Provider>
  );
}

ReactDOM.render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
  document.getElementById('root')
);