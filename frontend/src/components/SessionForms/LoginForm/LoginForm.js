import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import Button from '../../Button/Button';
import './LoginForm.css';
import { login, clearSessionErrors } from '../../../store/session';

import { socket } from '../../../context/chatContext';
import { Redirect } from 'react-router-dom';

function LoginForm () {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const errors = useSelector(state => state.errors.session);
  const dispatch = useDispatch();


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

  const demoLogIn = e => {
    e.preventDefault();

    setEmail("demouser@mgmail.com")
    setPassword("password")
    dispatch(login({ email: "demouser@gmail.com", password: "password" })).then(()=>{
      socket.emit('new-user')
    });
  }

  const handleSubmit = e => {
    e.preventDefault();
    dispatch(login({ email, password })).then(()=>{
      socket.emit('new-user')
    });
  }

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className='login-form-upper'>
          <div className='email-input-container'>
            <input type="text"
              id="email-input"
              value={email}
              onChange={update("email")}
            />
            <label htmlFor='email-input'>{errors && errors.email ? errors.email.toLowerCase() : "email"}</label>
          </div>
          <div className='password-input-container'>
            <input type="password"
              id="password-input"
              value={password}
              onChange={update('password')}
            />
            <label htmlFor='password-input'>{errors && errors.password ? errors.password.toLowerCase() : "password"}</label>
          </div>
        </div>
        <div className='login-button-container'>
          <Button text="Log In" type={"submit"} disabled={!email || !password}/>
          <Button handleClick={demoLogIn} text="Demo User" type="submit"/>
        </div>
      </form>
      <Link className="home-link" to={'/'}>Rising Sign</Link>
      <Link className="bottom-signup-link" to={'/signup'}>Sign Up</Link>
    </>
    
  );
}

export default LoginForm;