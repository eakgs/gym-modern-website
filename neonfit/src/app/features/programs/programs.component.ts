// src/app/features/programs/programs.component.ts
import { Component } from '@angular/core';

@Component({
  standalone: true,
  selector: 'nf-programs',
  template: `
    <section class="container py-16">
      <h1 class="text-4xl font-extrabold mb-4 text-gradient">
        Signature Programs
      </h1>
      <p class="text-white/70 max-w-xl mb-8">
        Explore strength, mobility, HIIT, and dance labs engineered to
        gamify performance.
      </p>

      <div class="grid md:grid-cols-3 gap-6">
        <div class="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition">
          <h3 class="font-semibold mb-1">Strength Lab</h3>
          <p class="text-sm opacity-70">
            Periodized lifting with live AI form feedback.
          </p>
        </div>
        <div class="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition">
          <h3 class="font-semibold mb-1">Mobility Flow</h3>
          <p class="text-sm opacity-70">
            Restore range with dynamic stretch sessions.
          </p>
        </div>
        <div class="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition">
          <h3 class="font-semibold mb-1">Dance Cardio</h3>
          <p class="text-sm opacity-70">
            Rhythm-based conditioning for endurance and fun.
          </p>
        </div>
      </div>
    </section>
  `,
  styles: [
    `
      .text-gradient {
        background: linear-gradient(90deg, #34d399, #67e8f9);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
      }
    `,
  ],
})
export class ProgramsComponent {}
