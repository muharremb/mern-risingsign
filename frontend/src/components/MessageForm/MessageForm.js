import './MessageForm.css'
import { useSelector } from 'react-redux'
import { useState, useContext } from 'react'
import { ChatContext } from '../../context/chatContext'

function MessageForm () {

  const user = useSelector(state => state.session.user)
  const [msg, setMsg] = useState('');
  const { socket, messages, setMessages, currentRoom } = useContext(ChatContext);

  const handleSubmit = (e) => {
    e.preventDefault( )
    const dateObj = new Date();
    const date = dateObj.getDate();
    const time = dateObj.getHours() + ":" + dateObj.getMinutes() + ":" + dateObj.getSeconds();
    console.log("sending messssaaggeeee");
    socket.emit('message-room', currentRoom, msg, user, time, date);
    setMsg("")
  }
  return (
    <>
    {user && <>
      <h1>MessageForm</h1>
      <div className="display-messages">{currentRoom}</div>
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