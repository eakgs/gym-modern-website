import { Component } from '@angular/core';
import { GlowCardComponent } from '../../shared/glow-card.component';


@Component({
standalone: true,
selector: 'nf-shop',
imports: [GlowCardComponent],
template: `
<section class="py-12 max-w-6xl mx-auto px-4">
<h2 class="text-3xl font-bold mb-6">Merch that Moves</h2>
<glow-card>
<div class="p-6 grid md:grid-cols-2 gap-6 items-center">
<div>
<p class="text-white/70">Performance tees, neon bottles, and grip socks engineered for sweat and swagger.</p>
<div class="mt-4 flex gap-3">
<button class="rounded-xl px-5 py-3 font-semibold bg-emerald-500/90 text-black">Browse Store</button>
<button class="rounded-xl px-5 py-3 font-semibold bg-white/10 border border-white/10 hover:bg-white/15">Lookbook</button>
</div>
</div>
<div class="grid grid-cols-3 gap-3">
<div class="h-28 rounded-xl bg-white/5 border border-white/10"></div>
<div class="h-28 rounded-xl bg-white/5 border border-white/10"></div>
<div class="h-28 rounded-xl bg-white/5 border border-white/10"></div>
<div class="h-28 rounded-xl bg-white/5 border border-white/10"></div>
<div class="h-28 rounded-xl bg-white/5 border border-white/10"></div>
<div class="h-28 rounded-xl bg-white/5 border border-white/10"></div>
</div>
</div>
</glow-card>
</section>
`,
})
export class ShopComponent {}