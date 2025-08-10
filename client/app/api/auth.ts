import axios from 'axios';

const API = '/api/auth';

export async function login(email: string, password: string) {
  const res = await axios.post(`${API}/login`, { email, password });
  return res.data;
}

export async function signup(name: string, email: string, password: string, role: string) {
  const res = await axios.post(`${API}/register`, { name, email, password, role });
  return res.data;
}

export async function verifyOTP(email: string, otp: string) {
  const res = await axios.post(`${API}/verify-otp`, { email, otp });
  return res.data;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  }
}
