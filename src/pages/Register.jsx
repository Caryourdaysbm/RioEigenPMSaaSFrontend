import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { register } from '../services/authService'

export default function Register() {
  const [orgName, setOrgName] = useState('')
  const [adminName, setAdminName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  
  const handleSubmit = async (e) => {
    e.preventDefault()
    setErr(null)
    try {
      await register(orgName, adminName, email, password)
      nav('/')
    } catch (e) {
      setErr(e.message || 'Registration failed')
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <form className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md" onSubmit={handleSubmit}>
        <h2 className="text-3xl font-bold mb-6 text-purple-700 text-center">Register Organization</h2>
        {err && <div className="text-red-600 mb-4 text-center">{err}</div>}
        <label className="block mb-4">
          <span className="text-gray-700">Organization Name</span>
          <input className="w-full border p-2 rounded mt-1" value={orgName} onChange={e => setOrgName(e.target.value)} />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Admin Name</span>
          <input className="w-full border p-2 rounded mt-1" value={adminName} onChange={e => setAdminName(e.target.value)} />
        </label>
        <label className="block mb-4">
          <span className="text-gray-700">Email</span>
          <input className="w-full border p-2 rounded mt-1" value={email} onChange={e => setEmail(e.target.value)} />
        </label>
        <label className="block mb-6">
          <span className="text-gray-700">Password</span>
          <input type="password" className="w-full border p-2 rounded mt-1" value={password} onChange={e => setPassword(e.target.value)} />
        </label>
        <button className="w-full bg-purple-600 hover:bg-purple-700 text-white p-2 rounded mb-4 transition">
          Register
        </button>
        <Link
          to="/login"
          className="w-full block text-purple-600 underline mb-4 text-center hover:text-purple-800 transition"
        >
          Already have an account? Sign in
        </Link>
      </form>
    </div>
  )
}