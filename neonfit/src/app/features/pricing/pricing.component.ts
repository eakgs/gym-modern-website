import { Component, signal, computed } from '@angular/core';
import { NgFor, NgIf, DecimalPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

type Period = 'monthly' | 'annual';

interface Tier {
  id: string;
  name: string;
  blurb: string;
  badge?: 'Best Value' | 'Popular' | 'New';
  priceMonthly: number; // LKR
  priceAnnual: number;  // LKR (per month equivalent)
  features: string[];
  extras?: string[];
  cta: string;
}

@Component({
  standalone: true,
  selector: 'nf-pricing',
  imports: [NgFor, NgIf, DecimalPipe, RouterLink],
  templateUrl: './pricing.component.html',
  styleUrls: ['./pricing.component.css'],
})
export class PricingComponent {
  period = signal<Period>('monthly');

  readonly tiers: Tier[] = [
    {
      id: 'starter',
      name: 'Starter',
      blurb: 'Unlimited classes + app access',
      priceMonthly: 6900,
      priceAnnual: 5900,
      features: [
        'Unlimited group classes',
        'AI coach plan (basic)',
        'Community challenges',
        'Leaderboards',
      ],
      cta: 'Choose Starter',
    },
    {
      id: 'athlete',
      name: 'Athlete',
      blurb: 'Performance coaching & recovery',
      badge: 'Best Value',
      priceMonthly: 12900,
      priceAnnual: 10900,
      features: ['Everything in Starter'],
      extras: [
        'Sauna & recovery access',
        'Form checks (2×/mo)',
        'Advanced AI insights',
      ],
      cta: 'Choose Athlete',
    },
    {
      id: 'pro',
      name: 'Pro',
      blurb: '1:1 coaching + lab testing',
      badge: 'Popular',
      priceMonthly: 19900,
      priceAnnual: 16900,
      features: ['Everything in Athlete'],
      extras: [
        '1:1 coaching (weekly)',
        'Performance lab sessions',
        'Priority booking',
      ],
      cta: 'Choose Pro',
    },
  ];

  priceFor(t: Tier) {
    return this.period() === 'monthly' ? t.priceMonthly : t.priceAnnual;
  }

  tableRows = computed(() => {
    const base = new Set<string>();
    const extra = new Set<string>();
    for (const t of this.tiers) {
      t.features.forEach((f) => base.add(f));
      t.extras?.forEach((e) => extra.add(e));
    }
    return { base: Array.from(base), extra: Array.from(extra) };
  });

  toggle(p: Period) {
    this.period.set(p);
  }

  choose(tier: Tier) {
    window.location.href = `/signup?plan=${tier.id}&period=${this.period()}`;
  }
}
