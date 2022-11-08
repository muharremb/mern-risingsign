import './DisplayCircle.css'
import { useLocation, Route } from 'react-router-dom';

import LoginForm from '../SessionForms/LoginForm/LoginForm';
import SignupForm from '../SessionForms/SignupForm/SignupForm';
import Profile from '../Profile/Profile';
import Discover from '../Discover/Discover';
import Chat from '../Matches/Chat/Chat';
import Matches from '../Matches/Matches';
import Developers from '../Developers/Developers';
import { AuthRoute, ProtectedRoute } from '../Routes/Routes';

const DisplayCircle = () => {
   const location = useLocation();

   const authSwitch = () => {
      switch(location.pathname) {
         case '/login':
            return <LoginForm />
            break;
         case '/signup':
            return <SignupForm />
            break;
         default:
            return null
      }
   }

   const protectedSwitch = () => {
      switch(location.pathname) {
         case '/discover':
            return <Discover />
            break;
         case '/chat':
            return <Chat />
            break;
         case '/matches':
            return <Matches />
            break;
         default:
            return null;
      }
   }

   return (
      <div className='display-circle' data-page={location.pathname.split("/")[1]}>
         <AuthRoute exact path={location.pathname} component={authSwitch}/>
         <ProtectedRoute exact path={location.pathname} component={protectedSwitch}/>
         <ProtectedRoute exact path='/profile/:userId' component={Profile} />
         <Route exact path='/developers' component={Developers} />
      </div>
   )
}

export default DisplayCircle;