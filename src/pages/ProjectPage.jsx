import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import api from '../services/api'

export default function ProjectPage(){
  const { id } = useParams()
  const [project, setProject] = useState(null)
  const [tasks, setTasks] = useState([])
  const [title, setTitle] = useState('')
  const [desc, setDesc] = useState('')

  useEffect(()=>{
    api.get(`/projects`).then(r=>{
      const p = r.data.find(x=>String(x.id)===id)
      setProject(p)
    })
    fetchTasks()
  },[id])

  function fetchTasks(){
    api.get('/tasks', { params: { project_id: id } }).then(r=>setTasks(r.data))
  }

  async function addTask(e){
    e.preventDefault()
    await api.post('/tasks', { title, description: desc, project_id: Number(id) })
    setTitle(''); setDesc(''); fetchTasks()
  }

  async function toggleDone(t){
    const next = t.status === 'done' ? 'pending' : 'done'
    await api.patch(`/tasks/${t.id}`, { status: next })
    fetchTasks()
  }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">{project?.title || 'Project'}</h1>
      <section className="mb-6">
        <form onSubmit={addTask} className="flex gap-2">
          <input placeholder="Task title" value={title} onChange={e=>setTitle(e.target.value)} className="flex-1 border p-2 rounded" />
          <button className="bg-blue-600 text-white p-2 rounded">Add</button>
        </form>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-3">Tasks</h2>
        <ul>
          {tasks.map(t=> (
            <li key={t.id} className="flex items-center justify-between py-2 border-b">
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-sm text-gray-500">{t.description}</div>
              </div>
              <div className="flex items-center gap-2">
                <button onClick={()=>toggleDone(t)} className="text-sm underline">{t.status === 'done' ? 'Mark pending' : 'Mark done'}</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
