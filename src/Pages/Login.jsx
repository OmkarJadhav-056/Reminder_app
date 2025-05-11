import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [loginData, setLoginData] = useState({
    email: '',
    password: '',
  });

  const [error, setError] = useState('');
  const navigate = useNavigate(); // for navigation after login

  const handleChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const storedUser = JSON.parse(localStorage.getItem('user'));

    if (
      storedUser &&
      loginData.email === storedUser.email &&
      loginData.password === storedUser.password
    ) {
      localStorage.setItem('isLoggedIn', 'true');
      alert('Login successful!');
      navigate('/dashboard'); // redirect to dashboard
    } else {
      setError('Invalid email or password');
    }
  };

  return (
    <div className="flex flex-col items-center py-8 gap-7">
      <h2 className="text-2xl mb-3">Login to the app</h2>
      <form onSubmit={handleSubmit} className="flex flex-col gap-7 w-80">
        <input
          className="p-2 border-2 text-center rounded"
          type="email"
          name="email"
          placeholder="Enter Email address"
          value={loginData.email}
          onChange={handleChange}
        />
        <input
          className="p-2 border-2 text-center rounded"
          type="password"
          name="password"
          placeholder="Enter Password"
          value={loginData.password}
          onChange={handleChange}
        />
        {error && <p className="text-red-500 text-sm">{error}</p>}
        <button
          type="submit"
          className="py-2 px-4 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
