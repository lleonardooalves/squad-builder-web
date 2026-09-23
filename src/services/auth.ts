import { API_URL } from '../config/api';
import type { User } from '../types/user';

type AuthResponse = { access_token: string };

export async function login(email: string, password: string): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });

  if (!response.ok) {
    throw new Error('E-mail ou senha inválidos');
  }

  return response.json();
}

export async function register(
  email: string,
  password: string,
  name?: string,
): Promise<AuthResponse> {
  const response = await fetch(`${API_URL}/auth/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, name }),
  });

  if (!response.ok) {
    throw new Error('Não foi possível criar conta');
  }

  return response.json();
}

export async function getMe(token: string): Promise<User> {
  const response = await fetch(`${API_URL}/auth/me`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) {
    throw new Error('Sessao inválida');
  }

  return response.json();
}
