import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  standalone: true,
  selector: 'nf-navbar',
  imports: [RouterLink, RouterLinkActive],
  template: `
  <header class="sticky top-0 z-40 bg-[#0a0a0b]/70 backdrop-blur border-b border-white/10">
    <div class="container h-14 flex items-center justify-between">
      <a routerLink="/" class="flex items-center gap-2">
        <span class="h-6 w-6 rounded-md bg-gradient-to-br from-emerald-400 via-lime-300 to-cyan-300 block"></span>
        <span class="font-bold tracking-wide">NEONFIT</span>
      </a>

      <nav class="hidden md:flex gap-8 text-sm font-medium">
        <a
          routerLink="/"
          routerLinkActive="active-link"
          [routerLinkActiveOptions]="{ exact: true }"
          class="nav-link"
        >Home</a>

        <a routerLink="/programs" routerLinkActive="active-link" class="nav-link">Programs</a>
        <a routerLink="/schedule" routerLinkActive="active-link" class="nav-link">Schedule</a>
        <a routerLink="/pricing"  routerLinkActive="active-link" class="nav-link">Pricing</a>
        <a routerLink="/shop"     routerLinkActive="active-link" class="nav-link">Shop</a>
      </nav>

      <a
        routerLink="/signin"
        class="rounded-xl px-4 py-1.5 font-semibold text-black bg-gradient-to-r from-emerald-400 to-cyan-300 hover:opacity-90 transition"
      >
        Login
      </a>
    </div>
  </header>
  `,
  styles: [`
    .nav-link {
      position: relative;
      color: rgba(255,255,255,0.8);
      transition: color 0.2s;
    }
    .nav-link:hover {
      color: white;
    }
    .nav-link:hover::after {
     width: 40%;
     background: linear-gradient(90deg, #34d399, #67e8f9);
    }

    /* active underline */
    .nav-link.active-link::after {
      content: '';
      position: absolute;
      left: 0;
      bottom: -6px;
      height: 2px;
      width: 100%;
      background: linear-gradient(90deg, #34d399, #67e8f9);
      border-radius: 1px;
    }

    /* inactive links have no underline */
    .nav-link::after {
      content: '';
      position: absolute;
      bottom: -6px;
      left: 0;
      height: 2px;
      width: 0;
      background: transparent;
      transition: width 0.2s;
    }
  `]
})
export class NavbarComponent {}
