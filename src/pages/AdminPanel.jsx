import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function AdminPanel(){
  const [users, setUsers] = useState([])
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('Member')

  useEffect(()=>{ fetchUsers() },[])

  function fetchUsers(){ api.get('/users').then(r=>setUsers(r.data)) }

  async function invite(e){ e.preventDefault(); await api.post('/users/invite',{name,email,password:'Password123!',role}); setName('');setEmail('');fetchUsers() }

  async function changeRole(u, newRole){ await api.patch(`/users/${u.id}/role`, null, { params: { role: newRole } }); fetchUsers() }

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-xl font-semibold mb-4">Admin Panel</h1>

      <section className="bg-white p-4 rounded shadow mb-6">
        <h2 className="font-semibold mb-2">Invite user</h2>
        <form onSubmit={invite} className="flex gap-2">
          <input placeholder="Name" value={name} onChange={e=>setName(e.target.value)} className="border p-2 rounded" />
          <input placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} className="border p-2 rounded" />
          <select value={role} onChange={e=>setRole(e.target.value)} className="border p-2 rounded">
            <option>Member</option>
            <option>Admin</option>
          </select>
          <button className="bg-green-600 text-white p-2 rounded">Invite</button>
        </form>
      </section>

      <section className="bg-white p-4 rounded shadow">
        <h2 className="font-semibold mb-2">Members</h2>
        <ul>
          {users.map(u=> (
            <li key={u.id} className="flex justify-between items-center border-b py-2">
              <div>
                <div className="font-medium">{u.name} <span className="text-sm text-gray-500">({u.email})</span></div>
                <div className="text-sm text-gray-500">{u.role}</div>
              </div>
              <div className="flex gap-2">
                <button onClick={()=>changeRole(u, u.role === 'Admin' ? 'Member' : 'Admin')} className="text-sm underline">Toggle Role</button>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  )
}
