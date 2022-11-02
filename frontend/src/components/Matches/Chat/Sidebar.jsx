import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {socket, ChatContext} from '../../../context/chatContext';

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
  }, [storeRoom, currentRoom, setCurrentRoom, setMembers]);

  const joinRoom = (e, isPublic = true) => {
    const room = String(e.target.id);
    setCurrentRoom(room);
    setStoreRoom(room);
    socket.emit('join-room', room);
  };

  const membersList = Object.values(members).map((member, i) =>
  {if(user.likes.includes(member._id) && user.likers.includes(member._id)){
    return <li key={i}
    id={member.name}
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