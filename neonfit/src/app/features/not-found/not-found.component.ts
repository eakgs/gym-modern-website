import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'nf-not-found',
  imports: [RouterLink],
  template: `
    <section class="container py-24 text-center">
      <div class="text-7xl font-extrabold">404</div>
      <p class="text-mute mt-2 mb-6">That route skipped leg day.</p>
      <a routerLink="/" class="btn-ghost">Go Home</a>
    </section>
  `,
})
export class NotFoundComponent {}
