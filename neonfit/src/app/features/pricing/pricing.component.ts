// src/app/features/pricing/pricing.component.ts
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GlowCardComponent } from '../../shared/glow-card.component';

@Component({
  standalone: true,
  selector: 'nf-pricing',
  imports: [NgFor, NgIf, GlowCardComponent],
  template: `
  <section class="py-12 max-w-6xl mx-auto px-4">
    <h2 class="text-3xl font-bold mb-6">Memberships</h2>
    <div class="grid md:grid-cols-3 gap-4">
      <glow-card *ngFor="let t of tiers">
        <div class="p-5">
          <div class="text-sm text-white/60">{{t.name}}</div>
          <div class="mt-1 text-3xl font-extrabold">{{t.price}}</div>
          <ul class="mt-4 space-y-2 text-sm text-white/80">
            <li>✓ Unlimited classes</li>
            <li>✓ AI coach plan</li>
            <li>✓ Leaderboards</li>
            <li *ngIf="t.name !== 'Starter'">✓ Sauna & recovery</li>
            <li *ngIf="t.name === 'Pro'">✓ 1:1 coaching + labs</li>
          </ul>
          <button class="mt-5 w-full rounded-xl py-2.5 font-semibold bg-white/10 border border-white/10 hover:bg-white/15">Choose {{t.name}}</button>
        </div>
      </glow-card>
    </div>
  </section>
  `,
})
export class PricingComponent {
  tiers = [
    { name: 'Starter', price: 'LKR 6,900' },
    { name: 'Athlete', price: 'LKR 12,900' },
    { name: 'Pro', price: 'LKR 19,900' },
  ];
}
