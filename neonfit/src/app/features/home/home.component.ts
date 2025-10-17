import { Component, HostListener } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'nf-home',
  imports: [RouterLink],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  // Subtle parallax; CSS respects prefers-reduced-motion
  @HostListener('window:scroll')
  onScroll() {
    const y = Math.min(window.scrollY || 0, 320);
    document.documentElement.style.setProperty('--heroShift', `${y * 0.25}px`);
  }
}
