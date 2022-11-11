import { useDispatch, useSelector} from 'react-redux';
import { useState, useEffect, useContext } from 'react';
import './NewProfilePicForm.css';
import Button from '../../Button/Button';
import { uploadPic } from '../../../store/users';
import { Redirect, useHistory } from 'react-router-dom';
import { ChatContext } from '../../../context/chatContext';


const NewProfilePicForm = () => {
   const currentUser = useSelector(state => state.session.user ? state.session.user : null);
   const [ preview, setPreview ] = useState(null);
   const [ pic, setPic ] = useState(null);
   // const [ picSent, setPicSent ] = useState(false);
   const dispatch = useDispatch();
   const history = useHistory();
   const { picSent, setPicSent } = useContext(ChatContext);

   const formattedBirthday = () => {
      const birthInfo = currentUser.birthDateTime;
      const date = birthInfo.slice(0, 10).split("-");
      const formattedDate = date[1] + "/" + date[2] + "/" + date[0];
      const time = birthInfo.slice(11, 16).split(":");
      let amOrPm;

      if (parseInt(time[0]) < 12) {
         amOrPm = " AM";
      } else {
         amOrPm = " PM";
      }

      let hour;

      if (parseInt(time[0]) % 12 === 0) {
         hour = '12';
      } else {
         hour = parseInt(time[0] % 12);
      }

      const formattedTime = hour + ":" + time[1] + amOrPm;

      return formattedDate + ' ' + formattedTime;
   }

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

   // const triggerNavRender = setTimeout(() => {
   //    setPicSent(true);
   //    console.log("running timeout");
   // }, 1000)



   const handleSubmit = async e => {
      e.preventDefault();

      if (pic) {
         dispatch(uploadPic({
            pic,
            uploaderId: currentUser._id,
            isProfile: true
         }));
      }
      // setTimeout(() => {
      //    console.log("running set timeout in 1 sec")
      //    setPicSent(true);
      // }, 3000)

      // setTimeout(() => {
      //    history.push("/discover");
      //    console.log("second timeout")
      // }, 2000)

      history.push("/discover");
      // triggerNavRender();

      
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
               <p>{formattedBirthday()}</p>
               
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
         <div className='signup-button-container'>
            <Button htmlFor="new-profile-pic-form" type={"submit"} handleClick={handleSubmit} text="Continue"/>
         </div>
      </div>
      
      </>
   )
}

export default NewProfilePicForm;