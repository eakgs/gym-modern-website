import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink], // <-- add RouterLink
  template: `
  <section class="min-h-dvh grid place-items-center px-4">
    <div class="w-full max-w-sm p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md">
      <h1 class="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
        Sign in
      </h1>
      <form class="space-y-3" (ngSubmit)="submit()" autocomplete="on">
        <input [(ngModel)]="email" name="email" type="email" placeholder="Email"
               class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none"
               required autofocus />
        <input [(ngModel)]="password" name="password" type="password" placeholder="Password"
               class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none"
               required />
        <button type="submit"
          class="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-300">
          Login
        </button>
      </form>
      <p class="text-center text-sm mt-6 text-white/70">
        New to 4ZGYM?
        <a routerLink="/signup" class="text-emerald-400 hover:underline">Create account</a>
      </p>
    </div>
  </section>
  `,
})
export class SignInComponent {
  private auth = inject(AuthService);
  private router = inject(Router);
  email = '';
  password = '';

  async submit() {
    try {
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/account');
    } catch (e: any) {
      alert(e?.error?.message || 'Login failed');
    }
  }
}
