import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import NavBar from './components/NavBar/NavBar';
import Title from './components/Title/Title';
import Chat from './components/Matches/Chat/Chat.jsx';
import {getCurrentUser} from './store/session';
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

    <NavBar />
    <DevButton />
    <Switch>
      <Route exact path="/developers" component={Developers} />
      <AuthRoute exact path="/" component={MainPage} />
      <AuthRoute exact path="/login" component={LoginForm} />
      <AuthRoute exact path="/signup" component={SignupForm} />

      { location.pathname !== "/developers" && <DevButton /> }
    
    </>
  );
}

export default App;
