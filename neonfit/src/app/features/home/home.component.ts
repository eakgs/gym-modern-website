// src/app/features/home/home.component.ts
import { Component } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { GlowCardComponent } from '../../shared/glow-card.component';
import { StatComponent } from '../../shared/stat.component';
import { CoachComponent } from '../coach/coach.component';

@Component({
  standalone: true,
  selector: 'nf-home',
  imports: [NgFor, NgIf, GlowCardComponent, StatComponent, CoachComponent],
  template: `
    <!-- Hero -->
    <section class="relative">
      <div class="max-w-7xl mx-auto px-4 py-16 md:py-24 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 class="text-4xl md:text-6xl font-extrabold leading-tight">
            Train in <span class="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-cyan-300">living color</span>.
          </h1>
          <p class="mt-4 text-white/70 max-w-xl">
            A creative fitness experience that gamifies progress, personalizes coaching, and turns every session into a win.
          </p>
          <div class="mt-6 flex flex-wrap gap-3">
            <a class="rounded-2xl px-5 py-3 font-semibold text-black bg-gradient-to-br from-emerald-400 via-lime-300 to-cyan-300 shadow-[0_0_30px_rgba(110,231,183,0.35)] animate-[pulse_1.6s_ease-in-out_infinite]">
              Join the Challenge
            </a>
            <a class="rounded-2xl px-5 py-3 font-semibold bg-white/10 border border-white/10 hover:bg-white/15">
              360° Gym Tour
            </a>
          </div>

          <div class="mt-8 grid grid-cols-3 gap-4 max-w-lg">
            <nf-stat label="Avg. HR Recovery" value="+18%"></nf-stat>
            <nf-stat label="Calories Burned" value="1.2M"></nf-stat>
            <nf-stat label="Member Streaks" value="13,284"></nf-stat>
          </div>
        </div>

        <glow-card>
          <div class="p-4 md:p-6">
            <div class="flex items-center gap-2 mb-4">
              <span class="h-5 w-5 rounded bg-white/20 inline-block"></span>
              <h3 class="font-semibold">Live Performance Panel</h3>
            </div>
            <div class="grid grid-cols-2 gap-4">
              <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                <div class="text-sm text-white/60">Output</div>
                <div class="text-3xl font-bold">742</div>
                <div class="text-xs text-white/50">Watts (peak)</div>
              </div>
              <div class="rounded-xl bg-white/5 border border-white/10 p-4">
                <div class="text-sm text-white/60">VO₂ est.</div>
                <div class="text-3xl font-bold">46</div>
                <div class="text-xs text-white/50">ml/kg/min</div>
              </div>
              <div class="col-span-2 rounded-xl bg-white/5 border border-white/10 p-4">
                <div class="text-sm text-white/60">Progress</div>
                <div class="mt-2 h-3 w-full rounded-full bg-white/10">
                  <div class="h-3 rounded-full bg-gradient-to-r from-emerald-400 to-cyan-300 w-2/3"></div>
                </div>
                <div class="mt-2 text-xs text-white/50">Week 5 of 8 — Cutting cycle</div>
              </div>
            </div>
          </div>
        </glow-card>
      </div>
    </section>

    <!-- Programs -->
    <section id="programs" class="py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center gap-2 mb-6">
          <span class="h-5 w-5 rounded bg-white/20 inline-block"></span>
          <h2 class="text-2xl md:text-3xl font-bold">Signature Programs</h2>
        </div>
        <div class="grid md:grid-cols-4 gap-4">
          <glow-card *ngFor="let p of programs">
            <div class="p-5">
              <div class="flex items-center justify-between">
                <span class="h-6 w-6 rounded bg-white/20 inline-block"></span>
                <span class="text-[10px] tracking-widest px-2 py-1 rounded-full bg-white/10 border border-white/10">{{p.tag}}</span>
              </div>
              <div class="mt-4 font-semibold">{{p.title}}</div>
              <div class="text-sm text-white/70 mt-1">{{p.desc}}</div>
              <button class="mt-4 text-sm rounded-lg px-3 py-2 bg-white/10 border border-white/10 hover:bg-white/15">Explore</button>
            </div>
          </glow-card>
        </div>
      </div>
    </section>

    <!-- Schedule + Coach -->
    <section id="schedule" class="py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4 grid md:grid-cols-3 gap-6 items-start">
        <div class="md:col-span-2">
          <div class="flex items-center gap-2 mb-6">
            <span class="h-5 w-5 rounded bg-white/20 inline-block"></span>
            <h2 class="text-2xl md:text-3xl font-bold">Today’s Schedule</h2>
          </div>
          <glow-card>
            <div class="p-4 md:p-6 divide-y divide-white/10">
              <div *ngFor="let s of schedule" class="py-3 flex items-center justify-between">
                <div class="flex items-center gap-4">
                  <div class="text-lg font-mono">{{s.time}}</div>
                  <div>
                    <div class="font-semibold">{{s.title}}</div>
                    <div class="text-xs text-white/60">Coach {{s.coach}}</div>
                  </div>
                </div>
                <button class="rounded-lg px-3 py-1.5 text-sm bg-emerald-500/90 text-black font-semibold">Book</button>
              </div>
            </div>
          </glow-card>
        </div>

        <nf-coach />
      </div>
    </section>

    <!-- Community -->
    <section id="community" class="py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center gap-2 mb-6">
          <span class="h-5 w-5 rounded bg-white/20 inline-block"></span>
          <h2 class="text-2xl md:text-3xl font-bold">Community Wins</h2>
        </div>
        <glow-card>
          <div class="p-4 md:p-6 grid md:grid-cols-3 gap-4">
            <div *ngFor="let b of badges" class="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-4">
              <span class="h-5 w-5 rounded bg-white/20 inline-block"></span>
              <div class="font-medium">{{b}}</div>
            </div>
            <div class="rounded-xl border border-dashed border-white/20 p-4 text-sm text-white/60">
              Link Instagram/TikTok to auto-celebrate member milestones.
            </div>
          </div>
        </glow-card>
      </div>
    </section>

    <!-- Pricing -->
    <section id="pricing" class="py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <div class="flex items-center gap-2 mb-6">
          <span class="h-5 w-5 rounded bg-white/20 inline-block"></span>
          <h2 class="text-2xl md:text-3xl font-bold">Memberships</h2>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <glow-card *ngFor="let tier of tiers; index as i">
            <div class="p-5">
              <div class="text-sm text-white/60">{{tier}}</div>
              <div class="mt-1 text-3xl font-extrabold">{{ i===0 ? 'LKR 6,900' : i===1 ? 'LKR 12,900' : 'LKR 19,900' }}</div>
              <ul class="mt-4 space-y-2 text-sm text-white/80">
                <li>✓ Unlimited classes</li>
                <li>✓ AI coach plan</li>
                <li>✓ Leaderboards</li>
                <li *ngIf="i>0">✓ Sauna & recovery</li>
                <li *ngIf="i===2">✓ 1:1 coaching + labs</li>
              </ul>
              <button class="mt-5 w-full rounded-xl py-2.5 font-semibold bg-white/10 border border-white/10 hover:bg-white/15">
                Choose {{tier}}
              </button>
            </div>
          </glow-card>
        </div>
      </div>
    </section>

    <!-- Shop CTA -->
    <section id="shop" class="py-12 md:py-20">
      <div class="max-w-7xl mx-auto px-4">
        <glow-card>
          <div class="p-6 md:p-10 grid md:grid-cols-2 gap-6 items-center">
            <div>
              <h3 class="text-2xl md:text-3xl font-bold">Merch that Moves</h3>
              <p class="mt-2 text-white/70">Performance tees, neon bottles, and grip socks engineered for sweat and swagger.</p>
              <div class="mt-4 flex gap-3">
                <button class="rounded-xl px-5 py-3 font-semibold bg-emerald-500/90 text-black">Browse Store</button>
                <button class="rounded- xl px-5 py-3 font-semibold bg-white/10 border border-white/10 hover:bg-white/15">Lookbook</button>
              </div>
            </div>
            <div class="grid grid-cols-3 gap-3">
              <div class="h-28 rounded-xl bg-white/5 border border-white/10" *ngFor="let _ of [0,1,2,3,4,5]"></div>
            </div>
          </div>
        </glow-card>
      </div>
    </section>
  `,
})
export class HomeComponent {
  programs = [
    { title: 'Strength Lab', desc: 'Periodized lifting with live form cues', tag: 'PRO' },
    { title: 'Metabolic Burn', desc: 'HIIT + heart-rate guided intervals', tag: 'HIIT' },
    { title: 'Mobility Flow', desc: 'Restore range with breath + stretch', tag: 'RECOVER' },
    { title: 'Dance Cardio', desc: 'Rhythm-driven sweat sessions', tag: 'FUN' },
  ];
  schedule = [
    { time: '06:30', title: 'Sunrise HIIT', coach: 'Asha' },
    { time: '09:00', title: 'Strength Lab', coach: 'Ravindu' },
    { time: '17:30', title: 'Mobility Flow', coach: 'Imasha' },
    { time: '19:00', title: 'Dance Cardio', coach: 'Kavi' },
  ];
  badges = ['7-Day Streak', '1k Calories', 'Form Master'];
  tiers = ['Starter', 'Athlete', 'Pro'];
}
