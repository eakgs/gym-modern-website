import { Component, computed, signal } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';

type Level = 'Beginner' | 'Intermediate' | 'Advanced';

interface Program {
  id: string;
  title: string;
  tagline: string;
  minutes: number;
  daysPerWeek: number;
  level: Level;
  tags: string[];
  coach: string;
  hero: string; // /assets/images/...
}

@Component({
  standalone: true,
  selector: 'nf-programs',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './programs.component.html',
  styleUrls: ['./programs.component.css'],
})
export class ProgramsComponent {
  // ---------------- Fake data (swap with API later) ----------------
  readonly allPrograms: Program[] = [
    {
      id: 'strength-lab',
      title: 'Strength Lab',
      tagline: 'Periodized compound lifts with progressive overload',
      minutes: 55,
      daysPerWeek: 4,
      level: 'Intermediate',
      tags: ['Strength', 'Barbell', 'Hypertrophy'],
      coach: 'Asha',
      hero: '/assets/images/program-strength.jpg',
    },
    {
      id: 'metabolic-burn',
      title: 'Metabolic Burn',
      tagline: 'HIIT intervals guided by live heart-rate zones',
      minutes: 35,
      daysPerWeek: 3,
      level: 'Beginner',
      tags: ['HIIT', 'Fat loss', 'Cardio'],
      coach: 'Ravindu',
      hero: '/assets/images/program-hiit.jpg',
    },
    {
      id: 'mobility-flow',
      title: 'Mobility Flow',
      tagline: 'Restore range with joint cars, breath work & stretch',
      minutes: 25,
      daysPerWeek: 5,
      level: 'Beginner',
      tags: ['Mobility', 'Recovery', 'Low impact'],
      coach: 'Imasha',
      hero: '/assets/images/program-mobility.jpg',
    },
    {
      id: 'athlete-engine',
      title: 'Athlete Engine',
      tagline: 'Power + speed + agility using plyos & sprints',
      minutes: 45,
      daysPerWeek: 4,
      level: 'Advanced',
      tags: ['Athleticism', 'Speed', 'Plyometrics'],
      coach: 'Kavi',
      hero: '/assets/images/program-athlete.jpg',
    },
    {
      id: 'dance-cardio',
      title: 'Dance Cardio',
      tagline: 'Rhythm-driven sweat sessions for fun conditioning',
      minutes: 40,
      daysPerWeek: 3,
      level: 'Beginner',
      tags: ['Dance', 'Cardio', 'Fun'],
      coach: 'Maya',
      hero: '/assets/images/program-dance.jpg',
    },
    {
      id: 'engine-cut',
      title: 'Engine Cut',
      tagline: 'Zone 2 base + tempo runs for aerobic engine',
      minutes: 50,
      daysPerWeek: 4,
      level: 'Intermediate',
      tags: ['Endurance', 'Running', 'Engine'],
      coach: 'Dev',
      hero: '/assets/images/program-engine.jpg',
    },
  ];

  readonly allTags = [
    'Strength', 'Hypertrophy', 'HIIT', 'Cardio', 'Mobility', 'Recovery',
    'Athleticism', 'Speed', 'Dance', 'Endurance',
  ];

  // ---------------- Filters ----------------
  q = signal<string>('');
  tag = signal<string | null>(null);
  level = signal<Level | 'All'>('All');
  sort = signal<'popular' | 'minutes-asc' | 'minutes-desc'>('popular');

  clearFilters() {
    this.q.set('');
    this.tag.set(null);
    this.level.set('All');
    this.sort.set('popular');
  }

  // Handlers (so we avoid casts in the template)
  onQuery(e: Event) {
    const value = (e.target as HTMLInputElement)?.value ?? '';
    this.q.set(value);
  }
  onLevelChange(e: Event) {
    const value = (e.target as HTMLSelectElement)?.value as Level | 'All';
    this.level.set(value);
  }
  onSortChange(e: Event) {
    const value = (e.target as HTMLSelectElement)?.value as 'popular' | 'minutes-asc' | 'minutes-desc';
    this.sort.set(value);
  }

  // ---------------- Derived list ----------------
  programs = computed(() => {
    let list = [...this.allPrograms];

    const q = this.q().trim().toLowerCase();
    const tag = this.tag();
    const level = this.level();

    if (q) {
      list = list.filter(p =>
        p.title.toLowerCase().includes(q) ||
        p.tagline.toLowerCase().includes(q) ||
        p.tags.some(t => t.toLowerCase().includes(q)) ||
        p.coach.toLowerCase().includes(q)
      );
    }
    if (tag) list = list.filter(p => p.tags.includes(tag));
    if (level !== 'All') list = list.filter(p => p.level === level);

    switch (this.sort()) {
      case 'minutes-asc':  list.sort((a,b) => a.minutes - b.minutes); break;
      case 'minutes-desc': list.sort((a,b) => b.minutes - a.minutes); break;
      default: /* popular */ break;
    }

    return list;
  });
}
