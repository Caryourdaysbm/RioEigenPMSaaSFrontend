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
    <div className="flex items-center justify-center h-screen">
      <form className="bg-white p-8 rounded shadow-md w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-2xl mb-4">Sign in</h2>
        {err && <div className="text-red-600 mb-2">{err}</div>}
        <label className="block mb-2">Email
          <input className="w-full border p-2 rounded" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-4">Password
          <input type="password" className="w-full border p-2 rounded" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="w-full bg-blue-600 text-white p-2 rounded mb-2">
          Sign in
        </button>
        <Link
          to="/register"
          className="w-full block text-blue-600 underline mb-2 text-center"
        >
          Don't have an account? Register
        </Link>
        <button
          type="button"
          className="w-full text-gray-600 underline"
          onClick={handleLogout}
        >
          Logout
        </button>
      </form>
    </div>
  )
}