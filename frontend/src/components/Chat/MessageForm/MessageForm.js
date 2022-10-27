import './MessageForm.css'

function MessageForm () {

  const handleSubmit = (e) => {
    e.preventDefault( )
  }
  return (
    <>
      <h1>MessageForm</h1>
      <div className="display-messages"></div>
      <form onSubmit={handleSubmit}>
        <input type="text" placeholder="be nice"></input>
        <button type="submit">
        <i className="fa-solid fa-plane-departure"/></button>

      </form>

    </>
  )
}

export default MessageForm;