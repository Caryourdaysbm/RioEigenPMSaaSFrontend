import React, { useEffect, useState } from 'react'
import api from '../services/api'
import { Link } from 'react-router-dom'

export default function Dashboard(){
  const [metrics, setMetrics] = useState(null)
  const [projects, setProjects] = useState([])

  useEffect(()=>{
    api.get('/dashboard/metrics').then(r=>setMetrics(r.data))
    api.get('/projects').then(r=>setProjects(r.data))
  },[])

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <header className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-semibold">Dashboard</h1>
        <Link to="/admin" className="text-sm underline">Admin Panel</Link>
      </header>

      <section className="grid grid-cols-3 gap-4 mb-6">
        <div className="bg-white p-4 rounded shadow">{metrics ? <><div className="text-sm">Projects</div><div className="text-2xl">{metrics.total_projects}</div></> : '...'}</div>
        <div className="bg-white p-4 rounded shadow">{metrics ? <><div className="text-sm">Tasks</div><div className="text-2xl">{metrics.total_tasks}</div></> : '...'}</div>
        <div className="bg-white p-4 rounded shadow">{metrics ? <><div className="text-sm">Completed</div><div className="text-2xl">{metrics.completed_tasks}</div></> : '...'}</div>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Projects</h2>
        <ul>
          {projects.map(p=> (
            <li key={p.id} className="border-b py-2 flex justify-between items-center">
              <div>
                <Link to={`/projects/${p.id}`} className="font-medium">{p.title}</Link>
                <div className="text-sm text-gray-500">{p.description}</div>
              </div>
              <div className="text-sm text-gray-600">{p.due_date || '—'}</div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
