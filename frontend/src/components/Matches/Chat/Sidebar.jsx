import { useContext, useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import {socket, ChatContext} from '../../../context/chatContext';
import './Sidebar.css'

function Sidebar (props) {
  const user = useSelector(state => state.session.user ? state.session.user : null);
  const { setMembers, members, currentRoom, setCurrentRoom, setCurrentRoomName, currentRoomName } = useContext(ChatContext);
  const [storeRoom, setStoreRoom] = useState('');

  useEffect(() => {
    socket.emit("new-user");
    socket.off("new-user").on("new-user", (users) => {
      // setCurrentRoom(storeRoom);
      // socket.emit('join-room', currentRoom);
      setMembers(users);
    });
  }, []); //used to have storeRoom

  const makeRoomName = (name1, name2) => {
    return name1 < name2 ? name1 + "-" + name2 : name2 + "-" + name1
  }

  // useEffect(()=> {
  //   const retrievedRoom = localStorage.getItem('currentRoom')
  //   localStorage.removeItem('currentRoom')
  //   const retrievedRoomName = localStorage.getItem('currentRoomName')
  //   localStorage.removeItem('currentRoomName')
  //   setCurrentRoomName(retrievedRoomName)
  //   setCurrentRoom(retrievedRoom);
  //   setStoreRoom(retrievedRoom);
  //   socket.emit('join-room', retrievedRoom);
  // }, [] )

  const joinRoom = (e, isPublic = true) => {
    e.preventDefault()
    // console.log("chat button", e.target)
    const memberId = (e.currentTarget.id);
    const userId = (user._id);
    const roomName = makeRoomName(userId, memberId);
    const currRoomName = e.currentTarget.classList[0];
    setCurrentRoomName(currRoomName);
    localStorage.setItem('currentRoom', roomName);
    localStorage.setItem('currentRoomName',currRoomName)
    socket.emit('join-room', roomName);

    const selectedCard = e.target.parentElement.parentElement.parentElement.parentElement
    const allCards =  e.target.parentElement.parentElement.parentElement.parentElement.parentElement.children
    for (let i=0; i < allCards.length; i++) {
      allCards[i].classList.remove("selected-chat-card")
    }
    selectedCard.classList.add("selected-chat-card")


  };

  const membersList = Object.values(members).map((member, i) =>
  {
    if(props.userId != member._id) return null;
    if(user.likes.includes(member._id) && user.likers.includes(member._id)){
    return <li key={i}
    id={member._id}
    className={`${member.name} chat-button`}
    onClick={joinRoom}>Chat
    </li>
    };
    return null;
    }
  )

  return (
    <>
      {/* <h2>Available Matches</h2> */}
      {/* <p>{props.userId}</p> */}
      <div>{membersList}</div>
    </>
  )
}

export default Sidebar;