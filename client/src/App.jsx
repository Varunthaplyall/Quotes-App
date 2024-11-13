import './App.css'
import {Route, Routes, useLocation, useNavigate} from 'react-router-dom'
import Login from './Pages/Login'
import Navbar from './components/Navbar'
import Register from './Pages/Register'
import Home from './Home'
import { useEffect, useState } from 'react'
import toast, { Toaster } from 'react-hot-toast';
import Profile from './Pages/Profile'

function App() {
const [isAuthenticated, setIsAuthenticated] = useState(false)
const user = JSON.parse(localStorage.getItem('user'))
const navigate = useNavigate()
const {pathname} = useLocation()

useEffect(()=>{
  setIsAuthenticated(localStorage.getItem('token'));
 
}, [isAuthenticated])

const logout = ()=>{
  localStorage.removeItem('token')
  localStorage.removeItem('username')
  localStorage.removeItem('email')
  setIsAuthenticated(false)
  navigate('/login')
  toast.success('Sucessfully logged out')
}

const handleLogin = (token, userName, email)=>{
  localStorage.setItem('token', token)
  localStorage.setItem('user', JSON.stringify({userName, email}) );
  setIsAuthenticated(true)
}

  return (
    <div className={`min-h-screen max-h-screen ${ pathname == '/' || pathname == '/profile' ? 'dark:bg-white' :  'dark:bg-slate-800' }`}>
    <Toaster/>
    <Navbar isAuthenticated={isAuthenticated} logout={logout} />

    <div className='max-w-[800px] mx-auto' >

        <Routes>
          <Route path='/login' element={ <Login  isAuthenticated={isAuthenticated} handleLogin={handleLogin} /> }/>
          <Route path='/register' element={ <Register/> } />
          <Route path='/' element={ <Home/> }/>
          <Route path='/profile' element={ <Profile user={user}/> }/>
       </Routes>

    </div>
    
    </div>
  )
}

export default App
