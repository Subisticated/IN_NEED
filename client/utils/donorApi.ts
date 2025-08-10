import api from './api';
import { User, Badge, Donation } from './types';

export async function getDonorProfile(): Promise<User> {
  const res = await api.get('/donor/profile');
  return res.data;
}

export async function updateDonorAvailability(isAvailable: boolean) {
  const res = await api.patch('/donor/availability', { isAvailable });
  return res.data;
}

export async function getDonorHistory(): Promise<Donation[]> {
  const res = await api.get('/donor/history');
  return res.data.history;
}

export async function getDonorBadges(): Promise<Badge[]> {
  const res = await api.get('/donor/badges');
  return res.data.badges;
}
