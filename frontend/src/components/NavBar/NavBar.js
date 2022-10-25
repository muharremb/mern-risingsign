import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
// import './NavBar.css';
import { getCurrentUser, logout } from '../../store/session';
import { useEffect } from 'react';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className="links-nav">
          <Link to={'/feeds'}>Feeds Link</Link>
          <Link to={'/profile'}>Profile</Link>
          <button onClick={logoutUser}>Logout</button>
        </div>
      );
    } else {
      return (
        <div className="links-auth">
          <Link to={'/signup'}>Signup</Link>
          <Link to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <>
      <h1>Rising Sign NavBar</h1>
      { getLinks() }
    </>
  );
}

export default NavBar;