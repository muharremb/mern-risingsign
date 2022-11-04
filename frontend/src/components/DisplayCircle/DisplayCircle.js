import './DisplayCircle.css'
import { useLocation } from 'react-router-dom';

import LoginForm from '../SessionForms/LoginForm/LoginForm';
import SignupForm from '../SessionForms/SignupForm/SignupForm';

const DisplayCircle = () => {
   const location = useLocation();

   const renderSwitch = () => {
      switch(location.pathname) {
         case '/login':
            return <LoginForm />
            break;
         case '/signup':
            return <SignupForm />
         default:
            return null
      }
   }

   return (
      <div className='display-circle' data-page={location.pathname}>
         {renderSwitch()}
      </div>
   )
}

export default DisplayCircle;