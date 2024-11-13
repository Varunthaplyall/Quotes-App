import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import toast from 'react-hot-toast'

const Login = ({isAuthenticated, handleLogin}) => {
  const [userDetails, setUserDetails] = useState({
    email : '',
    password : ''
  })
  const navigate = useNavigate()
  
  async function handleSubmit() {
    try {
      const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, userDetails)
      if(res.status == 200){
        const {token, userName, email} = res.data
        handleLogin(token, userName, email)
        navigate('/')
        toast.success("Logged-in")
      }
    } catch (error) {
      console.log(error)
    }
  }


  return (
    
    <div className="flex items-center justify-center min-h-screen bg-slate-800">
  <form
    onSubmit={(e)=>{
      e.preventDefault();
      handleSubmit();
    }}
    className="bg-white p-8 rounded-lg shadow-lg w-80"
  >
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Login</h2>
    
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
        Email
      </label>
      <input
        
        type="email"
        id="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        value={userDetails.email}
        onChange={(e)=>{
          setUserDetails({
            ...userDetails,
            email : e.target.value
          })
        }}
     
      />
    </div>

    <div className="mb-6">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="password">
        Password
      </label>
      <input
      
        type="password"
        id="password"
        placeholder="Enter your password"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        value={userDetails.password}
        onChange={e=>{
          setUserDetails({
            ...userDetails,
            password : e.target.value
          })
        }}
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Log In
    </button>

    <div className="mt-4 text-center">
      <span className="text-gray-700 text-sm">Didn’t sign up yet?  </span>
      <Link to="/register" className="text-blue-600 text-sm ml-1 hover:underline">
          Sign up
      </Link>
    </div>
  </form>
</div>


  )
}

export default Login