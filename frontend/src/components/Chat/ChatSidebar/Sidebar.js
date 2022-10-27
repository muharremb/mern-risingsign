import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {socket, ChatContext} from '../../../context/chatContext';
import io from 'socket.io-client'

function Sidebar () {

  // const ENDPT = "http://localhost:5000"
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

  const membersList = Object.values(members).map((member, i) => <li key={i} id={member.name} onClick={e=>setCurrentRoom(String(e.target.id))}>{member.name}</li>)



  return (
    <>
      <h2>Available matches</h2>
      <ul>{membersList}</ul>
    </>

  )
}

export default Sidebar;