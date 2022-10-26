import jwtFetch from './jwt';
import { receiveCurrentUser } from './session';


const RECEIVE_CURRENT_USER = "session/RECEIVE_CURRENT_USER";
const RECEIVE_USER = "users/RECEIVE_USER";
const RECEIVE_USERS = "users/RECEIVE_USERS";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
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

export const fetchUsers = (preferences) => async dispatch => {
    if(!preferences){
        const res = await jwtFetch(`api/users/index`);
        const users = await res.json();
        dispatch(receiveUsers(users));
    }
}

export const likeUser = (likerId, likeeId) => async dispatch => {
    const reqBody = {
        liker: likerId,
        likee: likeeId
    };

    const res = await jwtFetch('api/users/likes', {
        method: "POST",
        body: JSON.stringify(reqBody)
    });

    const {liker} = await res.json();
    console.log('liker ', liker);
    dispatch(receiveUser(liker));
    dispatch(receiveCurrentUser(liker));
    // dispatch(receiveUser(likee));
} 

const initialState = {};



const usersReducer = (state = initialState, action) => {
    switch(action.type){
        case RECEIVE_USER:
            if(!action.user) return state;
            return {...state, [action.user._id]: action.user}
        case RECEIVE_USERS:
            if(!action.users) return state;
            let newState = {...state}
            action.users.forEach((user) =>{
                newState[user._id] = user
            });
            return newState
        default:
            return state;
    }
}

export default usersReducer;