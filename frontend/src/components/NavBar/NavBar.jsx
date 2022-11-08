import { Link }from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './NavBar.css';
import { logout } from '../../store/session';

function NavBar () {

  const loggedIn = useSelector(state => !!state.session.user);
  
  const currentUser = useSelector(state => state.session.user ? state.session.user:{});
  const loggedInPic = currentUser.profileImageURL ? currentUser.profileImageURL:null;
  
  const dispatch = useDispatch();

  const homePageRedirect = () => {
    if (!loggedIn) {
      return (
        <Link to="/" className='logo'>Rising Sign</Link>
      )
    } else {
      return (
        <div className='logo'>Rising Sign</div>
      )
    }
  }

  
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
            <Link className="profile-link" to={`/profile/${currentUser._id}`}>profile</Link>
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
  if(!currentUser) return null;

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        {homePageRedirect()}
      </div>
        { getLinks() }
      <div className='navbar-right'>
        { logoutButton() }
        <div className='logged-in-image'>
          <img hidden={loggedIn ? false : true} src={loggedInPic} alt="thumbnail"></img>
        </div>
      </div>
    </div>
  );
}

export default NavBar;