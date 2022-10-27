import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/SessionForms/LoginForm/LoginForm';
import SignupForm from './components/SessionForms/SignupForm/SignupForm';
import Profile from './components/Profile/Profile';
import Discover from './components/Discover/Discover';
import Chat from './components/Chat/Chat';
import {getCurrentUser} from './store/session';

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
    <NavBar />
    <Switch>
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />

      <ProtectedRoute exact path="/profile" component={Profile} />
      <ProtectedRoute exact path="/discover" component={Discover} />
      <ProtectedRoute exact path="/chats" component={Chat} />

    </Switch>
    </>
  );
}

export default App;
