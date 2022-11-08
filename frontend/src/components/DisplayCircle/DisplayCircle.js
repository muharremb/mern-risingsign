import './DisplayCircle.css'
import { useLocation } from 'react-router-dom';

import LoginForm from '../SessionForms/LoginForm/LoginForm';
import SignupForm from '../SessionForms/SignupForm/SignupForm';
import Title from '../Title/Title';

const DisplayCircle = () => {
   const location = useLocation();

   const renderSwitch = () => {
      switch(location.pathname) {
         case '/login':
            return <LoginForm />
            break;
         case '/signup':
            return <SignupForm />
            break;
         case '/':
            return <Title />;
            break;
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