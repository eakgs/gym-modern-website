import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'nf-footer',
  template: `
  <footer class="border-t border-line mt-12">
    <div class="container py-6 text-sm flex items-center justify-between">
      <div class="flex items-center gap-2">
        <span class="h-5 w-5 rounded neon-grad block"></span>
        <span class="opacity-70">© {{year}} NEONFIT</span>
      </div>
      <div class="flex gap-4 opacity-80">
        <a class="hover:opacity-100" href="#">Privacy</a>
        <a class="hover:opacity-100" href="#">Terms</a>
        <a class="hover:opacity-100" href="#">Contact</a>
      </div>
    </div>
  </footer>
  `,
})
export class FooterComponent { year = new Date().getFullYear(); }
