import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import ProjectPage from './pages/ProjectPage'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login'
import Register from './pages/Register'
import { getToken } from './services/authService'

function PrivateRoute({ children }) {
  const token = getToken()
  return token ? children : <Navigate to='/login' replace />
}

export default function App(){
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<PrivateRoute><Dashboard /></PrivateRoute>} />
        <Route path="/projects/:id" element={<PrivateRoute><ProjectPage /></PrivateRoute>} />
        <Route path="/admin" element={<PrivateRoute><AdminPanel /></PrivateRoute>} />
      </Routes>
    </div>
  )
}
