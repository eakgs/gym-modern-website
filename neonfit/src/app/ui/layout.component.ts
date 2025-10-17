import { Component, effect, inject } from '@angular/core';
import { Router, RouterOutlet, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { trigger, transition, style, query, group, animate, keyframes } from '@angular/animations';
import { NavbarComponent } from './navbar.component';
import { FooterComponent } from './footer.component';
import { ProgressBarComponent } from './progress-bar.component';
import { ProgressService } from './progress.service';



// Optional: if you have a NeonGrid directive, import it; otherwise remove it.
// import { NeonGridDirective } from './neon-grid.directive';

@Component({
  standalone: true,
  selector: 'nf-layout',
  imports: [RouterOutlet, NavbarComponent, FooterComponent, ProgressBarComponent],
  animations: [
    // Neon curtain swipe (fast, subtle)
    trigger('curtain', [
      transition(':enter', [
        style({ clipPath: 'inset(0 0 100% 0)', opacity: 0.2 }),
        animate('280ms cubic-bezier(.22,.7,.27,1)',
          style({ clipPath: 'inset(0 0 0% 0)', opacity: 0 }))
      ])
    ]),

    // Shared-axis page transition: slight Z-scale + fade + blur + elevate
    trigger('routeAnimations', [
      transition('* <=> *', [
        // Keep layout stable
        query(':leave', style({ position: 'absolute', left: 0, right: 0 }), { optional: true }),
        query(':enter', style({ position: 'relative' }), { optional: true }),

        group([
          // leaving view
          query(':leave', [
            animate('360ms cubic-bezier(.2,.75,.25,1)', keyframes([
              style({ opacity: 1, filter: 'blur(0px)',   transform: 'perspective(800px) translateY(0px) scale(1)',   offset: 0 }),
              style({ opacity: .24, filter: 'blur(6px)', transform: 'perspective(800px) translateY(10px) scale(.985)', offset: 1 })
            ]))
          ], { optional: true }),

          // entering view
          query(':enter', [
            style({ opacity: 0, filter: 'blur(8px)', transform: 'perspective(800px) translateY(12px) scale(.985)' }),
            animate('420ms 60ms cubic-bezier(.2,.75,.25,1)', keyframes([
              style({ opacity: .25, filter: 'blur(4px)', transform: 'perspective(800px) translateY(4px)  scale(.995)', offset: .5 }),
              style({ opacity: 1,   filter: 'blur(0px)', transform: 'perspective(800px) translateY(0px)  scale(1)',    offset: 1 })
            ]))
          ], { optional: true })
        ])
      ])
    ])
  ],
  template: `
    <nf-progress />
    <div class="relative min-h-dvh bg-[#0a0a0b] text-white overflow-x-hidden flex flex-col will-change-transform"
         style="perspective: 800px;">
      <!-- Neon background layer -->
      <div [@curtain] class="pointer-events-none absolute inset-0 -z-10"
           style="background:
             radial-gradient(600px 600px at 18% 12%, rgba(163,230,53,0.12), transparent 40%),
             radial-gradient(900px 800px at 82% 18%, rgba(34,211,238,0.10), transparent 45%),
             linear-gradient(180deg, rgba(163,230,53,0.06), transparent),
             repeating-linear-gradient(0deg, transparent, transparent 29px, rgba(255,255,255,0.04) 30px);">
      </div>

      <nf-navbar />

      <main class="container py-8 relative flex-1 min-h-[50vh]"
            [@routeAnimations]="prepare(outlet)">
        <router-outlet #outlet="outlet"></router-outlet>
      </main>

      <nf-footer />
    </div>
  `,
})
export class LayoutComponent {
  private router = inject(Router);
  private progress = inject(ProgressService);

  constructor() {
    // start/stop progress bar on nav
    this.router.events.subscribe(e => {
      if (e instanceof NavigationStart) this.progress.start();
      if (e instanceof NavigationEnd || e instanceof NavigationCancel || e instanceof NavigationError) this.progress.stop();
    });
  }

  prepare(outlet: RouterOutlet) {
    return outlet?.activatedRouteData?.['animation'] ?? 'default';
  }
}
