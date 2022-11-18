import { useSelector } from 'react-redux'
import { useState, useContext, useEffect, useRef } from 'react'
import { ChatContext } from '../../../context/chatContext'
import './Sidebar.css'

function MessageForm () {
  const user = useSelector(state => state.session.user ? state.session.user : null);
  const userName = useSelector(state => state.session.user.name);
  const bottomRef = useRef(null)

  const [msg, setMsg] = useState('');
  const { rememberRoom, setRememberRoom, socket, messages, setMessages, currentRoom, setCurrentRoom, storeRoom, currentRoomName } = useContext(ChatContext);

  socket.off('room-messages').on('room-messages', (roomMessages) => {
    setMessages(roomMessages)
  })

  const [typing, setTyping]  = useState(false)

  const autoScroll = () => {
    const messagesEl = document.getElementById("message-box")
    messagesEl.scrollTop = messagesEl.scrollHeight
  }

  useEffect(()=>{
    autoScroll()
  }, [messages, currentRoomName])

  useEffect(()=>{
    const bottom = document.getElementById("message-field-and-button")
    bottom.scrollIntoView({behavior:'smooth'})

  }, [currentRoomName])


  //format bubbles
  useEffect(()=> {
    socket.off('bubbles').on('bubbles', () => setTyping(true))
    socket.off('stop-bubbles').on('stop-bubbles', ()=> setTyping(false) )
    autoScroll()
  }, [])

  const formatMinutes = (minutes) => {
    if (minutes < 10) return '0' + String(minutes)
    return minutes
  }

  const makeDateAndTime = () => {
    const dateObj = new Date();
    const date =(dateObj.getMonth() + 1) + '/' + dateObj.getDate() +  '/' + (dateObj.getYear() - 100);
    const time = dateObj.getHours() + ":" + formatMinutes(dateObj.getMinutes())
    return [date, time]
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    const [date, time] = makeDateAndTime();
    const hackyRoomName = localStorage.getItem("currentRoom");
    socket.emit('message-room', hackyRoomName, msg, user, time, date);
    setMsg("");
    autoScroll();
    socket.emit('stop-bubbles', hackyRoomName);
    setTyping(false);
  }

  const formatMessages = (messages) => {
    if (!messages) return
    const reactMessages = []
    for (let i=0; i<messages.length; i++) {
      reactMessages.push(<h3  className="messages-date">{messages[i]._id}</h3>)
      for (let j=0; j<messages[i].messagesByDate.length; j++){
        const daysMessages = messages[i].messagesByDate;
        if (j != daysMessages.length -1 ) {
          if (daysMessages[j].from._id === user._id) {
            reactMessages.push(<li className="chat-message you"><span className="message-time">{formatTime(messages[i].messagesByDate[j].time)} &nbsp;</span>{messages[i].messagesByDate[j].content}</li>)
          } else {
            reactMessages.push(<li className="chat-message them">{messages[i].messagesByDate[j].content} &nbsp;<span className="message-time">{formatTime(messages[i].messagesByDate[j].time)}</span></li>)
          }
        } else {
          if (messages[i].messagesByDate[j].from._id === user._id) {
            reactMessages.push(<li className="last-chat-message you"><span className="message-time">{formatTime(messages[i].messagesByDate[j].time)} &nbsp;</span>{messages[i].messagesByDate[j].content}</li>)
          } else {
            reactMessages.push(<li className="last-chat-message them">{messages[i].messagesByDate[j].content} &nbsp;<span className="message-time">{formatTime(messages[i].messagesByDate[j].time)}</span></li>)
          }
        }
      }
    }
    return reactMessages
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



  const formatTime = (time) => {
    const [hours, minutes] = time.split(":")
    if (hours == 12 || hours == 0) return 12 + ":" + minutes + "pm"
    return hours < 12 ? time + " am" : hours-12 + ":" + minutes + " pm"
  }


  return (
    <>
    <div id="message-form-container" className={!currentRoomName ? "invisible" : "visible"}>

    {user && <>
        <div className="display-messages" id="message-box">
          {/* {messagesList} */}
          {formatMessages(messages)}
          <div className="typing-bubbles">
          {typing && '. . .'}
          </div>
        </div>

        <div id="message-field-and-button"
        ref={bottomRef}
        >
        <form onSubmit={handleSubmit}
        className="message-form">
        <input
        id="message-input"
        type="text"
        placeholder="be nice"
        value={msg}
        onChange={(e) => {
          setMsg(e.target.value)
          setTyping(true)

          autoScroll();

          socket.emit('bubbles', localStorage.getItem("currentRoom") )

          if (e.target.value==="") {
            socket.emit('stop-bubbles', localStorage.getItem("currentRoom") )
            setTyping(false)
          }
        }
         }
        />
        <button type="submit">
          <i className="fa-solid fa-plane-departure"/>
        </button>
      </form>

      </div>


    </>
    }

    </div>
    </>
  )
}

export default MessageForm;