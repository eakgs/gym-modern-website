import { Component, computed, inject } from '@angular/core';
import { ProgressService } from './progress.service';

@Component({
  standalone: true,
  selector: 'nf-progress',
  template: `<div *ngIf="show()" class="fixed left-0 right-0 top-0 z-[60] h-[2px] overflow-hidden">
    <div class="h-full animate-[bar_1.2s_ease-in-out_infinite] bg-gradient-to-r from-emerald-400 via-lime-300 to-cyan-300"></div>
  </div>`,
  styles: [`
    @keyframes bar {
      0% { transform: translateX(-30%); width: 30%; }
      50% { transform: translateX(40%); width: 50%; }
      100% { transform: translateX(110%); width: 20%; }
    }
  `]
})
export class ProgressBarComponent {
  private p = inject(ProgressService);
  show = computed(() => this.p.active());
}
