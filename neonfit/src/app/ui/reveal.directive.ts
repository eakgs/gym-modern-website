import { AfterViewInit, Directive, ElementRef, Input } from '@angular/core';

@Directive({ selector: '[reveal]', standalone: true })
export class RevealDirective implements AfterViewInit {
  @Input() delay = 0;
  constructor(private el: ElementRef<HTMLElement>) {}
  ngAfterViewInit() {
    const node = this.el.nativeElement;
    node.style.opacity = '0';
    node.style.transform = 'translateY(10px)';
    node.style.willChange = 'transform, opacity';
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          node.animate([
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'translateY(0)' }
          ], { duration: 420, delay: this.delay, easing: 'cubic-bezier(.2,.75,.25,1)', fill: 'forwards' });
          io.unobserve(node);
        }
      });
    }, { threshold: 0.12 });
    io.observe(node);
  }
}
