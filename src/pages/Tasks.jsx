import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Tasks() {
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')
  const [projectId, setProjectId] = useState('')
  const [projects, setProjects] = useState([])
  const [err, setErr] = useState(null)

  useEffect(() => {
    fetchTasks()
    api.get('/projects').then(r => setProjects(r.data))
  }, [])

  function fetchTasks() {
    api.get('/tasks').then(r => setTasks(r.data)).catch(() => setErr('Failed to load tasks'))
  }

  async function addTask(e) {
    e.preventDefault()
    setErr(null)
    try {
      await api.post('/tasks', { title, description: desc, project_id: Number(projectId) })
      setTitle(''); setDesc(''); setProjectId('')
      fetchTasks()
    } catch {
      setErr('Failed to create task')
    }
  }

  async function toggleDone(t) {
    const next = t.status === 'done' ? 'pending' : 'done'
    await api.patch(`/tasks/${t.id}`, { status: next })
    fetchTasks()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-blue-100">
      <div className="max-w-3xl mx-auto py-10">
        <h1 className="text-3xl font-bold text-purple-700 mb-6">Tasks</h1>
        <form onSubmit={addTask} className="flex flex-col sm:flex-row gap-2 mb-8 bg-white p-4 rounded-xl shadow">
          <input placeholder="Task title" value={title} onChange={e => setTitle(e.target.value)} className="border p-2 rounded flex-1" />
          <input placeholder="Description" value={desc} onChange={e => setDesc(e.target.value)} className="border p-2 rounded flex-1" />
          <select value={projectId} onChange={e => setProjectId(e.target.value)} className="border p-2 rounded flex-1">
            <option value="">Select project</option>
            {projects.map(p => <option key={p.id} value={p.id}>{p.title}</option>)}
          </select>
          <button className="bg-purple-600 hover:bg-purple-700 text-white p-2 rounded transition">Add</button>
        </form>
        {err && <div className="text-red-600 mb-4">{err}</div>}
        <div className="bg-white rounded-xl shadow">
          <ul>
            {tasks.map(t => (
              <li key={t.id} className="border-b last:border-0 px-4 py-4 flex justify-between items-center hover:bg-purple-50 transition">
                <div>
                  <div className="font-semibold text-lg text-purple-700">{t.title}</div>
                  <div className="text-sm text-gray-500">{t.description}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className={`text-xs px-2 py-1 rounded ${t.status === 'done' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                    {t.status}
                  </span>
                  <button onClick={() => toggleDone(t)} className="text-sm underline text-purple-700 hover:text-purple-900 transition">
                    {t.status === 'done' ? 'Mark pending' : 'Mark done'}
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}