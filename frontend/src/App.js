import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';

import NavBar from './components/NavBar/NavBar';
import TitlePage from './components/TitlePage/TitlePage';
import Chat from './components/Matches/Chat/Chat.jsx';
import {getCurrentUser} from './store/session';
import DevButton from './components/Developers/DevButton';
import Background from './components/Background/Background';
import DisplayCircle from './components/DisplayCircle/DisplayCircle';


function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  const location = useLocation();
  const loggedIn = useSelector(state => !!state.session.user);

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
        <DisplayCircle />
        { location.pathname === "/" && <TitlePage/>}
        { loggedIn && <NavBar />}
      </div>

      { location.pathname !== "/developers" && <DevButton /> }
    

    </>
  );
}

export default App;
