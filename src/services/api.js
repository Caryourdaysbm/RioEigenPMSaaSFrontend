import axios from 'axios'
import { getToken, logout } from './authService'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8000',
})

api.interceptors.request.use(cfg => {
  const token = getToken()
  if(token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(res => res, err => {
  if(err.response && err.response.status === 401){
    logout()
    window.location.href = '/login'
  }
  return Promise.reject(err)
})

export default api
