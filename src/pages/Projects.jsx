import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../services/api'

export default function Projects() {
  const [projects, setProjects] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [due, setDue] = useState('')
  const [err, setErr] = useState(null)
  const nav = useNavigate()

  useEffect(() => {
    fetchProjects()
  }, [])

  function fetchProjects() {
    api.get('/projects').then(r => setProjects(r.data)).catch(() => setErr('Failed to load projects'))
  }

  async function addProject(e) {
    e.preventDefault()
    setErr(null)
    try {
      await api.post('/projects', { title, description: desc, due_date: due })
      setTitle(''); setDesc(''); setDue('')
      fetchProjects()
    } catch {
      setErr('Failed to create project')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100">
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-blue-700 mb-6">Projects</h1>
        <form onSubmit={addProject} className="flex flex-col sm:flex-row gap-2 mb-8 bg-white p-4 rounded-xl shadow">
          <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded flex-1" />
          <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="border p-2 rounded flex-1" />
          <input type="date" value={due} onChange={e => setDue(e.target.value)} className="border p-2 rounded flex-1" />
          <button className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded transition">Add</button>
        </form>
        {err && <div className="text-red-600 mb-4">{err}</div>}
        <div className="bg-white rounded-xl shadow">
          <ul>
            {projects.map(p => (
              <li key={p.id} className="border-b last:border-0 px-4 py-4 flex justify-between items-center hover:bg-blue-50 transition">
                <div>
                  <Link to={`/projects/${p.id}`} className="font-semibold text-lg text-blue-700 hover:underline">{p.title}</Link>
                  <div className="text-sm text-gray-500">{p.description}</div>
                </div>
                <div className="text-sm text-gray-600">{p.due_date || '—'}</div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}