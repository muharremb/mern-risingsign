import Sidebar from './ChatSidebar/Sidebar'
import MessageForm from './MessageForm/MessageForm'
import './Chat.css';

function Chat () {

  return (
    <div id="chat">
      <Sidebar/>
      <MessageForm/>
    </div>
  )
}


export default Chat;