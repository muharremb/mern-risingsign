import jwtFetch from './jwt';
import { receiveCurrentUser } from './session';


const RECEIVE_USER = "users/RECEIVE_USER";
const RECEIVE_USERS = "users/RECEIVE_USERS";
const CLEAR_ALL_USERS = "user/CLEAR_ALL_USERS";
// const RECEIVE_PIC = "pics/RECEIVE_PIC";
// const RECEIVE_PROF_PIC = "pics/RECEIVE_PROF_PIC";

const receiveUser = (user) => ({
    type: RECEIVE_USER,
    user
})

const receiveUsers = (users) => ({
    type: RECEIVE_USERS,
    users
})

const clearUsers = () => ({
    type: CLEAR_ALL_USERS
})

// const receivePic = picData => ({
//     type: RECEIVE_PIC,
//     picData
// })

// const receiveProfPic = picData => ({
//     type: RECEIVE_PROF_PIC,
//     picData
// })

export const uploadPic = picData => async dispatch => {
    const { pic, uploaderId, isProfile } = picData
    const formData = new FormData();
    formData.append("image-upload", pic)
    formData.append("uploaderId", uploaderId)
    formData.append("isProfile", isProfile)
 
 
    const res = await jwtFetch('/api/pics/upload', {
       method: 'POST',
       body: formData
    })
    
    let data = await res.json();
 
    return dispatch(receiveCurrentUser(data));
}

export const updateBio = (userId, bio) => async dispatch => {
    const reqBody = {
        bio
    }

    const res = await jwtFetch(`/api/users/${userId}`, {
        method: "PATCH",
        body: JSON.stringify(reqBody)
    })

    const user = await res.json();
    dispatch(receiveUser(user));
    dispatch(receiveCurrentUser(user));
}

export const fetchUser = (userId) => async dispatch => {
    const res = await jwtFetch(`/api/users/${userId}`);
    const user = await res.json();
    dispatch(receiveUser(user));
}

export const fetchUsers = (options) => async dispatch => {
    const optionsParams = new URLSearchParams(options);
    let res;
    if(!options){
        res = await jwtFetch(`/api/users/index`);
    } else {
        res = await jwtFetch(`/api/users/index?${optionsParams}`);
    }
    const users = await res.json();
    dispatch(receiveUsers(users));
}

export const clearAllUsers = () => dispatch => {
    dispatch(clearUsers());
}

export const likeUser = (likerId, likeeId) => async dispatch => {
    const reqBody = {
        liker: likerId,
        likee: likeeId
    };

    const res = await jwtFetch('/api/users/likes', {
        method: "POST",
        body: JSON.stringify(reqBody)
    });

    const {liker} = await res.json();
    dispatch(receiveUser(liker));
    dispatch(receiveCurrentUser(liker));
} 
export const unmatchUser = (likerId, likeeId) => async dispatch => {
    const reqBody = {
        liker: likerId,
        likee: likeeId
    };

    const res = await jwtFetch('/api/users/unlikes', {
        method: "POST",
        body: JSON.stringify(reqBody)
    });

    const {liker} = await res.json();
    dispatch(receiveUser(liker));
    dispatch(receiveCurrentUser(liker));
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
        case CLEAR_ALL_USERS:
            return initialState;
        default:
            return state;
    }
}

export default usersReducer;