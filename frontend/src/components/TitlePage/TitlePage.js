import './TitlePage.css';
import { Link } from 'react-router-dom';

const Title = () => {
   return (
      <>
         <p className='title'>Rising Sign</p>
         <div className='entrance-links'>
            <Link className="signup-link" to={'/signup'}>Signup</Link>
            <Link className="login-link" to={'/login'}>Login</Link>
         </div>
      </>
      
   )
}

export default Title;