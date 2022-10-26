import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { fetchUser, fetchUsers } from '../../store/users';
import UserCard from '../UserCard/UserCard';


function Feeds () {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch])

    const fetchedUsers = useSelector(state => state.users);

    const users = Object.values(fetchedUsers);

    if (!users[0]) return null;
    // debugger;
    return (
        <>
            <h2>Users Index</h2>
            {users.map((user) => {
                return <UserCard id={user._id} />
            })}
        </>
    )
}

export default Feeds;