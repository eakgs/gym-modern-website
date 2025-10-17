import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [RouterLink],
  template: `
  <section class="container py-12 max-w-3xl">
    <h1 class="text-4xl font-extrabold mb-2">Your Account</h1>
    <p class="text-white/70 mb-6">Manage profile and bookings.</p>
    <div class="p-6 rounded-2xl bg-white/5 border border-white/10">
      <div class="font-semibold">{{user?.name || user?.email}}</div>
      <div class="text-sm text-white/60">{{user?.email}}</div>
      <div class="mt-6 flex gap-3">
        <a routerLink="/schedule" class="rounded-xl px-4 py-2 bg-white/10 border border-white/10">Schedule</a>
        <button class="rounded-xl px-4 py-2 bg-white/10 border border-white/10" (click)="logout()">Sign out</button>
      </div>
    </div>
  </section>
  `,
})
export class AccountComponent {
  private auth = inject(AuthService);
  user = this.auth.user();
  logout() { this.auth.logout(); location.href = '/'; }
}
