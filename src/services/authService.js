const TOKEN_KEY = 'pm_saas_token'

export function saveToken(token){
  localStorage.setItem(TOKEN_KEY, token)
}

export function getToken(){
  return localStorage.getItem(TOKEN_KEY)
}

// export function logout(){
//   localStorage.removeItem(TOKEN_KEY)
// }

import api from './api' // circular import workaround not needed in bundlers
export async function login(email, password){
  const res = await fetch((import.meta.env.VITE_API_URL || 'http://localhost:8000') + '/auth/login?email=' + encodeURIComponent(email) + '&password=' + encodeURIComponent(password), { method: 'POST' })
  if(!res.ok) throw new Error('Invalid credentials')
  const data = await res.json()
  saveToken(data.access_token)
}

const API_URL = "http://localhost:8000";

// export async function login(email, password) {
//   const res = await fetch(`${API_URL}/auth/login`, {
//     method: "POST",
//     headers: { "Content-Type": "application/json" },
//     body: JSON.stringify({ email, password }),
//   });
//   if (!res.ok) {
//     throw new Error("Login failed");
//   }
//   const data = await res.json();
//   localStorage.setItem("token", data.access_token);
//   return data;
// }

export async function register(orgName, adminName, email, password) {
  const res = await fetch(`${API_URL}/auth/register_org`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      org_name: orgName,
      admin_name: adminName,
      admin_email: email,
      password,
      subscription_tier: "free",
    }),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.detail || "Registration failed");
  }
  // Optionally auto-login after register:
  return login(email, password);
}

export function logout() {
  localStorage.removeItem("token");
}
