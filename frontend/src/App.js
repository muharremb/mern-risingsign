import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/SessionForms/LoginForm/LoginForm';
import SignupForm from './components/SessionForms/SignupForm/SignupForm';
import Profile from './components/Profile/Profile';
import Discover from './components/Discover/Discover';
import Chat from './components/Matches/Chat/Chat.jsx';
import {getCurrentUser} from './store/session';
import Matches from './components/Matches/Matches';
import Developers from './components/Developers/Developers';
import DevButton from './components/Developers/DevButton';
import Background from './components/Background/Background';
import DisplayCircle from './components/DisplayCircle/DisplayCircle';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  const loadPage = () => {
    const html = document.documentElement;
    const loading = 'loading-map';
    html.classList.add(loading);
    window.addEventListener('load', () => {
      setTimeout(() => {
        html.classList.remove(loading)
      }, 1500)
    })
  }

  loadPage();

  useEffect(() => {
    dispatch(getCurrentUser()).then(() => setLoaded(true));
  }, [dispatch]);

  return loaded && (
    <>
    <Background />

    <div className='clear-box'>
      <Switch>
        <Route exact path="/developers" component={Developers} />
        {/* <AuthRoute exact path="/" component={DisplayCircle} /> */}
        {/* <AuthRoute exact path="/login" component={} /> */}
        {/* <AuthRoute exact path="/signup" component={DisplayCircle} /> */}

        <ProtectedRoute exact path="/profile/:userId" component={Profile} />
        <ProtectedRoute exact path="/discover" component={Discover} />
        <ProtectedRoute exact path="/chat" component={Chat} />
        <ProtectedRoute exact path="/matches" component={Matches} />
      </Switch>
      <DisplayCircle />
      <NavBar />
    </div>

    <DevButton />
    
    </>
  );
}

export default App;
