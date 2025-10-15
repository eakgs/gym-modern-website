import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NeonGridDirective } from './ui/neon-grid.directive';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NeonGridDirective],
  template: `
    <!-- Top-level wrapper needs position: relative to anchor the absolute neon layer -->
    <div class="relative min-h-dvh bg-[#0a0a0b] text-white overflow-x-hidden">

      <!-- 🔹 Neon background container (top-most, non-interactive) -->
      <div
        neonGrid
        class="pointer-events-none absolute inset-0 -z-10"
        style="
          background:
            radial-gradient(600px circle at var(--x) var(--y), rgba(163,230,53,0.18), transparent 40%),
            linear-gradient(180deg, rgba(163,230,53,0.10), transparent),
            repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(255,255,255,0.04) 30px);
        ">
      </div>

      <!-- Your actual UI goes here -->
      <header class="sticky top-0 z-40 backdrop-blur bg-[#0a0a0b]/60 border-b border-white/10">
        <div class="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-7 w-7 rounded-lg bg-gradient-to-br from-emerald-400 via-lime-300 to-cyan-300"></div>
            <span class="font-bold tracking-wide">NEONFIT</span>
          </div>
          <nav class="hidden md:flex gap-6 text-sm text-white/80">
            <a routerLink="/" class="hover:text-white">Home</a>
            <a routerLink="/programs" class="hover:text-white">Programs</a>
            <a routerLink="/schedule" class="hover:text-white">Schedule</a>
            <a routerLink="/coach" class="hover:text-white">AI Coach</a>
          </nav>
          <button class="rounded-xl px-3 py-1.5 bg-white/10 hover:bg-white/15 border border-white/10 text-sm">
            Sign In
          </button>
        </div>
      </header>

      <main class="max-w-7xl mx-auto px-4 py-8">
        <router-outlet />
      </main>

      <footer class="border-t border-white/10">
        <div class="max-w-7xl mx-auto px-4 py-6 text-sm flex items-center justify-between">
          <div class="flex items-center gap-2">
            <div class="h-5 w-5 rounded bg-gradient-to-br from-emerald-400 via-lime-300 to-cyan-300"></div>
            <span class="opacity-70">© {{year}} NEONFIT</span>
          </div>
          <div class="flex gap-4 opacity-80">
            <a class="hover:opacity-100" href="#">Privacy</a>
            <a class="hover:opacity-100" href="#">Terms</a>
            <a class="hover:opacity-100" href="#">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  `,
})
export class AppComponent {
  year = new Date().getFullYear();
}
