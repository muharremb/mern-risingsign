import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { uploadPic } from '../../store/pics';
import './Profile.css';
import BioPics from './BioPics';
import { useParams } from 'react-router-dom';
import { fetchUser } from '../../store/users';

function Profile () {
  const dispatch = useDispatch();
  const {userId} = useParams();
  const user = useSelector(state => state.users[userId] ? state.users[userId] : '');

 
  const restoreUser = async () => {
    await dispatch(fetchUser(userId));
  }

  if (!user){
    restoreUser();
  }
  
  const [ pic, setPic ] = useState("");

  const picSubmit = e => {
    e.preventDefault();
    dispatch(uploadPic({
      pic,
      uploaderId: user._id,
      isProfile: false

    }))
  }


  if(!user){

    return null
  }
 
  return (
    <>
      <div className='profile-container'>
        <div className='picture'>
          <img src={user.profileImageURL} alt="profile"></img>
          <h1>{user.name.trim()}</h1>
        </div>

        <BioPics user={user}/>

        {/* <form onSubmit={picSubmit} encType="multipart/form-data">

          <input type="file" onChange={e => setPic(e.currentTarget.files[0])}></input>
          <input type="submit" value="submait"></input>
        </form> */}

      </div>
    </>
    
  )
}

export default Profile;