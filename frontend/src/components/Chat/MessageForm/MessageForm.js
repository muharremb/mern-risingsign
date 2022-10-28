import './MessageForm.css'
import { useSelector } from 'react-redux'
import { useState, useContext, useEffect } from 'react'
import { ChatContext } from '../../../context/chatContext'

function MessageForm () {

  const user = useSelector(state => state.session.user)
  const [msg, setMsg] = useState('');
  const { socket, messages, setMessages, currentRoom } = useContext(ChatContext);


  socket.off('room-messages').on('room-messages', (roomMessages) => {
    console.log("room messages bitch")
    console.log(roomMessages[0])
    console.log("room messages bitch")
    setMessages(roomMessages[0])
  })

  const handleSubmit = (e) => {
    e.preventDefault( )
    const dateObj = new Date();
    const date = dateObj.getDate();
    const time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
    socket.emit('message-room', currentRoom, msg, user, time, date);
    setMsg("")
  }

  useEffect(() => {
    
  })


  const messagesList = Object.values(messages?.messagesByDate).map((message, i) => <li key={i} id={message._id} className="chat-message">{message.content}</li>)



  return (
    <>
    {user && <>
      <h5>{currentRoom}</h5>
      <div className="display-messages">
        {messagesList ? messagesList : ["hi babe"]}
      <div>
      </div></div>
      <form onSubmit={handleSubmit}>
        <input type="text"
        placeholder="be nice"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}

        ></input>
        <button type="submit">
        <i className="fa-solid fa-plane-departure"/></button>
      </form>
    </>
    }

    </>
  )
}

export default MessageForm;