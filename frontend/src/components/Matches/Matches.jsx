import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUser, fetchUsers } from '../../store/users';
import UserCard from '../UserCard/UserCard';
import './Matches.css';

function Matches () {
    const [filter, setFilter] = useState('all');
    const dispatch = useDispatch()

    // to fetchUsers() as preferences
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
        <div className="matches-container">
            <h2>{sessionUser.name}'s Matches</h2>
            <div className="matches-left">
                <form className="page-filter">
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
                </form>
                {users[0] && users.map((user) => {
                    if (('all' === filter || user.horoscope.sun.Sign.key === filter) && (sessionUser.likes.includes(user._id) && sessionUser.likers.includes(user._id))){
                        return <UserCard id={user._id} />
                    }
                })}
            </div>
            <div className="matches-right"></div>
        </div>
    )
}

export default Matches;
