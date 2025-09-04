import React, { useEffect, useState } from 'react'
import api from '../services/api'

export default function Organization() {
  const [org, setOrg] = useState(null)
  const [err, setErr] = useState(null)

  useEffect(() => {
    api.get('/organizations/me')
      .then(r => setOrg(r.data))
      .catch(() => setErr('Failed to load organization'))
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-lg">
        <h1 className="text-3xl font-bold text-blue-700 mb-6 text-center">Organization</h1>
        {err && <div className="text-red-600 mb-4 text-center">{err}</div>}
        {org ? (
          <div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Name:</span> {org.name}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">Subscription Tier:</span> {org.subscription_tier}
            </div>
            <div className="mb-4">
              <span className="font-semibold text-gray-700">ID:</span> {org.id}
            </div>
          </div>
        ) : (
          !err && <div className="text-gray-500 text-center">Loading...</div>
        )}
      </div>
    </div>
  )
}