import './SetUserVisibilityPage.css';
import SetGenderVisibility from './SetGenderVisibility/SetGenderVisibility';
import SetSignVisibility from './SetSignVisibility/SetSignVisibility';

const SetUserVisibilityPage = () => {
   return (
      <div className='set-user-visibility-page'>
         <p>SetUserVisibilityPage</p>
         <SetGenderVisibility />
         <SetSignVisibility />

         <ContinueButton />
      </div>
   )
}

export default SetUserVisibilityPage;