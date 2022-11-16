import { useState, useEffect } from 'react';
import PicGrid from './PicGrid';
import UserBio from './UserBio';
import './BioPics.css'
import { uploadPic } from '../../store/users';
import { useDispatch, useSelector } from 'react-redux';


function BioPics ({user}) {
    // const currentUser = useSelector(state => state.session.user ? state.session.user : null);
    const dispatch = useDispatch();
    // const [ pic, setPic ] = useState("");
    const [mode, setMode] = useState('bio');

    // useEffect(() => {
    //   console.log("refreshing")
    // }, [])

    const rightClick = e => {
      e.preventDefault();
      setMode('pics');
    }

    const leftClick = e => {
      e.preventDefault();
      setMode('bio');
    }

    const handleSubmit = e => {
      e.preventDefault();
      const pic = e.target.files[0];
      // console.log(e.target.files[0]);
      // console.log("in handle submit")
      console.log(pic)
      
      if (pic) {
        console.log(e.target.files[0])
        dispatch(uploadPic({
           pic,
           uploaderId: user._id,
           isProfile: false
        }));
      }
    }

    const hiddenClick = () => {
      document.getElementById('hidden-input').click();
    }


  return (
    <div className='bio-pics-holder'>
      <div className='left-slider-button' onClick={e => leftClick(e)}>
        {mode === 'pics' && <div className='left-arrow'></div>}
      </div>
      <div className='right-slider-button' onClick={e => rightClick(e)}>
        {mode === 'bio' && <div className='right-arrow'></div>}
      </div>
      <div className='bio-pics-slider' data-mode={mode}>
        <UserBio user={user} />
        <div className='pic-side'>
          <form id='new-pic-form' encType='multipart/form-data'></form>
          <PicGrid user={user} />
          <div className='pic-side-input-container'>
               <input className='hidden-input' id='hidden-input' onChange={e => handleSubmit(e)} type="file" style={{display: "none"}}/>
               <div className='picture-input' id='picture-input'>
                  <button type="button" onClick={hiddenClick}>Add a photo</button>
                  {/* <input className='file-text' value={pic ? `${pic.name}` : ""}></input> */}
               </div>
            </div>
        </div>
      </div>
    </div>
  )
}

export default BioPics;