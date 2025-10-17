import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';

type ClassType = 'Strength' | 'HIIT' | 'Mobility' | 'Endurance' | 'Dance';

interface GymClass {
  id: string;
  title: string;
  type: ClassType;
  start: string;    // ISO local for demo; swap to UTC from backend later
  minutes: number;
  coach: string;
  capacity: number;
  booked: number;
  room: string;
}

interface ChatMsg {
  role: 'user' | 'assistant';
  content: string;
}

@Component({
  standalone: true,
  selector: 'nf-schedule',
  imports: [NgFor, NgIf, FormsModule, DatePipe],
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css'],
})
export class ScheduleComponent {
  // ---- Demo data -----------------------------------------------------------
  readonly classes: GymClass[] = [
    { id: 'c1',  title: 'Sunrise HIIT',  type: 'HIIT',      start: '2025-10-17T06:30:00', minutes: 35, coach: 'Asha',    capacity: 18, booked: 14, room: 'Studio A' },
    { id: 'c2',  title: 'Strength Lab',  type: 'Strength',  start: '2025-10-17T09:00:00', minutes: 55, coach: 'Ravindu', capacity: 16, booked: 11, room: 'Rack Zone' },
    { id: 'c3',  title: 'Mobility Flow', type: 'Mobility',  start: '2025-10-17T17:30:00', minutes: 30, coach: 'Imasha',  capacity: 20, booked: 9,  room: 'Studio B' },
    { id: 'c4',  title: 'Dance Cardio',  type: 'Dance',     start: '2025-10-17T19:00:00', minutes: 45, coach: 'Kavi',    capacity: 30, booked: 24, room: 'Main Hall' },
    { id: 'c5',  title: 'Strength Lab',  type: 'Strength',  start: '2025-10-18T08:00:00', minutes: 55, coach: 'Ravindu', capacity: 16, booked: 7,  room: 'Rack Zone' },
    { id: 'c6',  title: 'Zone 2 Engine', type: 'Endurance', start: '2025-10-18T17:00:00', minutes: 50, coach: 'Dev',     capacity: 14, booked: 5,  room: 'Cardio Bay' },
    { id: 'c7',  title: 'Mobility Flow', type: 'Mobility',  start: '2025-10-18T18:00:00', minutes: 30, coach: 'Imasha',  capacity: 20, booked: 6,  room: 'Studio B' },
    { id: 'c8',  title: 'Athlete Engine',type: 'Strength',  start: '2025-10-19T18:30:00', minutes: 45, coach: 'Kavi',    capacity: 16, booked: 10, room: 'Turf' },
    { id: 'c9',  title: 'Metabolic Burn',type: 'HIIT',      start: '2025-10-19T07:00:00', minutes: 35, coach: 'Asha',    capacity: 18, booked: 15, room: 'Studio A' },
    { id: 'c10', title: 'Dance Cardio',  type: 'Dance',     start: '2025-10-20T19:15:00', minutes: 40, coach: 'Maya',    capacity: 28, booked: 22, room: 'Main Hall' },
    { id: 'c11', title: 'Mobility Flow', type: 'Mobility',  start: '2025-10-20T12:30:00', minutes: 25, coach: 'Imasha',  capacity: 20, booked: 12, room: 'Studio B' },
    { id: 'c12', title: 'Engine Cut',    type: 'Endurance', start: '2025-10-20T06:30:00', minutes: 50, coach: 'Dev',     capacity: 14, booked: 13, room: 'Cardio Bay' },
  ];

  // ---- UI state ------------------------------------------------------------
  readonly today = new Date();
  readonly days = Array.from({ length: 7 }, (_, i) => {
    const d = new Date(this.today);
    d.setDate(this.today.getDate() + i);
    return d;
  });

  selectedDate = signal<Date>(this.today);
  q = signal<string>('');
  filterType = signal<ClassType | 'All'>('All');
  onlySpots = signal<boolean>(false);

  // ---- Chat state ----------------------------------------------------------
  messages = signal<ChatMsg[]>([
    { role: 'assistant', content: 'Tell me your goal and availability. I’ll draft a week you can book with one click.' }
  ]);
  draft = signal<string>('');

  // ---- Derived views -------------------------------------------------------
  dayKey(d: Date) { return d.toISOString().slice(0, 10); } // YYYY-MM-DD

