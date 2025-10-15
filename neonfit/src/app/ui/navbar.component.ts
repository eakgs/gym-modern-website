import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'nf-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <header class="sticky top-0 z-40 bg-bg/70 backdrop-blur border-b border-line">
    <div class="container h-14 flex items-center justify-between">
      <a routerLink="/" class="flex items-center gap-2">
        <span class="h-6 w-6 rounded-md neon-grad block"></span>
        <span class="font-display text-lg tracking-wide">NEONFIT</span>
      </a>

      <nav class="hidden md:flex gap-5 text-sm">
        <a routerLink="/" routerLinkActive="opacity-100" class="opacity-80 hover:opacity-100">Home</a>
        <a routerLink="/programs" routerLinkActive="opacity-100" class="opacity-80 hover:opacity-100">Programs</a>
        <a routerLink="/schedule" routerLinkActive="opacity-100" class="opacity-80 hover:opacity-100">Schedule</a>
        <a routerLink="/coach" routerLinkActive="opacity-100" class="opacity-80 hover:opacity-100">AI Coach</a>
      </nav>

      <button class="md:hidden btn-ghost" aria-label="Open menu">☰</button>
    </div>
  </header>
  `,
})
export class NavbarComponent {}
