import { useSelector } from 'react-redux'
import { useState, useContext, useEffect } from 'react'
import { ChatContext } from '../../../context/chatContext'

function MessageForm () {
  const user = useSelector(state => state.session.user ? state.session.user : null);
  const userName = useSelector(state => state.session.user.name);

  const [msg, setMsg] = useState('');
  const { rememberRoom, setRememberRoom, socket, messages, setMessages, currentRoom, setCurrentRoom, storeRoom, currentRoomName } = useContext(ChatContext);

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages)
  })

  const [typing, setTyping] = useState(false)

  //format bubbles
  useEffect(()=> {
    socket.on('bubbles', () => setTyping(true))
    socket.on('stop-bubbles', ()=> setTyping(false) )
  }, [])

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
    socket.emit('message-room', hackyRoomName, msg, user, time, date);
    setMsg("")
    const messagesEl = document.getElementById("message-box")
    messagesEl.scrollTop = messagesEl.scrollHeight; // might need null protection?
    socket.emit('stop-bubbles', hackyRoomName)
    setTyping(false)
  }

  const formatMessages = (messages) => {
    if (!messages) return
    const reactMessages = []
    for (let i=0; i<messages.length; i++) {
      reactMessages.push(<h3>{messages[i]._id}</h3>)
      for (let j=0; j<messages[i].messagesByDate.length; j++){
        reactMessages.push(<li className={`chat-message ${messages[i].messagesByDate[j].from._id === user._id ? "you" : "them"}`}><span>{formatTime(messages[i].messagesByDate[j].time)} &nbsp;</span>{messages[i].messagesByDate[j].content}</li>)
      }
    }
    return reactMessages.reverse()
  }

  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    return hours < 12 ? time + " am" : hours-12 + ":" + minutes + " pm"
  }

  const handleChange = (e) => {
    setMsg(e.target.value)
    if (!typing) {
      setTyping(true)
      socket.emit('bubbles', localStorage.getItem("currentRoom") )
      setTimeout(() => {
        setTyping(false)
        socket.emit('stop-bubbles',localStorage.getItem("currentRoom") )
      }, 1000)
  }}

  return (
    <>
    {user && <>
      <h4>Chatting with {currentRoomName}</h4>

        <div className="display-messages" id="message-box">
          {/* {messagesList} */}
          {typing && '...'}
          {formatMessages(messages)}
        </div>

      <form onSubmit={handleSubmit}
        className="message-form">
        <input type="text"
        placeholder="be nice"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value)
          console.log('message is', msg)
          console.log(e.target.value==="")
          setTyping(true)
          socket.emit('bubbles', localStorage.getItem("currentRoom") )
          if (e.target.value==="") {
            console.log('empty message box')
            socket.emit('stop-bubbles', localStorage.getItem("currentRoom") )
            setTyping(false)
          }
      //     setTimeout(() => {
      //       socket.emit('stop-bubles', localStorage.getItem("currentRoom"))
      //     setTyping(false)
      // }, 1000)

        } }
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