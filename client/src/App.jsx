import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import Profile from './Pages/Profile'
import SignUp from './Pages/SignUp'
import Login from './Pages/Login'
import About from './Pages/About'
import Navbar from './Components/Navbar'
import { useSelector } from 'react-redux'
import PrivateRoute from './Components/PrivateRoute'

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
        <Route element={<PrivateRoute />} >
          <Route path='/profile' element={<Profile />} />
        </Route>
        <Route path='/signup' element={<SignUp />} />
        <Route path='/login' element={<Login />} />
      </Routes>
    </Router>
  )
}
