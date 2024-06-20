// src/pages/Login.jsx
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../features/auth/authSlice';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authStatus = useSelector((state) => state.auth.status);
  const authError = useSelector((state) => state.auth.error);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/'); // Arahkan ke halaman home setelah login
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && password) {
      dispatch(login({ email, password }));
    } else {
      console.error('Email and password are required');
    }
  };

  const handleGoogleLogin = () => {
    window.location.href = `${import.meta.env.VITE_BACKEND_URL}/auth/google`;
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        {authStatus === 'loading' && <p className="text-center">Loading...</p>}
        {authError && <p className="text-center text-red-500">{authError}</p>}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1 block w-full"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1 block w-full"
            />
          </div>
          <Button type="submit" className="w-full py-2 mt-4">
            Login
          </Button>
        </form>
        <Button onClick={handleGoogleLogin} className="w-full py-2 mt-4 bg-red-500 hover:bg-red-600">
          Login with Google
        </Button>
      </div>
    </div>
  );
};

export default Login;