  classesForSelected = computed(() => {
    const key = this.dayKey(this.selectedDate());
    const q = this.q().trim().toLowerCase();
    const type = this.filterType();
    const only = this.onlySpots();

    return this.classes
      .filter(c => c.start.slice(0, 10) === key)
      .filter(c => type === 'All' ? true : c.type === type)
      .filter(c =>
        !q ||
        c.title.toLowerCase().includes(q) ||
        c.coach.toLowerCase().includes(q) ||
        c.type.toLowerCase().includes(q)
      )
      .filter(c => only ? c.booked < c.capacity : true)
      .sort((a, b) => a.start.localeCompare(b.start));
  });

  // ---- Actions -------------------------------------------------------------
  pick(d: Date) { this.selectedDate.set(new Date(d)); }
  book(cls: GymClass) {
    alert(`Booked: ${cls.title} with ${cls.coach} on ${new Date(cls.start).toLocaleString()}`);
  }

  // ---- Template event handlers (no casts in template) ----------------------
  onQuery(e: Event) {
    const value = (e.target as HTMLInputElement)?.value ?? '';
    this.q.set(value);
  }
  onTypeChange(e: Event) {
    const value = (e.target as HTMLSelectElement)?.value as ClassType | 'All';
    this.filterType.set(value ?? 'All');
  }
  onOnlySpotsChange(e: Event) {
    const checked = (e.target as HTMLInputElement)?.checked ?? false;
    this.onlySpots.set(checked);
  }
  onDraftInput(e: Event) {
    const value = (e.target as HTMLInputElement)?.value ?? '';
    this.draft.set(value);
  }

  // ---- Tiny mock "AI" ------------------------------------------------------
  quickPrompt(p: string) { this.draft.set(p); }
  send() {
    const text = this.draft().trim();
    if (!text) return;
    this.messages.update(m => [...m, { role: 'user', content: text }]);
    const plan = this.generatePlan(text);
    this.messages.update(m => [...m, { role: 'assistant', content: plan }]);
    this.draft.set('');
  }

  private generatePlan(input: string): string {
    const lower = input.toLowerCase();
    const wantFatLoss   = /fat|weight|cut/.test(lower) || /hiit|cardio/.test(lower);
    const wantStrength  = /strength|muscle|hypertrophy|bulk|lift/.test(lower);
    const days = /(\d)\s*(x|days?)/.exec(lower)?.[1] ?? '';

    const picks = (type: ClassType, count: number) =>
      this.classes
        .filter(c => c.type === type && c.booked < c.capacity)
        .sort((a, b) => a.start.localeCompare(b.start))
        .slice(0, count)
        .map(c => `• ${new Date(c.start).toLocaleString([], { weekday: 'short', hour: '2-digit', minute: '2-digit' })} — ${c.title} (${c.minutes}m, Coach ${c.coach})`)
        .join('\n');

    let rec = `Here’s a one-week plan based on our live schedule.\n`;
    if (wantStrength && wantFatLoss) {
      rec += `\nFocus: Strength + HIIT split (${days || '5'} days).\n`;
      rec += `\nStrength classes:\n${picks('Strength', 3) || '• No open strength slots found'}\n`;
      rec += `\nHIIT classes:\n${picks('HIIT', 2) || '• No open HIIT slots found'}\n`;
      rec += `\nAdd 2× Mobility on off-days for recovery.\n`;
    } else if (wantFatLoss) {
      rec += `\nFocus: Fat-loss bias (${days || '4'} days) with HIIT + steps.\n`;
      rec += `\nHIIT classes:\n${picks('HIIT', 3) || '• No open HIIT slots found'}\n`;
      rec += `\nMobility add-ons:\n${picks('Mobility', 2) || '• No mobility slots found'}\n`;
    } else if (wantStrength) {
      rec += `\nFocus: Strength/Hypertrophy (${days || '4'} days).\n`;
      rec += `\nStrength classes:\n${picks('Strength', 4) || '• No open strength slots found'}\n`;
      rec += `\nOptional conditioning:\n${picks('Endurance', 1) || '• No endurance slots found'}\n`;
    } else {
      rec += `\nFocus: General fitness blend (3–4 days): 1× Strength, 1× HIIT, 1× Mobility, +1 optional Dance/Endurance.\n`;
      rec += `\nSuggestions:\n${picks('Strength', 1)}\n${picks('HIIT', 1)}\n${picks('Mobility', 1)}\n${picks('Dance', 1)}\n`;
    }
    rec += `\nReply “book Mon/Tue…” or tap a class to book. I can also adapt to time windows (e.g., “only 6–8am”).`;
    return rec;
  }
}
