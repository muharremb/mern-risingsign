import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateBio } from '../../store/users';
import './UserBio.css'

function UserBio ({user}) {

    const dispatch = useDispatch();

    const canEdit = useSelector(state => state.session.user._id) === user._id;

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
    setUserBio(document.querySelector('#user-bio-edit').value);
    dispatch(updateBio(user._id, userBio));
    setEditing(false);
  }

  const startUpdate = (e) => {
    e.preventDefault();
    setEditing(true);
  }


  return (
    <div className='user-bio'>
      <div className='profile-buttons'>
        <div className='profile-button-row'>
          
        </div>
      </div>

        {!editing &&
        <>
            <div className="user-bio">
                <span>About Me</span><br/>
                {user.bio || 'Nothing yet!'}
                {canEdit && 
                <button onClick={startUpdate}>Edit Bio</button>}
            </div>
        </>
        }

        {editing &&
        <form className="user-bio-editor" id="user-bio-editor">
            <textarea className="user-bio-edit" id="user-bio-edit" onChange={editBio} rows="5" cols="42" maxLength="200" value={userBio}>
            </textarea>
            <button onClick={handleUpdate}>Update</button>
            <button onClick={handleCancel}>Cancel</button>
        </form>
        }
    </div>
  )
}

export default UserBio;