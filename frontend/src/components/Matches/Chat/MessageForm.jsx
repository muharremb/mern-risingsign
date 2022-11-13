import { useSelector } from 'react-redux'
import { useState, useContext, useEffect } from 'react'
import { ChatContext } from '../../../context/chatContext'

function MessageForm () {
  const user = useSelector(state => state.session.user ? state.session.user : null);
  const userName = useSelector(state => state.session.user.name);

  const [msg, setMsg] = useState('');
  const { rememberRoom, setRememberRoom, socket, messages, setMessages, currentRoom, setCurrentRoom, storeRoom, currentRoomName } = useContext(ChatContext);

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    // console.log(roomMessages)
    setMessages(roomMessages[0] )
  })

  const formatMinutes = (minutes) => {
    if (minutes < 10) return '0' + String(minutes)
    return minutes
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    const dateObj = new Date();
    const date = (dateObj.getMonth() + 1) + '/' + dateObj.getDate() +  '/' + (dateObj.getYear() - 100);
    const time = dateObj.getHours() + ":" + formatMinutes(dateObj.getMinutes())
    const hackyRoomName = localStorage.getItem("currentRoom")
    console.log( `current room is called ${hackyRoomName}`)
    socket.emit('message-room', hackyRoomName, msg, user, time, date);
    setMsg("")
  }

  useEffect(()=> {
    messagesList = messages?.messagesByDate ? Object.values(messages.messagesByDate) : null;
    messagesList = messagesList?.map((message, i) => <li key={i} id={message._id} className={`chat-message ${message.from._id === user._id ? "you" : "them"}`}>{message.content}</li>)
  }, [msg])

  let messagesList = messages?.messagesByDate ? Object.values(messages.messagesByDate) : null;
  messagesList = messagesList?.map((message, i) => <li key={i} id={message._id} className={`chat-message ${message.from._id === user._id ? "you" : "them"}`}>{message.content}</li>)


  return (
    <>
    {user && <>
      <h4>Chatting with {currentRoomName}</h4>

        <div className="display-messages">
          {messagesList}
        </div>

      <form onSubmit={handleSubmit}
        className="message-form">
        <input type="text"
        placeholder="be nice"
        value={msg}
        onChange={(e) => setMsg(e.target.value)}
        />
        <button type="submit">
        <i className="fa-solid fa-plane-departure"/></button>
      </form>
    </>
    }

    </>
  )
}

export default MessageForm;