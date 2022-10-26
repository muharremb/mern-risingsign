

const RECEIVE_PIC = "pics/RECEIVE_PIC";

const receivePic = pic => ({
   type: RECEIVE_PIC,
   pic
})


initialState = {
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