import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
// import './SessionForm.css';
import { signup, clearSessionErrors } from '../../store/session';

function SignupForm () {
  const [email, setEmail] = useState('');
//   const [username, setUsername] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [birthLocation, setBirthLocation] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [birthTime, setBirthTime] = useState('');

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

    return e => setState(e.currentTarget.value);
  }

  const userSubmit = e => {
    e.preventDefault();
    const hour = birthTime.slice(0,2);
    const minute = birthTime.slice(3,5);
    // birthDate.setHours(hour, minute);

    const user = {
      email,
      name,
      password,
      birthLocation,
      birthDate,
      birthTime
    };

    dispatch(signup(user));
    console.log('birthDate ', birthDate);
    console.log('birthTime ', birthTime);

    const dateObj = new Date(birthDate);
    // dateObj.setHours(hour, minute);
    console.log('dateObj ', dateObj);
  }

  return (
    <form className="session-form" onSubmit={userSubmit}>
      <h2>Sign Up Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
          placeholder="Email"
        />
      </label>
      <div className="errors">{errors?.name}</div>
      <label>
        <span>Name</span>
        <input type="text"
          value={name}
          onChange={update('name')}
          placeholder="Name"
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
      <br />
    <div className="errors">{errors?.birthLocation}</div>
      <label>
        <span>Birth Location</span>
        <input type="text"
          value={birthLocation}
          onChange={update('birthLocation')}
          placeholder="Birth Location"
        />
      </label>
        <br />
    <div className="errors">{errors?.birthDate}</div>
      <label>
        <span>Birth Date</span>
        <input type="datetime-local"
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

        <br />
      <input
        type="submit"
        value="Sign Up"
        disabled={!email || !name || !password || password !== password2}
      />
    </form>
  );
}

export default SignupForm;