import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../services/authService'

export default function Dashboard(){
  const [metrics, setMetrics] = useState(null)
  const [projects, setProjects] = useState([])
  const nav = useNavigate()

  useEffect(()=>{
    api.get('/dashboard/metrics').then(r=>setMetrics(r.data))
    api.get('/projects').then(r=>setProjects(r.data))
  },[])

  const handleLogout = () => {
    logout()
    nav('/login')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <header className="flex items-center justify-between px-8 py-6 bg-white shadow mb-8 rounded-b-2xl">
        <h1 className="text-3xl font-bold text-blue-700 tracking-tight">Dashboard</h1>
        <div className="flex gap-4 items-center">
          <Link to="/admin" className="text-sm font-medium text-blue-600 hover:underline transition">Admin Panel</Link>
          <button
            onClick={handleLogout}
            className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded shadow transition"
          >
            Logout
          </button>
        </div>
      </header>

      <main className="p-6 max-w-5xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-8">
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-1">Projects</div>
            <div className="text-3xl font-bold text-blue-700">{metrics ? metrics.total_projects : '...'}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-1">Tasks</div>
            <div className="text-3xl font-bold text-purple-700">{metrics ? metrics.total_tasks : '...'}</div>
          </div>
          <div className="bg-white p-6 rounded-xl shadow flex flex-col items-center">
            <div className="text-sm text-gray-500 mb-1">Completed</div>
            <div className="text-3xl font-bold text-green-600">{metrics ? metrics.completed_tasks : '...'}</div>
          </div>
        </section>

        <section className="bg-white p-6 rounded-xl shadow">
          <h2 className="font-semibold text-xl mb-4 text-blue-700">Projects</h2>
          <ul>
            {projects.map(p=> (
              <li key={p.id} className="border-b py-3 flex justify-between items-center hover:bg-blue-50 transition">
                <div>
                  <Link to={`/projects/${p.id}`} className="font-medium text-lg text-blue-700 hover:underline">{p.title}</Link>
                  <div className="text-sm text-gray-500">{p.description}</div>
                </div>
                <div className="text-sm text-gray-600">{p.due_date || '—'}</div>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  )
}