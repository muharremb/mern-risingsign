import { useSelector } from 'react-redux';
import jwtFetch from './jwt';

export const RECEIVE_PIC = "pics/RECEIVE_PIC";
const RECEIVE_PICS = "pics/RECEIVE_PICS"
const REMOVE_PIC = "pics/REMOVE_PIC"

export const receivePic = picData => ({
   type: RECEIVE_PIC,
   picData
})

const receivePics = picData => ({
   type: RECEIVE_PICS,
   picData
})

const removePic = picData => ({
   type: REMOVE_PIC,
   picData
})

//-----------------------------------------------------


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

}


const initialState = [];


const picReducer = (state = initialState, action) => {
   Object.freeze(state);
   let newState = [...state];

   switch(action.type) {
      case RECEIVE_PIC:
         newState[action.picData.id] = action.imageURL;
         return newState;
      case RECEIVE_PICS:
         return [ ...newState, ...action.picData];
      case REMOVE_PIC:
         delete newState[action.picData.id];
         return newState;
      default:
         return state;
   }
}

export default picReducer;