import { Injectable, signal } from '@angular/core';
@Injectable({ providedIn: 'root' })
export class ProgressService {
  active = signal(false);
  start() { this.active.set(true); }
  stop()  { this.active.set(false); }
}
