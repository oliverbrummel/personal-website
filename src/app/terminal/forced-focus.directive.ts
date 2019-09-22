import { Directive, ElementRef, OnInit, HostListener } from '@angular/core';

@Directive({
  selector: '[appForcedFocus]'
})
export class ForcedFocusDirective implements OnInit {

  constructor(private el: ElementRef) { }

  @HostListener('window:click', [])
  onClick() {
    this.el.nativeElement.focus();
  }

  ngOnInit() {
    this.el.nativeElement.focus();
  }

}
