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
  const currentUser = useSelector(state => state.users[userId] ? state.users[userId] : '');
 
  const restoreUser = async () => {
    await dispatch(fetchUser(userId));
  }

  if (!currentUser){
    restoreUser();
  }
  
  const [ pic, setPic ] = useState("");

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(uploadPic({
      pic,
      uploaderId: currentUser._id,
      isProfile: false
    }))
  }


  if(!currentUser){
    return null
  }
 
  return (
    <>
      <div className='profile-container'>
        <div className='profile-mid-top-buffer'></div>
        <div className='profile-mid-top'>
          <div className='profile-pic-frame'>
            <div className='profile-pic-background'></div>
            <img src={currentUser.profileImageURL} alt="profile"></img>
          </div>
        </div>
        <div className='name-tile'>
          <h2>{currentUser.name.trim()}</h2>
        </div>
        <div className='profile-mid-bottom'>

          <BioPics user={currentUser}/>

          <form onSubmit={handleSubmit} encType="multipart/form-data">

            <input type="file" onChange={e => setPic(e.currentTarget.files[0])}></input>
            <input type="submit" value="submit"></input>
          </form>
        </div>
      </div>
    </>
    
  )
}

export default Profile;