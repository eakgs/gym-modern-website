import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../core/auth.service';

@Component({
  standalone: true,
  imports: [FormsModule, RouterLink],
  template: `
  <section class="min-h-dvh grid place-items-center bg-[#0a0a0b] text-white px-4">
    <div class="w-full max-w-sm p-8 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-md shadow-[0_0_50px_rgba(110,231,183,0.2)]">
      <h1 class="text-3xl font-extrabold text-center mb-6 bg-gradient-to-r from-emerald-400 to-cyan-300 bg-clip-text text-transparent">
        Create account
      </h1>

      <form class="space-y-3" (ngSubmit)="submit()">
        <input [(ngModel)]="name" name="name" placeholder="Full name"
               class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-emerald-400/50" required />
        <input [(ngModel)]="email" name="email" type="email" placeholder="Email"
               class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-emerald-400/50" required />
        <input [(ngModel)]="password" name="password" [type]="show ? 'text' : 'password'" placeholder="Password (min 8)"
               class="w-full px-4 py-3 rounded-xl bg-white/10 border border-white/10 outline-none focus:border-emerald-400/50" required minlength="8" />
        <label class="flex items-center gap-2 text-xs text-white/60">
          <input type="checkbox" [(ngModel)]="show" name="show" class="accent-emerald-400"> Show password
        </label>

        <button type="submit"
          class="w-full py-3 rounded-xl font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-300 hover:opacity-90 transition">
          Sign up
        </button>
      </form>

      <p class="text-center text-sm mt-6 text-white/70">
        Already have an account?
        <a routerLink="/signin" class="text-emerald-400 hover:underline">Sign in</a>
      </p>
    </div>
  </section>
  `,
})
export class SignUpComponent {
  private auth = inject(AuthService);
  private router = inject(Router);

  name = '';
  email = '';
  password = '';
  show = false;

  async submit() {
    if (!this.name || !this.email || !this.password) return alert('Fill all fields');
    try {
      await this.auth.register(this.email, this.password, this.name);
      // Optional: auto-login after register
      await this.auth.login(this.email, this.password);
      this.router.navigateByUrl('/account');
    } catch (e:any) {
      alert(e?.error?.message || 'Sign-up failed');
    }
  }
}
