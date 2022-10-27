import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
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
        <div className='link-bar'>
          <Link className="discover-link" to={'/discover'}>discover</Link>
            <Link className="profile-link" to={'/profile'}>profile</Link>
            <Link className="matches-link" to={'/matches'}>matches</Link>
          <button className="logout-button" onClick={logoutUser}>log out</button>
        </div>
      );
    } else {
      return (
        <div className='link-bar'>
          <div className="links-auth">
            <Link className="signup-link" to={'/signup'}>Signup</Link>
            <Link className="login-link" to={'/login'}>Login</Link>
          </div>
        </div>
      );
    }
  }

  return (
    <div className='navbar'>
      <h3>Rising Sign</h3>
      { getLinks() }
    </div>
  );
}

export default NavBar;