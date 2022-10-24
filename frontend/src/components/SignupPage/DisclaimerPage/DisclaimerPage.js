import './DisclaimerPage.css';
import ContinueButton from '../ContinueButton/ContinueButton';

const DisclaimerPage = () => {
   const buttonText = "I Agree";

   return (
      <div className='disclaimer-page'>
         <p>DisclaimerPage</p>
         <ContinueButton text={buttonText}/>
      </div>
   )
}

export default DisclaimerPage;