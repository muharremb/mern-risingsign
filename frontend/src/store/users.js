import jwtFetch from './jwt';

const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_USER = "users/RECEIVE_USER";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`api/users/${userId}`);
    const user = await res.json();
    dispatch(receiveUser(user));
    // try {
    //     const res = await jwtFetch(`api/users/${userId}`);
    //     const user = await res.json();
    //     dispatch(receiveUser(user));
    // } catch(err) {
    //     const res = await err.json()
    //     if (res.statusCode === 400) {
    //         return dispatch(receiveErrors(res.errors))
    //     }
    // }
}

const initialState = {};



const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case RECEIVE_CURRENT_USER:
            if(!action.currentUser) return state;
            return {...state, [action.currentUser._id]: action.currentUser};
        case RECEIVE_USER:
            if(!action.user) return state;
            return {...state, [action.user._id]: action.user}
        default:
            return state;
    }
}

export default usersReducer;