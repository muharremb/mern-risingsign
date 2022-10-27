import './MessageForm.css'
import { useSelector } from 'react-redux'

function MessageForm () {

  const user = useSelector(state => state.session.user)
  console.log(user)

  const handleSubmit = (e) => {
    e.preventDefault( )
  }
  return (
    <>
    {user && <>
      <h1>MessageForm</h1>
      <div className="display-messages"></div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="be nice"></input>
        <button type="submit">
        <i className="fa-solid fa-plane-departure"/></button>
      </form>
    </>
    }

    </>
  )
}

export default MessageForm;