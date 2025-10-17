import { Injectable, signal, computed, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment.development';

export interface User { id: number; email: string; name?: string; }

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  private _user = signal<User | null>(readUser());
  user = computed(() => this._user());
  token: string | null = localStorage.getItem('neonfit:token');

async register(email: string, password: string, name: string) {
  return this.http.post(`${this.base}/api/auth/register`, { email, password, name }).toPromise();
}

  async login(email: string, password: string) {
    const res = await this.http.post<any>(`${this.base}/api/auth/login`, { email, password }).toPromise();
    this.token = res?.token || null;
    if (this.token) localStorage.setItem('neonfit:token', this.token);
    if (res?.user) { this._user.set(res.user); writeUser(res.user); }
    return res?.user as User;
  }

  logout() { this._user.set(null); writeUser(null); this.token = null; localStorage.removeItem('neonfit:token'); }
  isAuthed() { return !!this.token; }
}

function readUser(): User | null { try { return JSON.parse(localStorage.getItem('neonfit:user') || 'null'); } catch { return null; } }
function writeUser(u: User | null) { if (u) localStorage.setItem('neonfit:user', JSON.stringify(u)); else localStorage.removeItem('neonfit:user'); }
