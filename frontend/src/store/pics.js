import { useSelector } from 'react-redux';
import jwtFetch from './jwt';

const RECEIVE_PIC = "pics/RECEIVE_PIC";

const receivePic = picData => ({
   type: RECEIVE_PIC,
   picData
})

// const handleFile = e => {
//    const file = e.currentTarget.files[0];
//    setVideoFile(file);
// }

// const handleUpload = () => {
//    const file = e.target
// }

export const uploadPic = picData => async dispatch => {
   const { pic, uploaderId } = picData
   console.log(uploaderId, picData, pic);
   const formData = new FormData();
   formData.append("image-upload", pic)
   formData.append("uploaderId", uploaderId)

   for (let key in formData.entries()) {
      console.log()
   }

   let res = await jwtFetch('/api/pics/upload', {
      method: 'POST',
      body: formData
   })

   let data = await res.json();

   console.log('upload pic data; ', data)
   // try {


   //    formData.append("image-upload", pic);
   //    console.log(formData)

   //    const res = await jwtFetch('/api/pics/upload', {
   //       method: "POST",
   //       body: formData
   //    })

   //    const data = await res.json()
   //    console.log(data);

   // } catch(err) {
   //    console.log(err)
   // }
}


const initialState = {
   pics: []
}

const picReducer = (state = initialState, action) => {
   Object.freeze(state);
   let newState = [...state];

   switch(action.type) {
      case RECEIVE_PIC:
         newState[action.pic.id] = action.pic;
         return newState;
      default:
         return state;
   }
}

export default picReducer;