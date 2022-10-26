import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, logout } from '../../store/session';
import { useEffect } from 'react';


function UserCard({id}){

    const user = useSelector(state => state.users[id])
    

    if (!user) return null;

    return (
        <div style={{"border":"1px solid red", "border-radius":"8px", "padding": "8px"}}>
            <h1>{user.name}</h1><br/>
            <div className="user-card-sign sun-sign">
                Sun-Sign Here
            </div>
            <div className="user-card-sign sun-sign">
                Moon-Sign Here
            </div>
            <div className="user-card-sign sun-sign">
                Rising-Sign Here
            </div>
        </div>
    )
}

export default UserCard;