import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { login, logout } from '../services/authService'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(null)
    try {
      await login(email, password)
      nav('/')
    } catch (e) {
      setErr(e.message || 'Authentication failed')
    }
  }

  const handleLogout = () => {
    logout()
    setErr('Logged out.')
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-blue-700 text-center">Sign in</h2>
        {err && <div className="text-red-600 mb-4 text-center">{err}</div>}
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input className="w-full border p-2 rounded mt-1" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input type="password" className="w-full border p-2 rounded mt-1" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded mb-4 transition">
          Sign in
        </button>
        <Link
          to="/register"
          className="w-full block text-blue-600 underline mb-4 text-center hover:text-blue-800 transition"
        >
          Don't have an account? Register
        </Link>
        {/* <button
          type="button"
          className="w-full text-gray-600 underline text-center hover:text-gray-800 transition"
          onClick={handleLogout}
        >
          Logout
        </button> */}
      </form>
    </div>
  )
}