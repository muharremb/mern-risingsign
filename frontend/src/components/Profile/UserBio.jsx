import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateBio } from '../../store/users';
import './UserBio.css'

function UserBio ({user}) {

    const dispatch = useDispatch();

    const [editing, setEditing] = useState(false);
    const [userBio, setUserBio] = useState(user.bio || "");

  const editBio = e => {
    e.preventDefault();
    setUserBio(e.target.value);
  }

  const handleCancel = (e) => {
    e.preventDefault();
    setEditing(false);
  }

  const handleUpdate = (e) => {
    e.preventDefault();
    setUserBio(e.target.value);
    dispatch(updateBio(user._id, userBio))
    setEditing(false);
  }

  const startUpdate = (e) => {
    e.preventDefault();
    setEditing(true);
  }


  return (
    <div className='user-bio'>
        {/* Display Box */}
        {!editing &&
        <>
            <div className="user-bio">
                <span>About Me</span><br/>
                {user.bio || 'Nothing yet!'}
                <button onClick={startUpdate}>Edit Bio</button>
            </div>
        </>
        }


        {/* Editing Box */}
        {editing &&
        <form className="user-bio-editor" id="user-bio-editor">
            <textarea className="user-bio-edit" id="user-bio-edit" onChange={editBio} rows="5" cols="42" maxLength="200" value={userBio}>
            </textarea>
            <input type="button" value="Update" onClick={handleUpdate}/>
            <input type="button" value="Cancel" onClick={handleCancel}/>
        </form>
        }
    </div>
  )
}

export default UserBio;