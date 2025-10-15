import { Component } from '@angular/core';
import { GlowCardComponent } from '../../shared/glow-card.component';


@Component({
standalone: true,
selector: 'nf-community',
imports: [GlowCardComponent],
template: `
<section class="py-12 max-w-6xl mx-auto px-4">
<h2 class="text-3xl font-bold mb-6">Community Wins</h2>
<glow-card>
<div class="p-6 grid md:grid-cols-3 gap-4">
<div class="rounded-xl bg-white/5 border border-white/10 p-4">🏆 7-Day Streak</div>
<div class="rounded-xl bg-white/5 border border-white/10 p-4">⚡ 1k Calories</div>
<div class="rounded-xl bg-white/5 border border-white/10 p-4">⭐ Form Master</div>
<div class="rounded-xl border border-dashed border-white/20 p-4 text-sm text-white/60">Connect IG/TikTok to auto-celebrate milestones.</div>
</div>
</glow-card>
</section>
`,
})
export class CommunityComponent {}