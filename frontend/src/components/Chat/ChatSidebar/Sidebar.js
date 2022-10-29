import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {socket, ChatContext} from '../../../context/chatContext';
import io from 'socket.io-client'
import './Sidebar.css'

function Sidebar () {
  const user = useSelector(state => state.session.user);

  const { setMembers, members, room, setCurrentRoom } = useContext(ChatContext)

  const userId = user ? user._id : 1;
  const [socketConnectecd, setSocketConnected] = useState(false);

  useEffect(() => {
    socket.emit("new-user")
    socket.off("new-user").on("new-user", (users) => {
      setCurrentRoom('general')
      socket.emit('join-room', 'general')
      console.log(users)
      setMembers(users)
    })
    socket.on("connection", () => setSocketConnected(true))
  }, [])

  const joinRoom = (e, isPublic = true) => {
    const room =String(e.target.id)
    setCurrentRoom(room)
    socket.emit('join-room', room)
  }

  const membersList = Object.values(members).map((member, i) => <li
  key={i} id={member.name}
  onClick={joinRoom}>{member.name}
  </li>)

  return (
    <>
      <h3>Available matches</h3>
      <ul className="matches-list">{membersList}</ul>
    </>
  )
}

export default Sidebar;