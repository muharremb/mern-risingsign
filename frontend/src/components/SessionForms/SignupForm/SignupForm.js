import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContinueButton from '../ContinueButton/ContinueButton';
import BackButton from '../BackButton/BackButton';
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
  const fieldArray = ["name-input", "birth-info-input", "email-and-password-input"];
  let [ currentField, setCurrentField ] = useState(fieldArray[0]);
  let [ birthLocationError, setBirthLocationError ] = useState("");
  let [ birthDateError, setBirthDateError ] = useState("");
  let [ birthTimeError, setBirthTimeError ] = useState("");
  let [ nameError, setNameError ] = useState("");
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  // if (birthLocation === "") setBirthLocationError("");
  // if (birthDate === "") setBirthDateError("");
  // if (birthTime === "") setBirthTimeError("");


  // if (email === "" || name === "" || password === "" || password2 === "" || birthLocation === "" || birthDate === "" || birthTime === "") {
  //   dispatch(clearSessionErrors())
  // }

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch, currentField]);

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
      setState(e.currentTarget.value)
    };
  }

  const isValidDate = (date) => {
    const validDate = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    // debugger
    if (!date.match(validDate)) return false;

    return true;
  };

  const checkTime = (time) => {
    const re = /^(\d{1,2}):(\d{2})(:00)?([AP]M)?$/;

    if (!time.match(re)) return false;
    return true;
  }

  const continueClickName = e => {
    e.preventDefault();
    if (name.length >= 2 && name.length <= 30) {
      setCurrentField(fieldArray[fieldArray.indexOf(currentField) + 1]);
    } else {
      setNameError("name must be present")
    }
  }



  const continueClickBirthInfo = e => {
    e.preventDefault();
    // console.log("hi")
    if (birthLocation !== "" && isValidDate(birthDate) && checkTime(birthTime)) {
      setCurrentField(fieldArray[fieldArray.indexOf(currentField) + 1]);
    } else {
      if (birthLocation === "") {
        setBirthLocationError("must include place of birth");
      }
      if (!isValidDate(birthDate)) setBirthDateError("not a valid date of birth");
      if (!checkTime(birthTime)) setBirthTimeError("Invalid time of birth");
    }
  }

  const backClick = e => {
    e.preventDefault();
    setCurrentField(fieldArray[fieldArray.indexOf(currentField) - 1])
  }

  const userSubmit = e => {
    e.preventDefault();
    const birthDateTime = new Date(`${birthDate}T${birthTime}:00Z`);
    const user = {
      email,
      name,
      password,
      birthLocation,
      birthDateTime,
    };

    dispatch(signup(user)); 
  }

  return (
    <div className='signup-page'>
      <div className='space-layer'></div>
      <div className='space-layer2'></div>
      <div className='space-layer3'></div>
      <form className="signup-form" onSubmit={userSubmit}>
        <div className="current-field">

          {currentField === "email-and-password-input" &&     //conditionally render email and password

            <div className='email-and-password-input'>
              <div className='input-container'>
                <div className="errors">{errors?.email}</div>
                  <input type="text"
                    id="email-input"
                    value={email}
                    onChange={update("email")}
                  />
                <label htmlFor='email-input'>{errors && errors.email ? errors.email.toLowerCase() : "email"}</label>
              </div>
              <div className='input-container'>
                <div className="errors">{errors?.password}</div>
                  <input type="password"
                    id="password-input"
                    value={password}
                    onChange={update('password')}
                  />
                <label htmlFor='password-input'>{errors && errors.password ? errors.password.toLowerCase() : "password"}</label>
              </div>
              <div className='input-container'>
                <div className="errors">
                  {password !== password2 && 'Confirm Password field must match'}
                </div>
                  <input type="password"
                    id="password2-input"
                    value={password2}
                    onChange={update('password2')}
                  />
                <label htmlFor='password2-input'>{password !== password2 && password2 !== "" ? 'password fields must match' : "confirm password"}</label>
              </div>
            </div>}



          {currentField === "name-input" &&               //conditionally render name

            <div className='name-input'>
              <div className='input-container'>
                <div className="errors">{errors?.name}</div>
                  <input type="text"
                    id="name-input"
                    value={name}
                    onChange={update('name')}
                  />
                <label htmlFor='name-input'>{nameError !== "" && name !== "" ? nameError : "first name"}</label>
              </div>
            </div>}



          {currentField === "birth-info-input" &&       //conditionally render birthinfo

            <div className='birth-info-input'>
              <div className='input-container'>
                <div className="errors">{errors?.birthDate}</div>
                  <input type="date"
                    value={birthDate}
                    id="birth-date-input"
                    onChange={update('birthDate')}
                  />
                <label htmlFor='birth-date-input'>{birthDateError !== "" && birthDate !== "" ? birthDateError : "date of birth"}</label>
              </div>
              <div className='input-container'>
                <div className="errors">{errors?.birthTime}</div>
                  <input type="time"
                    value={birthTime}
                    id="birth-time-input"
                    onChange={update('birthTime')}
                  />
                <label htmlFor='birth-time-input'>{birthTimeError !== "" && birthTime !== "" ? birthTimeError : "time of birth"}</label>
              </div>
              <div className='input-container'>
                <div className="errors">{errors?.birthLocation}</div>
                  <input type="text"
                    value={birthLocation}
                    id="birth-location-input"
                    onChange={update('birthLocation')}
                  />
                <label htmlFor='birth-location-input' value>{birthLocationError !== "" && birthLocation !== "" ? birthLocationError : "birth place"}</label>
              </div>
            </div>}
        </div>

        <div className='user-build'>
          <div className='user-build-upper'>

          </div>

          <div className='user-build-lower'>
            {currentField === "email-and-password-input" && <><BackButton type={"button"} handleClick={backClick}/> && <ContinueButton type={"submit"} text="Sign Up" disabled={!email || !password || password !== password2}/></>}

            {currentField === "name-input" && <ContinueButton type={"button"} handleClick={continueClickName} disabled={!name}/>}

            {currentField === "birth-info-input" && <><BackButton type={"button"} handleClick={backClick}/> && <ContinueButton type={"submit"} handleClick={continueClickBirthInfo} disabled={!birthDate || !birthTime || !birthLocation}/></>}

          </div>
        </div>
      </form>
    </div>
  );
}

export default SignupForm;