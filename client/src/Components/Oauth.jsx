import React from 'react'
import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth'
import { app } from '../firebase.js'
import { useDispatch } from 'react-redux'
import { signInSuccess } from '../Redux/user/userSlice.js'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export default function OAuth({ Type }) {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const googleAuth = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const auth = getAuth(app)
      const result = await signInWithPopup(auth, provider)
      console.log(result);
      const res = await fetch('http://localhost:5050/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
          avatar: result.user.photoURL,
        })
      })
      const data = await res.json()
      console.log(data)
      dispatch(signInSuccess(data))
      setTimeout(() => navigate('/'), 1500);
      toast.success(data.message)
    } catch (error) {
      console.log('Error with Google Auth', error);
    }
  }
  return (
    <div>
      <button onClick={googleAuth} type='button' className='w-full bg-blue-500 text-lg text-white hover:bg-transparent hover:text-blue-500 border border-blue-500 p-2 font-semibold rounded-md active:bg-blue-500 active:text-white duration-200' >{Type} with Google </button>
    </div>
  )
}
