import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { getCurrentUser, logout } from '../../store/session';
import { useEffect } from 'react';
import { fetchUser } from '../../store/users';


function UserCard({id}){

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch]);

    const user = useSelector(state => state.users[id])
    

    if (!user) return null;

    return (
        <div style={{"border":"1px solid red", "border-radius":"8px", "padding": "8px"}}>
            <h1>{user.name}</h1><br/>
            <img src={user.profileImageURL} alt="Profile Image"/>
            <div className="user-card-sign sun-sign">
                {user.horoscope.sun.label}: {user.horoscope.sun.Sign.label}
            </div>
            <div className="user-card-sign moon-sign">
                {user.horoscope.moon.label}: {user.horoscope.moon.Sign.label}
            </div>
            <div className="user-card-sign rising-sign">
                {user.horoscope.rising.label}: {user.horoscope.rising.Sign.label}
            </div>
        </div>
    )
}

export default UserCard;