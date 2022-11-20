import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useContext } from 'react';
import { fetchUser, likeUser, unmatchUser } from '../../store/users';
import Sidebar from '../Matches/Chat/Sidebar'
import {ChatContext} from '../../context/chatContext'
import './UserCard.css'



function UserCard({user}){

    const dispatch = useDispatch();

    const sessionUser = useSelector(state => state.session.user);
    const [isMatched, setIsMatched] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const {setModalProfUrl, setModalName} = useContext(ChatContext)

    useEffect(() => {

        if(sessionUser.likes.includes(user._id) && sessionUser.likers.includes(user._id)) {
            setIsLiked(true)
            setIsMatched(true);
        } else if (sessionUser.likes.includes(user._id)) {
            setIsLiked(true);
        }
    }, [dispatch, isLiked, isMatched, user._id, sessionUser]);

    const handleLikeButtonClick = (e) => {
        e.preventDefault();
        console.log("handle click is running")
        setIsLiked(true);
        // document.getElementById('matched-modal').classList.add('a')
       setModalProfUrl(user.profileImageURL)
       setModalName(user.name)
       document.getElementById('background').classList.add('bring-forward')

          if (sessionUser) document.getElementById('matched-modal').showModal();

       if(sessionUser.likers.includes(user._id)) {
               document.getElementById('background').classList.add('bring-forward')
            setIsMatched(true);
            document.getElementById('matched-modal').showModal();
        }
        dispatch(likeUser(sessionUser._id, user._id));
    }

    const handleUnmatch = async (e) => {
        e.preventDefault();
        await dispatch(unmatchUser(sessionUser._id, user._id));
        setIsLiked(false);
        setIsMatched(false);

    }

    if (!user) return null;
    if (!sessionUser) return null;


    const upFirstLetter = (str) => {
        return str[0].toUpperCase() + str.slice(1)
    }

    return (
        <Link to={`/profile/${user._id}`} className="user-card">

            <div className="user-card-flexbox">
                <div className="pic-and-name">
                    <div className="prof-pic">
                        <img src={user.profileImageURL} alt="profile"/>
                    </div>
                    <div className="user-name">
                    <p>{user.name}</p>
                 </div>

            </div>

            <div className="user-card-right">
            <div id="signs">
                <div className="user-card-sign sun-sign sign">
                    <span className="user-card-label">Sun</span> {upFirstLetter(user.horoscope.sun.Sign.key)}
                </div>
                <div className="user-card-sign moon-sign sign">
                    <span className="user-card-label">Moon</span> {upFirstLetter(user.horoscope.moon.Sign.key)}
                </div>
                <div className="user-card-sign rising-sign sign">
                    <span className="user-card-label">Rising</span> {upFirstLetter(user.horoscope.rising.Sign.key)}
                </div>
            </div>

                        {isMatched && (
                            <div>
                                <button onClick={handleUnmatch}>Unmatch</button>
                            </div>
                        )}

                        {!isMatched && isLiked && (
                            <div>You liked {user.name}</div>
                        )}

                        {!isMatched && !isLiked && sessionUser._id !== user._id && (
                            <button onClick={handleLikeButtonClick}>Like</button>
                        )}

                        {isMatched && <Sidebar userId={user._id}/>}
                </div>
            </div>


        </Link>
    )
}

export default UserCard;