import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {socket, ChatContext} from '../../../context/chatContext';
import './Sidebar.css'

function Sidebar () {
  const user = useSelector(state => state.session.user);

  const { setMembers, members, currentRoom, setCurrentRoom } = useContext(ChatContext)

  // const [socketConnected, setSocketConnected] = useState(false);

  const [storeRoom, setStoreRoom] = useState('')

  useEffect(() => {
    socket.emit("new-user")
    socket.off("new-user").on("new-user", (users) => {
      setCurrentRoom(storeRoom)
      socket.emit('join-room', currentRoom)
      setMembers(users)
    })
    // socket.on("connection", () => setSocketConnected(true))
  }, [storeRoom, currentRoom, setCurrentRoom, setMembers])

  const joinRoom = (e, isPublic = true) => {
    const room =String(e.target.id)
    setCurrentRoom(room)
    setStoreRoom(room)
    socket.emit('join-room', room)
  }

  const membersList = Object.values(members).map((member, i) =>
  {if(user.likes.includes(member._id) && user.likers.includes(member._id)){
    return <li key={i}
    id={member._id}
    onClick={joinRoom}>{member.name}</li>
    }
    return null;
  }
  )

  return (
    <>
      <h3>Available matches</h3>
      <ul className="nothing">{membersList}</ul>
    </>
  )
}

export default Sidebar;