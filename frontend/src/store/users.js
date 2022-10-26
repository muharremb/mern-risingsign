import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_USER = "users/RECEIVE_USER";

const initialState = {};

const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            if(!action.currentUser) return state;
            return {...state, [action.currentUser._id]: action.currentUser};
        default:
            return state;
    }
}

export default usersReducer;