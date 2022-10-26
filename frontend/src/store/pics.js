import jwtFetch from './jwt';

const RECEIVE_PIC = "pics/RECEIVE_PIC";

const receivePic = pic => ({
   type: RECEIVE_PIC,
   pic
})

const uploadPic = pic => async dispatch => {
   const formData = new FormData();
   formData.append()
   let res = await jwtFetch('/api/pics/upload', {
      method: 'POST',
      body: 
   })
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