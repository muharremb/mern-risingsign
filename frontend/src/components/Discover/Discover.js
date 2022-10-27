import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUser, fetchUsers } from '../../store/users';
import UserCard from '../UserCard/UserCard';
import { getCurrentUser } from '../../store/session';

function Discover () {
    const [filter, setFilter] = useState('all');
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers());
    }, [])

    const fetchedUsers = useSelector(state => state.users);
    const sessionUser = useSelector(state => state.session.user);

    const users = Object.values(fetchedUsers);

    const handleFilter = (e) => {
        e.preventDefault();
        setFilter(e.target.value);
    }

    return (
        <>
            <h2>Users Index</h2>
            <form >
                <legend>Filter users by their Sun sign:</legend>
                <select id="user-feed-filter" className="user-feed-filter-dropdown" defaultValue="all" onChange={handleFilter}>
                    <option value="all">All</option>
                    <option value="aries">Aries</option>
                    <option value="taurus">Taurus</option>
                    <option value="gemini">Gemini</option>
                    <option value="cancer">Cancer</option>
                    <option value="leo">Leo</option>
                    <option value="virgo">Virgo</option>
                    <option value="libra">Libra</option>
                    <option value="scorpio">Scorpio</option>
                    <option value="sagittarius">Sagittarius</option>
                    <option value="capricorn">Capricorn</option>
                    <option value="aquarius">Aquarius</option>
                    <option value="pisces">Pisces</option>
                </select>
                {/* <button type="submit">Save</button> */}
            </form>
            {users[0] && users.map((user) => {
                if (('all' === filter || user.horoscope.sun.Sign.key === filter) && user._id !== sessionUser._id){
                    return <UserCard id={user._id} />
                }
            })}
        </>
    )
}

export default Discover;
