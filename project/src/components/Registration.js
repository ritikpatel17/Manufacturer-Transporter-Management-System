import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

export default function Registration() {
  const [username, setUsername] = useState('');
  const [Name, setName] = useState('');
  const [Address, setAddress] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');
  const [selectedOption, setSelectedOption] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleConfirmPasswordChange = (event) => {
    setConfirmPassword(event.target.value);
  };

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send registration data to the backend
      const response = await axios.post('http://localhost:5000/api/register', {
        username,
        name: Name,
        password,
        confirmpassword,
        role: selectedOption,

      });

      // Handle successful registration
      console.log(response.data);

      // Reset the form fields
      setUsername('');
      setName('');
      setPassword('');
      setConfirmPassword('');
      setAddress('');
      setSelectedOption('Select an option');
    } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };

  return (
    <div className='max-w-[400px] w-full mx-auto mt-16'>
      <h2 className='text-4xl font-bold text-center'>Registration</h2>
      <form className='bg-gray-900 rounded-lg p-8 mt-8'>
      <div className='flex flex-col text-gray-400 py-2'>
            <label>Select:</label>
            <select value={selectedOption} onChange={handleOptionChange} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'>
              <option value=''>Select an option</option>
              <option value='transporter'>Transporter</option>
              <option value='manufacturer'>Manufacturer</option>
            </select>
          </div>
      <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='text'
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor='Name'>Name</label>
          <input
            id='Name'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='text'
            value={Name}
            onChange={handleNameChange}
          />
        </div>

        <div className='flex flex-col text-gray-400 py-2'>
          <label address='Name'>Address</label>
          <input
            id='address'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='text'
            value={Address}
            onChange={handleAddressChange}
          />
        </div>
        
        <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='password'
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <div className='flex flex-col text-gray-400 py-2'>
          <label htmlFor='confirmpassword'>Confirm Password</label>
          <input
            id='confirmpassword'
            className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'
            type='confirmpassword'
            value={confirmpassword}
            onChange={handleConfirmPasswordChange}
          />
        </div>
        <button
          className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg'
          onClick={handleSubmit}
        >
          Register
        </button>
        <div className='text-center'>
          <p className='text-gray-400'>Already have an account?</p>
          <Link to='/' className='text-teal-500 underline'>Login here</Link>
        </div>
      </form>
    </div>
  );
}
