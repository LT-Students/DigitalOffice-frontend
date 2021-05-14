import { Component, ElementRef, HostListener, OnInit } from '@angular/core';

@Component({
    selector: 'do-auth',
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
})
export class AuthComponent implements OnInit {
    constructor(private elem: ElementRef) {}

    ngOnInit(): void {}

    @HostListener('mousemove', ['$event'])
    parallax(e) {
      this.elem.nativeElement
        .querySelectorAll('.waves')
        .forEach((wave) => {
          const speedX = +wave.getAttribute('data-speedX');
          const speedY = +wave.getAttribute('data-speedY');

          const x = (window.innerWidth - e.pageX * speedX) / 100;
          const y = (window.innerHeight - e.pageY * speedY) / 100;

          wave.style.transform = `translate(${x}px, ${y}px)`;
        });
    }
}
