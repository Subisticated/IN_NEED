import axios from 'axios';
import { User, Badge, Donation } from '@/utils/types';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api',
  withCredentials: true,
});

// Request interceptor to attach JWT
api.interceptors.request.use((config) => {
  const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;

export async function fetchDonorProfile(): Promise<User> {
  const res = await api.get('/donor/profile');
  return res.data;
}

export async function fetchDonorBadges(): Promise<Badge[]> {
  const res = await api.get('/donor/badges');
  return res.data.badges;
}

export async function fetchDonorHistory(): Promise<Donation[]> {
  const res = await api.get('/donor/history');
  return res.data.history;
}

export async function updateDonorAvailability(isAvailable: boolean) {
  return api.patch('/donor/availability', { isAvailable });
}
