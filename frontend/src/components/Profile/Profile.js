import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserCard from '../UserCard/UserCard';
import { uploadPic } from '../../store/pics';
import UserBio from './UserBio';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);
  const [ pic, setPic ] = useState("");

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
      <h2>Hi {currentUser.name}, it is your profile page</h2>
      <form onSubmit={handleSubmit} encType="multipart/form-data">

        <input type="file" onChange={e => setPic(e.currentTarget.files[0])}></input>
        <input type="submit" value="submit"></input>
      </form><hr/>
      <UserBio user={currentUser} />
    </>
  )
}

export default Profile;