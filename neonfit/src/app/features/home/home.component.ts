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
  // Subtle parallax, respects reduced motion (CSS disables animation)
  @HostListener('window:scroll')
  onScroll() {
    const y = Math.min(window.scrollY || 0, 320);
    document.documentElement.style.setProperty('--heroShift', `${y * 0.25}px`);
  }
}
