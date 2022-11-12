import './DisplayCircle.css'
import { useLocation, Route } from 'react-router-dom';
import { useContext } from 'react';
import LoginForm from '../SessionForms/LoginForm/LoginForm';
import SignupForm from '../SessionForms/SignupForm/SignupForm';
import Profile from '../Profile/Profile.jsx';
import Discover from '../Discover/Discover';
import Chat from '../Matches/Chat/Chat';
import Matches from '../Matches/Matches';
import Developers from '../Developers/Developers'
import NewProfilePicForm from '../SessionForms/NewProfilePicForm/NewProfilePicForm';
import { AuthRoute, ProtectedRoute } from '../Routes/Routes';
import { ChatContext } from '../../context/chatContext';

const DisplayCircle = () => {
   const location = useLocation();
   const { signupLevel } = useContext(ChatContext);
   const allowOrbiter = (location.pathname === "/" || location.pathname === "/signup" || location.pathname === "/login" || location.pathname === "/newprofilepic");

   const spinSwitch = () => {
      console.log(location.pathname)
      let spinSpeed;

      switch(location.pathname) {
         case "/":
            spinSpeed = 0;
            break;
         case "/login":
            spinSpeed = 5;
            break;
         case "/signup":
            spinSpeed = signupLevel;
            break;
         case "/newprofilepic":
            spinSpeed = 4;
            break;
         default:
            spinSpeed = "nope";
      }

      return spinSpeed;
   } 
   // const authSwitch = () => {
   //    switch(location.pathname) {
   //       case '/login':
   //          return <LoginForm />
   //          break;
   //       case '/signup':
   //          return <SignupForm />
   //          break;
   //       default:
   //          return null
   //    }
   // }

   return (
      <div className='display-circle' data-page={location.pathname.split("/")[1]}>
         {allowOrbiter && <div data-spin={spinSwitch()} className='orbiter-container'>
            <div className='orbiter'></div>
         </div> }
         {/* <AuthRoute exact path={location.pathname} component={authSwitch}/> */}
         <AuthRoute exact path="/login" component={LoginForm}/>
         <AuthRoute exact path="/signup" component={SignupForm}/>

         <ProtectedRoute exact path='/discover' component={Discover}/>
         <ProtectedRoute exact path='/profile/:userId' component={Profile}/>
         <ProtectedRoute exact path='/matches' component={Matches}/>
         <ProtectedRoute exact path='/newprofilepic' component={NewProfilePicForm} />
         <Route exact path='/developers' component={Developers} />
      </div>
   )
}

export default DisplayCircle;