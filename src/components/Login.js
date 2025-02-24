// filepath: /Users/prashant/Desktop/AMAZON CLONE/amazon-clone/src/components/Login.js
import React, { useState } from 'react';
import { useHistory, Link } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { useStateValue } from '../providers/StateProvider';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [{}, dispatch] = useStateValue();
  const history = useHistory();

  const signIn = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log("User Signed In:", user);
        dispatch({
          type: 'SET_USER',
          user: user,
        });
        history.push('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  const register = (e) => {
    e.preventDefault();
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed up
        const user = userCredential.user;
        console.log("User Signed Up:", user);
        dispatch({
          type: 'SET_USER',
          user: user,
        });
        history.push('/');
      })
      .catch((error) => {
        const errorMessage = error.message;
        console.log(errorMessage);
      });
  };

  return (
    <div className='login'>
      <Link to='/'>
        <img
          className='login__logo'
          src='https://upload.wikimedia.org/wikipedia/commons/thumb/a/a9/Amazon_logo.svg/1024px-Amazon_logo.svg.png'
          alt='Amazon Logo'
        />
      </Link>

      <div className='login__container'>
        <h1>Sign-in</h1>
        <form>
          <h5>E-mail</h5>
          <input type='text' value={email} onChange={(e) => setEmail(e.target.value)} />

          <h5>Password</h5>
          <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} />

          <button type='submit' onClick={signIn} className='login__signInButton'>
            Sign In
          </button>
        </form>
        <p>By signing in you agree to the Amazon Clone terms and conditions of use and sale. Please see our privacy policy, our cookies notice, and our interest-based ads notice.</p>

        <button onClick={register} className='login__registerButton'>
          Create your Amazon Account
        </button>
      </div>
    </div>
  );
}

export default Login;