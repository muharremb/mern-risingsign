import './TitlePage.css';
import { Link } from 'react-router-dom';

const Title = () => {
   return (
      <>
         <p className='title'>Rising Sign</p>
         <div className='entrance-links'>
            <Link className="signup-link" to={'/signup'}>Sign Up</Link>
            <Link className="login-link" to={'/login'}>Log In</Link>
         </div>
      </>
      
   )
}

export default Title;