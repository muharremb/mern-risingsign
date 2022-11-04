import { useSelector } from 'react-redux'
import { useState, useContext } from 'react'
import { ChatContext } from '../../../context/chatContext'

function MessageForm () {


  const user = useSelector(state => state.session.user)
  const userName = useSelector(state => state.session.user.name)

  const [msg, setMsg] = useState('');
  const { socket, messages, setMessages, currentRoom } = useContext(ChatContext);

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages[0])
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    const dateObj = new Date();
    const date = dateObj.getDate();
    const time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
    socket.emit('message-room', currentRoom, msg, user, time, date);
    setMsg("")
  }

  // const [dynamicMessagesList, setDynamicMessagesList] = useState('')

  let messagesList = messages?.messagesByDate ? Object.values(messages.messagesByDate) : null;
  console.log(messagesList)
  messagesList = messagesList?.map((message, i) => <li key={i} id={message._id} className="chat-message"
  className={message.from._id === user._id ? "you" : "them"}


  >{message.content}</li>)


  return (
    <>
    {user && <>
      <h4>Chatting with {currentRoom}</h4>
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