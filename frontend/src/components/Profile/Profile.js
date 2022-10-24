import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

function Profile () {
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user);

  return (
    <>
        <h2>Hi {currentUser.name}, it is your profile page</h2>
    </>
  )
//   const userTweets = useSelector(state => Object.values(state.tweets.user))
  
//   useEffect(() => {
//     dispatch(fetchUserTweets(currentUser._id));
//     return () => dispatch(clearTweetErrors());
//   }, [currentUser, dispatch]);

//   if (userTweets.length === 0) {
//     return <div>{currentUser.username} has no Tweets</div>;
//   } else {
//     return (
//       <>
//         <h2>All of {currentUser.username}'s Tweets</h2>
//         {userTweets.map(tweet => (
//           <TweetBox
//             key={tweet._id}
//             text={tweet.text}
//           />
//         ))}
//       </>
//     );
//   }
}

export default Profile;