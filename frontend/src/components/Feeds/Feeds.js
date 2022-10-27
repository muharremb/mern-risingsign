import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUser, fetchUsers } from '../../store/users';
import UserCard from '../UserCard/UserCard';

function Feeds () {
    // Aries, Taurus, Gemini, Cancer, Leo, Virgo, Libra, Scorpio, Sagittarius, Capricorn, Aquarius, and Pisces,
    const [sign, setSign] = useState('');
    const dispatch = useDispatch()

    // to fetchUsers() as preferences
    const criteria = {sun: "libra"};
    useEffect(() => {
        dispatch(fetchUsers(criteria));
    }, [dispatch])

    const fetchedUsers = useSelector(state => state.users);

    const users = Object.values(fetchedUsers);

    const handleSubmit = (e) => {
        e.preventDefault();
        // console.log("handleSubmit e", sun);
    }

    if (!users[0]) return null;
    // debugger;
    return (
        <>
            <h2>Users Index</h2>
            <form onSubmit={handleSubmit}>
                <legend>Choose your favorite sun sign</legend>
                    <input type="text" value={sign} onChange={(i) => setSign(i)} />
                <button type="submit">Save</button>
            </form>
            {users.map((user) => {
                return <UserCard id={user._id} />
            })}
        </>
    )
}

export default Feeds;