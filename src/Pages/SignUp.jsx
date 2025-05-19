import React, { useState } from 'react';

const SignUp = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: ''
  });

  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Basic validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError('All fields are required');
      return;
    }

    if (formData.password.length !== 6) {
      setError('Password must be exactly 6 characters');
      return;
    }

    // Save to localStorage
    localStorage.setItem('user', JSON.stringify(formData));
    alert('Signup successful! Please log in.');

    // Optional: clear form
    setFormData({ fullName: '', email: '', password: '' });
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        className='flex flex-col items-center py-6 sm:py-8 gap-4 sm:gap-6'
      >
        <h2 className='text-xl sm:text-2xl mb-3'>Sign up to the app</h2>

        <input
          className='p-1.5 sm:p-2 border-2 text-center text-sm rounded w-46 sm:w-64'
          type='text'
          name='fullName'
          placeholder='Enter Full Name'
          value={formData.fullName}
          onChange={handleChange}
        />

        <input
          className='p-1.5 sm:p-2 border-2 text-center text-sm rounded w-46 sm:w-64'
          type='email'
          name='email'
          placeholder='Enter Your Email'
          value={formData.email}
          onChange={handleChange}
        />

        <input
          className='p-1.5 sm:p-2 border-2 text-center text-sm rounded w-46 sm:w-64'
          type='password'
          name='password'
          placeholder='Enter Password'
          value={formData.password}
          onChange={handleChange}
          maxLength={6}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          type='submit'
          className='py-1.5 sm:py-2 px-3.5 sm:px-4 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          Sign Up
        </button>
      </form>
    </div>
  );
};

export default SignUp;
