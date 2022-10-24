import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Switch } from 'react-router-dom';
import { AuthRoute, ProtectedRoute } from './components/Routes/Routes';

import MainPage from './components/MainPage/MainPage';
import NavBar from './components/NavBar/NavBar';
import LoginForm from './components/SessionForms/LoginForm/LoginForm';
import SignupForm from './components/SessionForms/SignupForm/SignupForm';
import Profile from './components/Profile/Profile';
import Feeds from './components/Feeds/Feeds';
import {getCurrentUser} from './store/session';

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
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
      <ProtectedRoute exact path="/feeds" component={Feeds} />

    </Switch>
    </>
  );
}

export default App;
