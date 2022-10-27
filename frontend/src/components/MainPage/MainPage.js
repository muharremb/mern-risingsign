import { useState } from 'react';
import './MainPage.css';
import SignupForm from '../SessionForms/SignupForm/SignupForm';

function MainPage() {
  const [ page, setPage ] = useState("MainPage");

  switch (page) {
    case "SignupForm":

  }

    return (
      <>
        <p>Rising Sign MainPage Component</p>
        <footer>
          Copyright &copy; 2022
        </footer>
      </>
    );
  }
  
  export default MainPage;