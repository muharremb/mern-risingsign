import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { getCurrentUser, logout } from '../../store/session';
import { useEffect } from 'react';

function NavBar () {
  const loggedIn = useSelector(state => !!state.session.user);
  const loggedInPic = useSelector(state => state.session.user.profileImageURL);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);
  
  const logoutUser = e => {
      e.preventDefault();
      dispatch(logout());
  }

  const logoutButton = () => {
    if (loggedIn) {
      return (
        <input type="button" className="logout-button" onClick={logoutUser} value="Log Out"></input>
      )
    }
  }

  const getLinks = () => {
    if (loggedIn) {
      return (
        <div className='navbar-mid'>
          <Link className="discover-link" to={'/discover'}>discover</Link>
            <Link className="profile-link" to={'/profile'}>profile</Link>
            <Link className="matches-link" to={'/matches'}>matches</Link>
        </div>
      );
    } else {
      return (
        <div className='navbar-mid'>
          <Link className="signup-link" to={'/signup'}>Signup</Link>
          <Link className="login-link" to={'/login'}>Login</Link>
        </div>
      );
    }
  }

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <div className='logo'>Rising Sign</div>
      </div>
        { getLinks() }
      <div className='navbar-right'>
        { logoutButton() }
        <div className='logged-in-image'>
          <img src={loggedIn ? loggedInPic : ""}></img>
        </div>
      </div>
    </div>
  );
}

export default NavBar;