// src/app/shared/glow-card.component.ts
import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'glow-card',
  standalone: true,
  imports: [NgClass],
  template: `
    <div class="relative rounded-2xl p-[1px] overflow-hidden" [ngClass]="class">
      <div class="absolute inset-0 blur-xl opacity-60 bg-gradient-to-tr from-emerald-500 via-lime-400 to-cyan-400"></div>
      <div class="relative rounded-2xl bg-zinc-900/80 backdrop-blur-sm border border-white/10">
        <ng-content></ng-content>
      </div>
    </div>
  `,
})
export class GlowCardComponent { @Input() class = ''; }
