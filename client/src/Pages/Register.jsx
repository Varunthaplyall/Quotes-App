import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
    const [form, setForm] = useState({
        userName : "",
        email : "",
        password : "",
    })
    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            const res = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`, form)

                if(res.status == 201){
                    const {token, userName, email} = res.data
                    localStorage.setItem('token', token)
                    localStorage.setItem('username', userName)
                    localStorage.setItem('email', email)
                    navigate('/')
                }
        } catch (error) {
            console.log(error.response.data.message)
        }
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-slate-800">
  <form 
  onSubmit={e=>{
    e.preventDefault();
    handleSubmit()
  }}
  className="bg-white p-8 rounded-lg shadow-lg w-80"
  >
    <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">Register</h2>
    
    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="userName">
        Username
      </label>
      <input
        type="text"
        id="userName"
        placeholder="Enter your username"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        value={form.userName}
        onChange={e=>{
            setForm({
                ...form,
                userName : e.target.value
            })
        }}
      />
    </div>

    <div className="mb-4">
      <label className="block text-gray-700 text-sm font-medium mb-2" htmlFor="email">
        Email
      </label>
      <input
        type="email"
        id="email"
        placeholder="Enter your email"
        className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:outline-none focus:border-blue-500"
        value={form.email}
        onChange={e=>{
            setForm({
                ...form,
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
        value={form.password}
        onChange={e=>{
            setForm({
                ...form,
                password : e.target.value
            })
        }}
      />
    </div>

    <button
      type="submit"
      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
    >
      Register
    </button>

    <div className="mt-4 text-center">
      <span className="text-gray-700 text-sm">Already have an account? </span>
      <Link to="/login" className="text-blue-600 hover:underline">
        Log in
      </Link>
    </div>
  </form>
</div>

  )
}

export default Register