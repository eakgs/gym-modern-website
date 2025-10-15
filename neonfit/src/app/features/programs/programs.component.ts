import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [NgFor],
  template: `
  <section>
    <h2 class="text-3xl font-bold mb-6">Signature Programs</h2>
    <div class="grid md:grid-cols-4 gap-4">
      <article *ngFor="let p of programs" class="card p-5">
        <div class="flex items-center justify-between">
          <div class="font-semibold">{{p.title}}</div>
          <span class="text-[10px] tracking-widest px-2 py-1 rounded-full bg-white/10 border border-line">{{p.tag}}</span>
        </div>
        <p class="text-sm text-mute mt-2">{{p.description}}</p>
        <button class="btn-ghost mt-4">Explore</button>
      </article>
    </div>
  </section>
  `,
})
export class ProgramsComponent implements OnInit {
  private api = inject(ApiService);
  programs: any[] = [];
  ngOnInit() { this.api.getPrograms().subscribe((r: any) => this.programs = r); }
}
