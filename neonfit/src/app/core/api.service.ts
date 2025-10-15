import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../app.config';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private http = inject(HttpClient);
  private base = environment.apiBase;

  getPrograms()  { return this.http.get(`${this.base}/api/programs`); }
  getSchedule()  { return this.http.get(`${this.base}/api/schedule`); }
  book(body: { classTitle: string; time: string; memberName: string }) {
    return this.http.post(`${this.base}/api/booking`, body);
  }
  chat(prompt: string) {
    return this.http.post(`${this.base}/api/chat`, { role: 'user', content: prompt });
  }
}
