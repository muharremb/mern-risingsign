import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser, likeUser } from '../../store/users';


function UserCard({id}){
    const dispatch = useDispatch();
    const sessionUser = useSelector(state => state.session.user);
    // console.log('sessionUser ', sessionUser);

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch]);

    const user = useSelector(state => state.users[id])

    const handleLikeButtonClick = (e) => {
        console.log("like button clicked by ", sessionUser._id, "to ", user._id );
        dispatch(likeUser(sessionUser._id, user._id));
    }
    
    if (!user) return null;
    if (!sessionUser) return null;

    return (
        <div style={{"border":"1px solid red", "border-radius":"8px", "padding": "8px"}}>
            <h1>{user.name}</h1><br/>
            <img style={{"maxWidth":"50px"}} src={user.profileImageURL} alt="Profile Image"/>
            <div className="user-card-sign sun-sign">
                {user.horoscope.sun.label}: {user.horoscope.sun.Sign.label}
            </div>
            <div className="user-card-sign moon-sign">
                {user.horoscope.moon.label}: {user.horoscope.moon.Sign.label}
            </div>
            <div className="user-card-sign rising-sign">
                {user.horoscope.rising.label}: {user.horoscope.rising.Sign.label}
            </div>
            {sessionUser._id !== user._id && (
                <button onClick={handleLikeButtonClick}>Like</button>
            )}
        </div>
    )
}

export default UserCard;