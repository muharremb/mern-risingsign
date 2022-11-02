import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUser, likeUser, unmatchUser } from '../../store/users';
import './UserCard.css'

function UserCard({id}){
    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const user = useSelector(state => state.users[id])
    const [isMatched, setIsMatched] = useState(false);
    const [isLiked, setIsLiked] = useState(false);

    useEffect(() => {
        dispatch(fetchUser(id));
    }, [dispatch, id]);

    useEffect(() => {
        if(sessionUser.likes.includes(id) && sessionUser.likers.includes(id)) {
            setIsLiked(true)
            setIsMatched(true);
        } else if (sessionUser.likes.includes(id)) {
            setIsLiked(true);
        }
    }, [dispatch, isLiked, isMatched, id, sessionUser]);

    const handleLikeButtonClick = (e) => {
        e.preventDefault();
        setIsLiked(true);
        if(sessionUser.likers.includes(id)) {
            setIsMatched(true);
        }
        dispatch(likeUser(sessionUser._id, user._id));
    }

    const handleUnmatch = async (e) => {
        await dispatch(unmatchUser(sessionUser._id, user._id));        
        setIsLiked(false);
        setIsMatched(false);
        
    }
    
    if (!user) return null;
    if (!sessionUser) return null;

    return (

        <Link to={`/profile/${user._id}`} className="user-card">
            <div className="user-card-left">
                <h1>{user.name}</h1><br/>
                <img style={{"maxWidth":"50px"}} src={user.profileImageURL} alt="profile"/>
            </div>
            <div className="user-card-right">
                <div className="user-card-sign sun-sign">
                    <span className="user-card-label">{user.horoscope.sun.label}:</span> {user.horoscope.sun.Sign.key}
                </div>
                <div className="user-card-sign moon-sign">
                    <span className="user-card-label">{user.horoscope.moon.label}:</span> {user.horoscope.moon.Sign.key}
                </div>
                <div className="user-card-sign rising-sign">
                    <span className="user-card-label">{user.horoscope.rising.label}:</span> {user.horoscope.rising.Sign.key}
                </div>
                {isMatched && (
                    <div>MATCHED
                        <button onClick={handleUnmatch}>Unmatch</button>
                    </div>
                )}

                {!isMatched && isLiked && (
                    <div>You liked {user.name}</div>
                )}
                {!isMatched && !isLiked && sessionUser._id !== user._id && (
                    <button onClick={handleLikeButtonClick}>Like</button>
                )}
                </div>
            </Link>
    )
}

export default UserCard;