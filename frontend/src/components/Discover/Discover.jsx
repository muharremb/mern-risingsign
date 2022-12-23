import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import { fetchUsers } from '../../store/users';
import UserCard from '../UserCard/UserCard';
import './Discover.css';
import { useRef } from 'react';

function Discover () {
    const [sunFilter, setSunFilter] = useState('all');
    const [moonFilter, setMoonFilter] = useState('all');
    const [risingFilter, setRisingFilter] = useState('all');
    const isFetching = useRef(false);
    const userCount = useRef(0);

    const dispatch = useDispatch();

    useEffect(() => {
        document.querySelector('.display-circle').addEventListener('scroll', handleScroll);
        handleScroll();
        return () => {
            document.querySelector('.display-circle').removeEventListener('scroll', handleScroll);
        };
    }, []);


    async function fetchData() {
        await dispatch(fetchUsers({skip: userCount.current, limit: 8, likes: sessionUser.likes}));
        isFetching.current = false;
        userCount.current += 8;
    }

    const handleScroll = () => {
        if (window.innerHeight + Math.ceil(document.querySelector(".display-circle").scrollTop) < document.querySelector(".display-circle").scrollHeight || isFetching.current) {
            return;
        };
        isFetching.current = true;
        fetchData();
    }

    const fetchedUsers = useSelector(state => state.users);
    const sessionUser = useSelector(state => state.session.user);

    const users = Object.values(fetchedUsers);

    const filterSun = (e) => {
        e.preventDefault();
        setSunFilter(e.target.value);
    }

    const filterMoon = (e) => {
        e.preventDefault();
        setMoonFilter(e.target.value);
    }

    const filterRising = (e) => {
        e.preventDefault();
        setRisingFilter(e.target.value);
    }

    return (


        <div id="discover-container">
            <h1 className="heading" ></h1>
            <div id="filters">
                <form className="page-filter">
                    <label>Sun &nbsp;
                    <select id="user-feed-filter" className="user-feed-filter-dropdown" defaultValue="all" onChange={filterSun}>
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
                    </select></label>


                    <label>Moon &nbsp;
                    <select id="user-feed-filter" className="user-feed-filter-dropdown" defaultValue="all" onChange={filterMoon}>
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
                    </select></label>


                    <label>Rising &nbsp;
                    <select id="user-feed-filter" className="user-feed-filter-dropdown" defaultValue="all" onChange={filterRising}>
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
                    </select></label>
                </form>
            </div>
            <div id="user-card-container">
                {users[0] && users.map((user) => {
                    if (
                        ('all' === sunFilter || user.horoscope.sun.Sign.key === sunFilter) &&
                        ('all' === moonFilter || user.horoscope.moon.Sign.key === moonFilter) &&
                        ('all' === risingFilter || user.horoscope.rising.Sign.key === risingFilter) && user._id !== sessionUser._id &&
                        (!sessionUser.likes.includes(user._id))
                    ) {return <UserCard key={user._id} user={user}/>};
                })}
            </div>
        </div>
    )
}

export default Discover;