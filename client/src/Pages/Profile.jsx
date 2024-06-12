import React, { useEffect, useRef, useState } from "react"
import { useDispatch, useSelector } from 'react-redux'
import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage'
import { app } from '../firebase'
import toast from "react-hot-toast";
import { signOut, updateFailure, UpdateSuccess } from '../Redux/user/userSlice.js'
import axios from 'axios'

export default function Profile() {
  const { user } = useSelector((state) => state.user)
  console.log(user)
  const fileRef = useRef(null)
  const [image, setImage] = useState(undefined)
  const [imageProgress, setImageProgress] = useState(0)
  const [imageError, setImageError] = useState(null)
  const [formData, setFormData] = useState({})
  const dispatch = useDispatch()

  useEffect(() => {
    if (image) {
      handleImageUpload(image)
    }
  }, [image])

  // image uploading
  const handleImageUpload = async (image) => {
    const storage = getStorage(app)
    const filename = new Date().getTime() + image.name  // to get a unique image name
    const storageRef = ref(storage, filename)
    const uploadTask = uploadBytesResumable(storageRef, image)
    uploadTask.on(
      'state_changed',
      (snapshot) => {
        // getting image uploaded percentage
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setImageProgress(Math.round(progress))
      },
      (error) => setImageError(error),
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => setFormData({
          ...formData, avatar: downloadURL
        }))
      }
    );
  }
  console.log(`${user.rest._id}`)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5050/api/user/update/${user.rest._id}`, formData);
      if (res.data.message === 'User Updated') {
        toast.success('User Updated');
        dispatch(UpdateSuccess(res.data.rest)); // Assuming res.data.rest contains user info
      } else {
        dispatch(updateFailure(res.data.message));
      }
    } catch (error) {
      dispatch(updateFailure(error.response.data.message || 'An error occurred'));
    }
  };

  const handleSignOut = async () => {
    await axios.get('http://localhost:5050/api/auth/signout')
    dispatch(signOut())
  }
  
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-4xl mt-4 text-center font-bold">Profile</h1>
      <input type="file" ref={fileRef} onChange={(e) => setImage(e.target.files[0])} hidden accept="image/*" />
      <img onClick={() => fileRef.current.click()} className="w-20 rounded-full h-20 object-cover mx-auto my-6 cursor-pointer" src={formData.avatar || user.rest.avatar} alt="Profile pic" />
      <p className="text-center text-sm">
        {imageError ? (
          <span className="text-red-500">Error Uploading Image (file Size should be less than 2MB)</span>
        ) :
          imageProgress > 0 && imageProgress < 100 ? (
            <span className="text-green-500">{`Uploading ${imageProgress}%`}</span>
          ) : imageProgress === 100 ? (<span className="text-green-500">Image uploaded Successfully</span>) : ''
        }
      </p>
      <form onSubmit={handleSubmit} className="p-3 flex flex-col gap-5">
        <input className="border border-gray-200 text-lg p-2 w-full rounded-md bg-slate-100" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} placeholder="name" id="name" defaultValue={user.rest.name} />
        <input className="border border-gray-200 text-lg p-2 w-full rounded-md bg-slate-100" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} placeholder="email" id="email" defaultValue={user.rest.email} />
        <input className="border border-gray-200 text-lg p-2 w-full rounded-md bg-slate-100" onChange={(e) => setFormData({...formData, [e.target.id] : e.target.value})} placeholder="Change Password" id="password" />
        <button type="submit" className="w-full p-2 rounded-md font-semibold text-lg border border-red-500 bg-red-500 text-white hover:bg-transparent hover:text-red-500 active:bg-red-500 active:text-white" >Update Profile</button>
      </form>
      <div className="p-3 flex justify-between -mt-5">
        <p className="text-md text-red-500 hover:underline cursor-pointer">Delete Account</p>
        <p className="text-md text-red-500 hover:underline cursor-pointer" onClick={handleSignOut}>SignOut</p>
      </div>
    </div>
  )
}
