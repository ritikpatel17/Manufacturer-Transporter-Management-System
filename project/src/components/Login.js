import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import loginImg from '../assets/login.jpg';
import axios from 'axios';
// import ManufacturerForm from './ManufacturerForm';
import { useNavigate } from 'react-router-dom';
export default function Login() {
  const [selectedOption, setSelectedOption] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  // const [loggedIn, setLoggedIn] = useState(false);
  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };
  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // Send registration data to the backend
      const response = await axios.post('http://localhost:5000/api/login', {
        username,
        password,
        role:selectedOption,
      });

      // Handle successful registration
      console.log(response.data);
      // Extract the user ID and role from the response
    const { message } = response.data;
    if (selectedOption === 'transporter') {
      navigate('/transporterlanding/'+username);
    } else if (selectedOption === 'manufacturer') {
      navigate('/manufacturerlanding/'+username);
    }
      // Reset the form fields
      setUsername('');
      setPassword('');
      setSelectedOption('Select an option');
      if(message){
        alert("Login successful");  
      }
      else{
        alert("Please Enter Valid Password and Username.");
      }
    } catch (error) {
      // Handle registration error
      console.error(error);
    }
  };

  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
      <div className='hidden sm:block'>
        <img className='w-full h-full object-cover' src={loginImg} alt='' />
      </div>

      <div className='bg-gray-800 flex flex-col justify-center'>
        <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
          <h2 className='text-4xl dark:text-white font-bold text-center'>SIGN IN</h2>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Select:</label>
            <select value={selectedOption} onChange={handleOptionChange} className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none'>
              <option value=''>Select an option</option>
              <option value='transporter'>Transporter</option>
              <option value='manufacturer'>Manufacturer</option>
            </select>
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Username</label>
            <input id='username' className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='text' value={username} onChange={handleUsernameChange}/>
          </div>
          <div className='flex flex-col text-gray-400 py-2'>
            <label>Password</label>
            <input id='password' className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type='password' value={password} onChange={handlePasswordChange} />
          </div>
          
          <div className='flex justify-between text-gray-400 py-2'>
            <p className='flex items-center'>
              <input className='mr-2' type='checkbox' /> Remember Me
            </p>
            <p>Forgot Password</p>
          </div>
          <button className='w-full my-5 py-2 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg' onClick={handleSubmit}>SIGN IN</button>
          <div className='text-center'>
            <p className='text-gray-400'>Not a member?</p>
            <Link to='/registration' className='text-teal-500 underline'>Register here</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
