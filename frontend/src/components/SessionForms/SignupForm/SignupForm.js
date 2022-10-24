import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContinueButton from '../ContinueButton/ContinueButton';
import './SignupForm.css';
import { signup, clearSessionErrors } from '../../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [ hidden, setHidden ] = useState(false);

  const fieldArray = ["email-and-password-input", "name-input", "birth-info-input"];
  let [ currentField, setCurrentField ] = useState(fieldArray[0]);

  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = field => {
    let setState;

    switch (field) {
      case 'email':
        setState = setEmail;
        break;
      case 'name':
        setState = setName;
        break;
      case 'password':
        setState = setPassword;
        break;
      case 'password2':
        setState = setPassword2;
        break;
      case 'birthLocation':
        setState = setBirthLocation;
        break;
      case 'birthTime':
        setState = setBirthTime;
        break;
      case 'birthDate':
        setState = setBirthDate;
        break;
    
      default:
        throw Error('Unknown field in Signup Form');
    }

    return e => {
      e.preventDefault();
      console.log(e.currentTarget.value);
      setState(e.currentTarget.value)
    };
  }

  const continueClick = e => {
    e.preventDefault();
    console.log("in continue click")
    setCurrentField(fieldArray[fieldArray.indexOf(currentField) + 1])
  }

  const userSubmit = e => {
    e.preventDefault();
    const user = {
      email,
      name,
      password,
      birthLocation,
      birthDate,
      birthTime
    };

    dispatch(signup(user)); 
  }

  return (
    <div className='signup-page'>
      <form className="signup-form" onSubmit={userSubmit}>
        <h2>Sign Up Form</h2>
        <div className="current-field">

          {currentField === "email-and-password-input" &&     //conditionally render email and password

            <div className='email-and-password-input'>
              <div className="errors">{errors?.email}</div>
              <label>
                <span>Email</span>
                <input type="text"
                  value={email}
                  onChange={update("email")}
                  placeholder="Email"
                />
              </label>
              <div className="errors">{errors?.password}</div>
              <label>
                <span>Password</span>
                <input type="password"
                  value={password}
                  onChange={update('password')}
                  placeholder="Password"
                />
              </label>
              <div className="errors">
                {password !== password2 && 'Confirm Password field must match'}
              </div>
              <label>
                <span>Confirm Password</span>
                <input type="password"
                  value={password2}
                  onChange={update('password2')}
                  placeholder="Confirm Password"
                />
              </label>
            </div>}



          {currentField === "name-input" &&               //conditionally render name

            <div className='name-input'>
              <div className="errors">{errors?.name}</div>
              <label>
                <span>Name</span>
                <input type="text"
                  value={name}
                  onChange={update('name')}
                  placeholder="Name"
                />
              </label>
            </div>}



          {currentField === "birth-info-input" &&       //conditionally render birthinfo

            <div className='birth-info-input'>
              <div className="errors">{errors?.birthDate}</div>
              <label>
                <span>Birth Date</span>
                <input type="date"
                  value={birthDate}
                  onChange={update('birthDate')}
                  placeholder="Birth Date"
                />
              </label>
              <div className="errors">{errors?.birthTime}</div>
              <label>
                <span>Birth Time</span>
                <input type="time"
                  value={birthTime}
                  onChange={update('birthTime')}
                  placeholder="Birth Time"
                />
              </label>
              <div className="errors">{errors?.birthLocation}</div>
              <label>
                <span>Birth Location</span>
                <input type="text"
                  value={birthLocation}
                  onChange={update('birthLocation')}
                  placeholder="Birth Location"
                />
              </label>
            </div>}
        </div>

        <div className='user-build'>
          <h2>hello</h2>
          {currentField === "email-and-password-input" && <ContinueButton type={"button"} handleClick={continueClick} disabled={!email || !password || password !== password2}/>}

          {currentField === "name-input" && <ContinueButton type={"button"} handleClick={continueClick} disabled={!name}/>}

          {currentField === "birth-info-input" && <ContinueButton type={"submit"} text={"Sign Up"} disabled={!birthDate || !birthTime || !birthLocation}/>}
        </div>
      </form>
    </div>
  );
}

export default SignupForm;