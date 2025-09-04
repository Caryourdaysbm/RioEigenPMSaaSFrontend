import React from 'react'
import { Routes, Route, Link, Navigate, useLocation } from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Tasks from './pages/Tasks'
import Organization from './pages/Organization'
import AdminPanel from './pages/AdminPanel'
import Login from './pages/Login'
import Register from './pages/Register'

// Simple auth util
function isLoggedIn() {
  return !!localStorage.getItem('token')
}

// PrivateRoute component
function PrivateRoute({ children }) {
  const location = useLocation()
  return isLoggedIn() ? children : <Navigate to="/login" state={{ from: location }} replace />
}

export default function App() {
  const loggedIn = isLoggedIn()

  return (
    <>
      <nav className="bg-white shadow px-8 py-4 flex gap-6 items-center">
        <Link to="/" className="text-xl font-bold text-blue-700">PM SaaS</Link>
        {loggedIn && (
          <>
            <Link to="/projects" className="text-blue-700 hover:underline">Projects</Link>
            <Link to="/tasks" className="text-purple-700 hover:underline">Tasks</Link>
            <Link to="/organization" className="text-green-700 hover:underline">Organization</Link>
            <Link to="/admin" className="text-pink-700 hover:underline">Admin Panel</Link>
          </>
        )}
        <div className="ml-auto flex gap-4">
          {!loggedIn && (
            <>
              <Link to="/login" className="text-gray-600 hover:underline">Login</Link>
              <Link to="/register" className="text-gray-600 hover:underline">Register</Link>
            </>
          )}
        </div>
      </nav>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route
          path="/projects"
          element={
            <PrivateRoute>
              <Projects />
            </PrivateRoute>
          }
        />
        <Route
          path="/tasks"
          element={
            <PrivateRoute>
              <Tasks />
            </PrivateRoute>
          }
        />
        <Route
          path="/organization"
          element={
            <PrivateRoute>
              <Organization />
            </PrivateRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <PrivateRoute>
              <AdminPanel />
            </PrivateRoute>
          }
        />
      </Routes>
    </>
  )
}