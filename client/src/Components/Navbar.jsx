import React from 'react'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Navbar() {
  const { user } = useSelector((state) => state.user)
  return (
    <div className={`flex p-3 px-10 sm:px-20 justify-between items-center bg-slate-100 w-full shadow-sm`}>
      <h1 className='text-2xl font-bold text-purple-800'>Auth</h1>
      <div className='flex gap-4'>
        <a className='text-lg hover:underline cursor-pointer'><Link to={'/'}>Home</Link></a>
        <a className='text-lg hover:underline cursor-pointer'><Link to={'/about'}>About</Link></a>
        {user ? (
  <Link to={'/profile'}>
    <img className='w-8 h-8 cursor-pointer rounded-full' src={user.rest.avatar} alt='profile' />
  </Link>
) : (
  <Link to={'/login'} className='text-lg hover:underline cursor-pointer'>
    Login
  </Link>
)}
      </div>
    </div>
  )
}
