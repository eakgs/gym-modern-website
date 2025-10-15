import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NgFor, NgClass } from '@angular/common';
import { GlowCardComponent } from '../../shared/glow-card.component';

@Component({
  standalone: true,
  selector: 'nf-coach',
  imports: [FormsModule, NgFor, NgClass, GlowCardComponent],
  template: `
    <glow-card>
      <div class="p-4 md:p-6">
        <div class="flex items-center gap-2 mb-4">
          <span class="h-5 w-5 rounded bg-white/20 inline-block"></span>
          <h3 class="font-semibold">AI Coach</h3>
        </div>
        <div class="h-48 overflow-y-auto space-y-3 pr-2">
          <div *ngFor="let m of messages" class="text-sm" [ngClass]="m.role === 'assistant' ? 'text-white/80' : 'text-emerald-300'">
            <span class="opacity-60 mr-2">{{ m.role === 'assistant' ? 'Coach' : 'You' }}:</span>{{ m.content }}
          </div>
        </div>
        <div class="mt-4 flex gap-2">
          <input [(ngModel)]="input" placeholder="e.g., Lose fat, keep muscle in 8 weeks"
                 class="flex-1 rounded-xl bg-white/5 border border-white/10 px-3 py-2 outline-none focus:border-emerald-400/50"/>
          <button (click)="send()" class="rounded-xl px-4 py-2 bg-emerald-500/90 hover:bg-emerald-400 text-black font-semibold">Coach</button>
        </div>
      </div>
    </glow-card>
  `,
})
export class CoachComponent {
  messages = [{ role: 'assistant', content: "Welcome! Tell me your goal and schedule. I'll craft a plan." }];
  input = '';
  send() {
    if (!this.input.trim()) return;
    this.messages.push({ role: 'user', content: this.input } as any);
    this.messages.push({ role: 'assistant', content: 'Plan: 3x Strength (Mon/Wed/Fri), 2x HIIT (Tue/Sat), Mobility 10m/day.' });
    this.input = '';
  }
}
