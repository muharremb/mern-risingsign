import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {socket, ChatContext} from '../../../context/chatContext';
import './Sidebar.css'

function Sidebar () {
  const user = useSelector(state => state.session.user);
  const { setMembers, members, currentRoom, setCurrentRoom } = useContext(ChatContext)
  const [storeRoom, setStoreRoom] = useState('')

  useEffect(() => {
    socket.emit("new-user");
    socket.off("new-user").on("new-user", (users) => {
      setCurrentRoom(storeRoom);
      socket.emit('join-room', currentRoom);
      setMembers(users);
    });
  }, [storeRoom]);

  const makeRoomName = (name1, name2) => {
    return name1 < name2 ? name1 + "-" + name2 : name2 + "-" + name1
  }

  useEffect(()=> {
    const retrievedRoom = localStorage.getItem('currentRoom')
    localStorage.removeItem('current-room')
    setCurrentRoom(retrievedRoom);
    setStoreRoom(retrievedRoom);
    // console.log(`retrieved room is ${retrievedRoom}`)
    if (retrievedRoom) socket.emit('join-room', retrievedRoom);
  }, [] )

  const joinRoom = (e, isPublic = true) => {
    const memberId = (e.currentTarget.id)
    const userId = (user._id)
    const roomName = makeRoomName(userId, memberId)
    setCurrentRoom(roomName);
    setStoreRoom(roomName);
    localStorage.setItem('currentRoom', roomName)
    socket.emit('join-room', roomName);
  };

  const membersList = Object.values(members).map((member, i) =>
  {if(user.likes.includes(member._id) && user.likers.includes(member._id)){
    return <li key={i}
    id={member._id}
    onClick={joinRoom}>{member.name}</li>
    };
    return null;
  }
  )

  return (
    <>
      <h2>Available Chats</h2>
      <ul className="matches-list">{membersList}</ul>
    </>
  )
}

export default Sidebar;