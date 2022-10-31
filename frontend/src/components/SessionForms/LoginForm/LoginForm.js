import { useEffect, useState, useContext } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ContinueButton from '../ContinueButton/ContinueButton';
import './LoginForm.css';
import { login, clearSessionErrors } from '../../../store/session';

import { socket, ChatContext } from '../../../context/chatContext';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();

  // const { socket } = useContext(ChatContext)

  if (email === "" || password === "") {
    dispatch(clearSessionErrors())
  }

  useEffect(() => {
    return () => {
      dispatch(clearSessionErrors());
    };
  }, [dispatch]);

  const update = (field) => {
    const setState = field === 'email' ? setEmail : setPassword;
    return e => setState(e.currentTarget.value);
  }

  const demoLogIn = (e) => {
    e.preventDefault();

    setEmail("demouser@mgmail.com")
    setPassword("password")
    dispatch(login({ email: "demouser@gmail.com", password: "password" })).then(()=>{
      console.log("EMITTING NEW USER")
      socket.emit('new-user')
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(login({ email, password })).then(()=>{
      console.log("EMITTING NEW USER")
      socket.emit('new-user')
    });
  }

  return (
    <div className='login-page'>
    <div className='space-layer'></div>
    <div className='space-layer2'></div>
    <form className="login-form" onSubmit={handleSubmit}>
      <div className="login-field">
        <div className='email-and-password-input'>
          <div className='input-container'>
            <input type="text"
              id="email-input"
              value={email}
              onChange={update("email")}
            />
            <label htmlFor='email-input'>{errors && errors.email ? errors.email.toLowerCase() : "email"}</label>
          </div>
          <div className='input-container'>
            <input type="password"
              id="password-input"
              value={password}
              onChange={update('password')}
            />
            <label htmlFor='password-input'>{errors && errors.password ? errors.password.toLowerCase() : "password"}</label>
          </div>
        </div>
        <ContinueButton text="Log In" type={"submit"} disabled={!email || !password}/>
        <ContinueButton handleClick={demoLogIn} text="Demo User" type="submit"/>
      </div>
    </form>
    
  </div>
  );
}

export default LoginForm;

{/* <form className="session-form" onSubmit={handleSubmit}>
      <h2>Rising Sign Log In Form</h2>
      <div className="errors">{errors?.email}</div>
      <label>
        <span>Email</span>
        <input type="text"
          value={email}
          onChange={update('email')}
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
      <input
        type="submit"
        value="Log In"
        disabled={!email || !password}
      />
    </form> */}