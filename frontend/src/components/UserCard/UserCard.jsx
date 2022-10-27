import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUser, likeUser } from '../../store/users';

function UserCard({id}){
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[id])
    const [isMatched, setIsMatched] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch]);

    useEffect(() => {
        if(sessionUser.likes.includes(id) && sessionUser.likers.includes(id)) {
            setIsLiked(true)
            setIsMatched(true);
        } else if (sessionUser.likes.includes(id)) {
            setIsLiked(true);
        }
    }, [dispatch, isLiked, isMatched]);

    const handleLikeButtonClick = (e) => {
        setIsLiked(true);
        if(sessionUser.likers.includes(id)) {
            setIsMatched(true);
        }
        dispatch(likeUser(sessionUser._id, user._id));
    }
    
    if (!user) return null;
    if (!sessionUser) return null;

    return (
        <div style={{"border":"1px solid red", "borderRadius":"8px", "padding": "8px"}}>
            <h1>{user.name}</h1><br/>
            <img style={{"maxWidth":"50px"}} src={user.profileImageURL} alt="Profile Image"/>
            <div className="user-card-sign sun-sign">
                {user.horoscope.sun.label}: {user.horoscope.sun.Sign.key}
            </div>
            <div className="user-card-sign moon-sign">
                {user.horoscope.moon.label}: {user.horoscope.moon.Sign.key}
            </div>
            <div className="user-card-sign rising-sign">
                {user.horoscope.rising.label}: {user.horoscope.rising.Sign.key}
            </div>
            {isMatched && (
                <div>MATCHED</div>
            )}

            {!isMatched && isLiked && (
                <div>You liked {user.name}</div>
            )}
            {!isMatched && !isLiked && sessionUser._id !== user._id && (
                <button onClick={handleLikeButtonClick}>Like</button>
            )}
        </div>
    )
}

export default UserCard;