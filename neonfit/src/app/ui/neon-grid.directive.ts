import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({ selector: '[neonGrid]', standalone: true })
export class NeonGridDirective {
  constructor(private el: ElementRef<HTMLElement>) {}
  @HostListener('document:mousemove', ['$event'])
  onMove(e: MouseEvent) {
    const rect = this.el.nativeElement.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    this.el.nativeElement.style.setProperty('--x', `${x}px`);
    this.el.nativeElement.style.setProperty('--y', `${y}px`);
  }
}
