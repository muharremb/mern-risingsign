import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../UserCard/UserCard';
import { getOnePic, uploadPic } from '../../store/pics';
import UserBio from './UserBio';
import './Profile.css';
import BioPics from './BioPics';



function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [ pic, setPic ] = useState("");
  const [ bio, setBio ] = useState("");
  const [ picGrid, setPicGrid ] = useState("");

  useEffect(() => {
      // dispatch(getOnePic(currentUser._id))
  })

  const handleSubmit = e => {
    e.preventDefault();
    console.log(pic);
    dispatch(uploadPic({
      pic,
      uploaderId: currentUser._id
    }))
  }

  return (
    <>
      <div className='profile-background'></div>
      <div className='profile-page-mid'>
        <div className='profile-mid-top-buffer'></div>
        <div className='profile-mid-top'>
          <div className='profile-pic-frame'>
            <div className='profile-pic-background'></div>
            <div className='space-layer-profile'></div>
            <div className='space-layer-profile2'></div>
            <img src={currentUser.profileImageURL}></img>
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