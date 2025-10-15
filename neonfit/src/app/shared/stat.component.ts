// src/app/shared/stat.component.ts
import { Component, Input } from '@angular/core';

@Component({
  selector: 'nf-stat',           // <- USE THIS TAG IN TEMPLATES
  standalone: true,
  template: `
    <div class="flex items-center gap-3">
      <div class="h-10 w-10 rounded-xl bg-white/5 border border-white/10 grid place-items-center">
        <span class="text-sm">★</span>
      </div>
      <div>
        <div class="text-sm text-white/60">{{label}}</div>
        <div class="text-lg font-semibold">{{value}}</div>
      </div>
    </div>
  `,
})
export class StatComponent {
  @Input() label = '';
  @Input() value = '';
}
