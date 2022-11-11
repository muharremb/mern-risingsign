import { useDispatch, useSelector} from 'react-redux';
import { useState, useEffect } from 'react';
import './NewProfilePicForm.css';
import Button from '../../Button/Button';
import { uploadPic } from '../../../store/users';
import { Redirect, useHistory } from 'react-router-dom';

const NewProfilePicForm = () => {
   const currentUser = useSelector(state => state.session.user ? state.session.user : null);
   const [ preview, setPreview ] = useState(null);
   const [ pic, setPic ] = useState(null);
   const dispatch = useDispatch();
   const history = useHistory();

   useEffect(() => {      
      if (!pic) {
        setPreview(null)
        return
      }             //sets the preview of the picture
      const previewUrl = URL.createObjectURL(pic)
      setPreview(previewUrl)
  
      return () => URL.revokeObjectURL(previewUrl)
   }, [pic])

   const hiddenClick = () => {
      document.getElementById('hidden-input').click();
   }

   const handlePreview = e => {
      setPreview(e.currentTarget.files[0])
   }

   const handleSubmit = e => {
      e.preventDefault();

      if (pic) {
         dispatch(uploadPic({
            pic,
            uploaderId: currentUser._id,
            isProfile: true
         }));
      }
      history.push("/discover");
   }

   return (
      <>
      <form id='new-profile-pic-form'></form>
      <div className='new-profile-pic'>
         <div className='new-profile-pic-upper'>
            <div className='name-display'>
               <p>{currentUser.name.charAt(0).toUpperCase() + currentUser.name.slice(1).toLowerCase()}</p>
            </div>

            <div className='birth-info-display'>
               <p>{currentUser.birthDateTime}</p>
               
            </div>

            <div className='email-display'>
               <p>{currentUser.email}</p>
            </div>

            <div className='picture-upload-container'>
               <input className='hidden-input' id='hidden-input' onChange={e => setPic(e.target.files[0])} type="file" style={{display: "none"}}/>
               <div className='picture-input' id='picture-input'>
                  <Button text="choose file" type={"button"} handleClick={hiddenClick}/>
                  <input className='file-text' onChange={e => handlePreview(e)} value={pic ? `${pic.name}` : ""}></input>
               </div>
               <label htmlFor='picture-input'>{ pic ? "" : "upload a picture or continue"}</label>
               </div>

            {preview && <div className='preview-frame'>
               <img className="picture-preview" src={preview} alt=""></img>
            </div>}
         </div>
         
      </div>
      <div className='signup-button-container'>
        <Button htmlFor="" type={"submit"} handleClick={handleSubmit} text="Continue"/>
      </div>
      </>
   )
}

export default NewProfilePicForm;