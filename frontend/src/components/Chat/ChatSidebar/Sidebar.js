import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { ChatContext } from '../../context/chatContext'
import io from 'socket.io-client'

function Sidebar () {

  const ENDPOINT = "http://localhost:5000"
  const user = useSelector(state => state.session.user)
  const [socketConnectecd, setSocketConnected] = useState(false)

  let socket, selectedChat;

  useEffect(() => {
    console.log("I'm using an effect")
    socket = io(ENDPOINT)
    socket.emit("setup", user._id)
    socket.on("connection", () => setSocketConnected(true))



  })

  const rooms = ['kristin', 'kirstin', 'christine'];
  const roomsList = rooms.map((room, i) => <li key={i}>{room}</li>)



  return (
    <>
      <h2>Available matches</h2>
      <ul>{roomsList}</ul>
    </>

  )
}

export default Sidebar;