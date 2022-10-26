function Sidebar () {
  const rooms = ['kristin', 'kirstin', 'christine'];

  const roomsList = rooms.map((room, i) => <li key={i}>{room}</li>)

  return (
    <>
      <h2>Available matches</h2>
      <ul>{roomsList}</ul>
    </>

  )
}

export default Sidebar;