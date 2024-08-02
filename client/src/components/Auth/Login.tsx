// src/components/Auth/Login.tsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../../services/auth';

const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const { token, role } = await login(email, password);
      localStorage.setItem('token', token);
      localStorage.setItem('role', role);

      if (role === 'instructor') {
        navigate('/instructor-dashboard');
      } else if (role === 'student') {
        navigate('/student-dashboard');
      } else {
        setError('Unauthorized user role');
      }
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <div className="auth-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <div>
          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        {error && <div className="error">{error}</div>}
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;
