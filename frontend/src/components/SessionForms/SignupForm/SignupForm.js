import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Button from '../../Button/Button';
import './SignupForm.css';
import { signup, clearSessionErrors } from '../../../store/session';
import { uploadPic } from '../../../store/pics';
import { Link } from 'react-router-dom';

function SignupForm () {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [sunSign, setSunSign] = useState('');
  const [moonSign, setMoonSign] = useState('');
  const [risingSign, setRisingSign] = useState('');
  const [ pic, setPic ] = useState(null);
  const [ preview, setPreview ] = useState(null);
  // const [ hidden, setHidden ] = useState(false);
  const fieldArray = ["name-input", "birth-info-input", "email-and-password-input", "picture-upload"];
  let [ currentField, setCurrentField ] = useState(fieldArray[0]);
  let [ birthLocationError, setBirthLocationError ] = useState("");
  let [ birthDateError, setBirthDateError ] = useState("");
  let [ birthTimeError, setBirthTimeError ] = useState("");
  let [ nameError, setNameError ] = useState("");
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();
  const currentUser = useSelector(state => state.session.user ? state.session.user : null)

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch, currentField]);

  useEffect(() => {      
    if (!pic) {
      setPreview(undefined)
      return
    }             //sets the preview of the picture
    const previewUrl = URL.createObjectURL(pic)
    setPreview(previewUrl)

    return () => URL.revokeObjectURL(previewUrl)
  }, [pic])

  useEffect(() => {
    if (pic) {
      dispatch(uploadPic({
        pic,
        uploaderId: currentUser._id,
        isProfile: true
      }))
    }
  }, [currentUser])

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

  const handleSun =(e) => {
    e.preventDefault();
    setSunSign(e.target.value);
  }
  const handleMoon =(e) => {
    e.preventDefault();
    setMoonSign(e.target.value);
  }
  const handleRising =(e) => {
    e.preventDefault();
    setRisingSign(e.target.value);
  }

  const isValidDate = (date) => {
    const validDate = /^\d{4}\-\d{1,2}\-\d{1,2}$/;
    if (!date.match(validDate)) return false;

    return true;
  };

  const checkTime = (time) => {
    const re = /^(\d{1,2}):(\d{2})(:00)?([AP]M)?$/;

    if (!time.match(re)) return false;
    return true;
  }

  const hiddenClick = () => {
    document.getElementById('hidden-input').click();
  }

  const handlePreview = e => {
    setPreview(e.currentTarget.files[0])
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
    if (isValidDate(birthDate) && checkTime(birthTime)) {
      setCurrentField(fieldArray[fieldArray.indexOf(currentField) + 1]);
    } else {
      if (!isValidDate(birthDate)) setBirthDateError("not a valid date of birth");
      if (!checkTime(birthTime)) setBirthTimeError("Invalid time of birth");
    }
  }

  const continueClickEmailPassword = e => {
    e.preventDefault();
    setCurrentField(fieldArray[fieldArray.indexOf(currentField) + 1]);

  }

  const backClick = e => {
    e.preventDefault();
    setPreview(null);
    setPic(null);
    setCurrentField(fieldArray[fieldArray.indexOf(currentField) - 1])
  }

  const userSubmit = e => {
    e.preventDefault();
    const horoscope = {
      sun: {key: 'sun', label: 'Sun', Sign: {key: sunSign}},
      moon: {key: 'moon', label: 'Moon', Sign: {key: moonSign}},
      rising: {key: 'ascendant', label: 'Rising', Sign: {key: risingSign}}
    }
    const birthDateTime = new Date(`${birthDate}T${birthTime}:00Z`);
    const user = {
      email,
      name,
      password,
      horoscope,
      birthDateTime
    };

    dispatch(signup(user));
    // console.log(currentUser)
    
  }

  return (
    <>
      <form className="signup-form" onSubmit={userSubmit}>
        <div className='signup-upper'>
          {currentField !== "name-input" &&               //displays name

          <div className='name-display'>
            <p>{name.charAt(0).toUpperCase() + name.slice(1).toLowerCase()}</p>
          </div>}

          {(currentField !== "name-input" && currentField !== "birth-info-input") &&       //displays birth info

          <div className='birth-info-display'>
            <p>{birthDate}</p>
            <p>{birthTime}</p>
            {/* <p>{birthLocation}</p> */}
          </div>}

          {(currentField !== "name-input" && currentField !== "birth-info-input" && currentField !== "email-and-password-input") &&                   //displays email and hidden password

          <div className='email-display'>
            <p>{email}</p>
          </div>}

        

        

          {currentField === "name-input" &&               //conditionally render name

          <div className='name-input-container'>
            <div className="errors">{errors?.name}</div>
              <input type="text"
                id="name-input"
                value={name}
                onChange={update('name')}
              />
            <label htmlFor='name-input'>{nameError !== "" && name !== "" ? nameError : "first name"}</label>
          </div>}

          {currentField === "birth-info-input" &&       //conditionally render birthinfo

            <div className='birth-info-container'>
              <div className='birthdate-input-container'>
                <div className="errors">{errors?.birthDate}</div>
                  <input type="date"
                    value={birthDate}
                    id="birthdate-input"
                    onChange={update('birthDate')}
                  />
                <label htmlFor='birthdate-input'>{birthDateError !== "" && birthDate !== "" ? birthDateError : "date of birth"}</label>
              </div>
              <div className='birthtime-input-container'>
                <div className="errors">{errors?.birthTime}</div>
                  <input type="time"
                    value={birthTime}
                    id="birthtime-input"
                    onChange={update('birthTime')}
                  />
                <label htmlFor='birthtime-input'>{birthTimeError !== "" && birthTime !== "" ? birthTimeError : "time of birth"}</label>
              </div>
              <div className='sign-input-container'>
                <div className='sun-sign-container'>
                  <label htmlFor="sun-sign-selector" className='sign-selector-label'>Sun Sign:</label>
                  <select id="sun-sign-selector" className="input-container-sign-selector" defaultValue="def" onChange={handleSun}>
                      <option value="def" disabled>...</option>
                      <option value="aries">Aries</option>
                      <option value="taurus">Taurus</option>
                      <option value="gemini">Gemini</option>
                      <option value="cancer">Cancer</option>
                      <option value="leo">Leo</option>
                      <option value="virgo">Virgo</option>
                      <option value="libra">Libra</option>
                      <option value="scorpio">Scorpio</option>
                      <option value="sagittarius">Sagittarius</option>
                      <option value="capricorn">Capricorn</option>
                      <option value="aquarius">Aquarius</option>
                      <option value="pisces">Pisces</option>
                  </select>
                </div>
                <div className='moon-sign-container'>
                  <label htmlFor='moon-sign-selector' className='sign-selector-label'>Moon Sign:</label>
                  <select id="moon-sign-selector" className="input-container-sign-selector" defaultValue="def" onChange={handleMoon}>
                      <option value="def" disabled>...</option>
                      <option value="aries">Aries</option>
                      <option value="taurus">Taurus</option>
                      <option value="gemini">Gemini</option>
                      <option value="cancer">Cancer</option>
                      <option value="leo">Leo</option>
                      <option value="virgo">Virgo</option>
                      <option value="libra">Libra</option>
                      <option value="scorpio">Scorpio</option>
                      <option value="sagittarius">Sagittarius</option>
                      <option value="capricorn">Capricorn</option>
                      <option value="aquarius">Aquarius</option>
                      <option value="pisces">Pisces</option>
                  </select>
                </div>
                <div className='rising-sign-container'>
                  <label htmlFor='rising-sign-selector' className='sign-selector-label'>Rising Sign:</label>
                    <select id="rising-sign-selector" className="input-container-sign-selector" defaultValue="def" onChange={handleRising}>
                        <option value="def" disabled>...</option>
                        <option value="aries">Aries</option>
                        <option value="taurus">Taurus</option>
                        <option value="gemini">Gemini</option>
                        <option value="cancer">Cancer</option>
                        <option value="leo">Leo</option>
                        <option value="virgo">Virgo</option>
                        <option value="libra">Libra</option>
                        <option value="scorpio">Scorpio</option>
                        <option value="sagittarius">Sagittarius</option>
                        <option value="capricorn">Capricorn</option>
                        <option value="aquarius">Aquarius</option>
                        <option value="pisces">Pisces</option>
                    </select>
                </div>
              </div>
            </div>}

          {currentField === "email-and-password-input" &&     //conditionally render email and password

            <div className='email-and-password-input'>
              <div className='input-container'>
                {/* <div className="errors">{errors?.email}</div> */}
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
                {/* <div className="errors">
                  {password !== password2 && 'Confirm Password field must match'}
                </div> */}
                  <input type="password"
                    id="password2-input"
                    value={password2}
                    onChange={update('password2')}
                  />
                <label htmlFor='password2-input'>{password !== password2 && password2 !== "" ? 'password fields must match' : "confirm password"}</label>
              </div>
            </div>}

          {currentField === "picture-upload" &&

            <div className='picture-upload-container'>
              <input className='hidden-input' id='hidden-input' onChange={e => setPic(e.target.files[0])} type="file" style={{display: "none"}}/>
              <div className='picture-input' id='picture-input'>
                <Button text="choose file" type={"button"} handleClick={hiddenClick}/>
                <input className='file-text' onChange={e => handlePreview(e)} value={pic ? `${pic.name}` : ""}></input>
              </div>
              <label htmlFor='picture-input'>{ pic ? "" : "upload a picture or continue"}</label>
            </div>}

          {preview && <div className='preview-frame'>
                        <img className="picture-preview" src={preview} alt=""></img>
                      </div>}

        </div>
        <div className='signup-button-container'>
          {currentField === "name-input" && <Button type={"button"} text="Continue" handleClick={continueClickName} disabled={!name}/>}

          {currentField === "birth-info-input" && <><Button text="Back" type={"button"} handleClick={backClick}/> <Button type={"submit"} text="Continue" handleClick={continueClickBirthInfo} disabled={!birthDate || !birthTime}/></>}

          {currentField === "email-and-password-input" && <><Button text="Back" type={"button"} handleClick={backClick}/><Button type={"submit"} text="Continue" handleClick={continueClickEmailPassword} disabled={!email || !password || password !== password2}/></>}

          {currentField === "picture-upload" && <><Button text="Back" type={"button"} handleClick={backClick}/><Button type={"submit"} handleClick={userSubmit} text="Sign Up"/></>}
        </div>
      </form>
      <Link className="home-link" to={'/'}>Rising Sign</Link>
      <Link className="bottom-login-link" to={'/login'}>Log In</Link>
    </>
    
  );
}

export default SignupForm;