import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Oauth from '../Components/Oauth'
import toast from 'react-hot-toast'
import { useDispatch } from 'react-redux'
import { signInSuccess, signInFailure } from '../Redux/user/userSlice.js'

export default function Login() {
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:5050/api/auth/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData),
      credentials: 'include'
    });
    const data = await res.json();
    if (data.message === 'Logged in successfully') {
      toast.success('Logged In successfully');
      dispatch(signInSuccess(data)); // Assuming data.user contains user info
      setTimeout(() => {navigate('/')}, 1200)
    } else {
      toast.error(data.message);
      dispatch(signInFailure(data.message));
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value })
  }
  return (
    <div className='max-w-md m-auto p-3'>
      <h1 className='text-4xl text-center font-bold my-4 p-3'>Login</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input id='email' onChange={handleChange} type='email' placeholder='Email' className='outline-none border border-gray-200 text-lg p-2 rounded-md bg-gray-50' />
        <input id='password' onChange={handleChange} type='password' placeholder='Password' className='outline-none border border-gray-200 text-lg p-2 rounded-md bg-gray-50' />
        <button className='w-full bg-red-500 text-lg text-white hover:bg-transparent hover:text-red-500 border border-red-500 p-2 font-semibold rounded-md active:bg-red-500 active:text-white duration-200' >Login</button>
        <Oauth Type={'Login'} />
      </form>
      <p>Don't have an Account. <span className='hover:underline text-blue-900'><Link to={'/signup'}> Sign up </Link></span></p>
    </div>
  )
}
