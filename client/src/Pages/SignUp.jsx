import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Oauth from '../Components/Oauth'
import toast from 'react-hot-toast'

export default function SignUp() {
  const [formData, setFormData] = useState({})
  const handleChange = (e) => {
    setFormData({...formData, [e.target.id] : e.target.value})
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const res = await fetch('http://localhost:5050/api/auth/signup', {
      method: 'POST',
      headers:{
        'Content-Type' : 'application/json'
      }, 
      body: JSON.stringify(formData)
    })
    const data = await res.json();
    if (data.message === 'User Created Successfully') {
      toast.success('User Created Successfully')
    } else {
      toast.error(data.message)
    }
  }
  return (
    <div className='max-w-md m-auto p-3'>
    <h1 className='text-4xl text-center font-bold my-4 p-3'>Sign Up</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input id='name' onChange={handleChange} type='text' placeholder='Name' className='outline-none border border-gray-200 text-lg p-2 rounded-md bg-gray-50' />
        <input id='email' onChange={handleChange} type='email' placeholder='Email' className='outline-none border border-gray-200 text-lg p-2 rounded-md bg-gray-50' />
        <input id='password' onChange={handleChange} type='password' placeholder='Password' className='outline-none border border-gray-200 text-lg p-2 rounded-md bg-gray-50' />
        <button className='w-full bg-red-500 text-lg text-white hover:bg-transparent hover:text-red-500 border border-red-500 p-2 font-semibold rounded-md active:bg-red-500 active:text-white duration-200' >Sign Up</button>
        <Oauth Type={'Sign Up'}/>
      </form>
      <p>Already have an Account. <span className='hover:underline text-blue-900'><Link to={'/login'}> Login </Link></span></p>
    </div>
  )
}
