import { Component, OnInit, inject } from '@angular/core';
import { NgFor } from '@angular/common';
import { ApiService } from '../../core/api.service';

@Component({
  standalone: true,
  imports: [NgFor],
  template: `
  <section>
    <h2 class="text-3xl font-bold mb-6">Today’s Schedule</h2>
    <div class="card divide-y divide-line">
      <div *ngFor="let s of schedule" class="py-3 px-4 flex items-center justify-between">
        <div class="flex items-center gap-4">
          <div class="text-lg font-mono">{{s.time}}</div>
          <div>
            <div class="font-semibold">{{s.title}}</div>
            <div class="text-xs opacity-70">Coach {{s.coach}}</div>
          </div>
        </div>
        <button (click)="book(s)" class="btn-primary">Book</button>
      </div>
    </div>
  </section>
  `,
})
export class ScheduleComponent implements OnInit {
  private api = inject(ApiService);
  schedule: any[] = [];
  ngOnInit() { this.api.getSchedule().subscribe((r: any) => this.schedule = r); }
  book(s: any) {
    const name = prompt('Your name?');
    if (!name) return;
    this.api.book({ classTitle: s.title, time: s.time, memberName: name }).subscribe({
      next: (r: any) => alert(r.message || 'Booked!'),
      error: (e) => alert(e.error?.message || 'Failed'),
    });
  }
}
