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

export const updateBio = (userId, bio) => async dispatch => {
    const reqBody = {
        bio
    }

    const res = await jwtFetch(`api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(reqBody)
    })

    const user = await res.json();
    dispatch(receiveUser(user));
    dispatch(receiveCurrentUser(user));
}

export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`api/users/${userId}`);
    const user = await res.json();
    dispatch(receiveUser(user));
}

export const fetchUsers = (preferences) => async dispatch => {
    const preferenceParams = new URLSearchParams(preferences);

    if(!preferences){
        const res = await jwtFetch(`api/users/index`);
        const users = await res.json();
        dispatch(receiveUsers(users));
    } else {
        const res = await jwtFetch(`api/users/index?${preferenceParams}`);
        const data = await res.json();
        dispatch(receiveUsers(data));
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