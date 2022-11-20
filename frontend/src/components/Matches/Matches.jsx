import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState, useRef } from 'react';
import { fetchUser, fetchUsers } from '../../store/users';
import UserCard from '../UserCard/UserCard';
import './Matches.css';
import Chat from './Chat/Chat.jsx';
import MessageForm from './Chat/MessageForm'

function Matches () {
    const [sunFilter, setSunFilter] = useState('all');
    const [moonFilter, setMoonFilter] = useState('all');
    const [risingFilter, setRisingFilter] = useState('all');
    const [matchesExist, setMatchesExist] = useState(true);
    const dispatch = useDispatch();

    // const user = useSelector(state => state.users ? state.users[userId] : '');


    useEffect(() => {
        const likes = sessionUser.likes;
        const likers = sessionUser.likers;

        const matches = likes.filter((like) => likers.includes(like));
        dispatch(fetchUsers({matches}));

        matches.length === 0 ? setMatchesExist(false) : setMatchesExist(true)
    }, [])

    const [filtersOn, setFiltersOn] = useState(false)
    const [cardsOn, setCardsOn] = useState(false)

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

    const matches = users.map((user) => {
        if (
            ('all' === sunFilter || user.horoscope.sun.Sign.key === sunFilter) &&
            ('all' === moonFilter || user.horoscope.moon.Sign.key === moonFilter) &&
            ('all' === risingFilter || user.horoscope.rising.Sign.key === risingFilter) && (sessionUser.likes.includes(user._id) && sessionUser.likers.includes(user._id))
        ) {return <UserCard  key={user._id} user={user}/>};
        return null;
    });

    const messageFormRef = useRef(null);
    // console.log(matches.every)


    return (
        <div className="matches-outer-container">

           {true && <div id="filters" style = {{ width: "100%"}}>
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
            </div>}

            {matchesExist || <h1>no matches yet</h1>  }

            <div className="matches-container">
                    {matches}
            </div>

            <div ref={messageFormRef}>
                <MessageForm />
            </div>
            <div />
            <h1 id="bottom-of-matches"> i'm the bottom</h1>

        </div>
    )
}

export default Matches;
