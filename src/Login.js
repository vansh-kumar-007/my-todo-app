import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebase';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegister, setIsRegister] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      if (isRegister) {
        await createUserWithEmailAndPassword(auth, email, password);
      } else {
        await signInWithEmailAndPassword(auth, email, password);
      }
      onLogin(); // notify parent component of login
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    <div style={{maxWidth: 400, margin: 'auto', padding: 20}}>
      <h2>{isRegister ? 'Register' : 'Login'}</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email" placeholder="Email" value={email}
          onChange={e => setEmail(e.target.value)} required style={{width: '100%', marginBottom: 10}}
        />
        <input
          type="password" placeholder="Password" value={password}
          onChange={e => setPassword(e.target.value)} required style={{width: '100%', marginBottom: 10}}
        />
        <button type="submit" style={{width: '100%'}}>
          {isRegister ? 'Register' : 'Login'}
        </button>
      </form>
      <button
        onClick={() => setIsRegister(!isRegister)}
        style={{marginTop: 10, width: '100%'}}
      >
        {isRegister ? 'Already have an account? Login' : 'New user? Register'}
      </button>
      {error && <p style={{color: 'red'}}>{error}</p>}
    </div>
  );
}

export default Login;